'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { attemptUnlock, encryptPayload, VaultPayload } from '../lib/cryptoUtils';

export interface VaultItem {
  id: string;
  title: string;
  username?: string;
  password?: string;
  notes?: string;
}

interface VaultContextType {
  isLocked: boolean;
  isDecrypting: boolean;
  vaultExists: boolean | null; // null = checking, true = exists, false = needs setup
  currentVaultType: 'real' | 'burner' | null;
  vaultItems: VaultItem[] | null;
  clipboardTimeLeft: number | null;
  setupVault: (masterPassword: string, burnerPassword?: string) => Promise<void>;
  unlockVault: (password: string) => Promise<void>;
  lockVault: () => void;
  secureCopy: (textToCopy: string) => Promise<void>;
  addVaultItem: (item: Omit<VaultItem, 'id'>) => Promise<void>;
  updateVaultItem: (id: string, item: Partial<VaultItem>) => Promise<void>;
  deleteVaultItem: (id: string) => Promise<void>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};

const VAULT_STORAGE_KEY = 'cortex_vault_data';

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [vaultExists, setVaultExists] = useState<boolean | null>(null);
  const [currentVaultType, setCurrentVaultType] = useState<'real' | 'burner' | null>(null);
  const [vaultItems, setVaultItems] = useState<VaultItem[] | null>(null);
  const [lockedPendingItems, setLockedPendingItems] = useState<VaultItem[]>([]);
  const [clipboardTimeLeft, setClipboardTimeLeft] = useState<number | null>(null);

  const currentPasswordRef = useRef<string | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clipboardTimerRef = useRef<NodeJS.Timeout | null>(null);

  const IDLE_TIMEOUT = 300000; // Auto-lock mechanic (5 minutes)

  // Check if vault exists on mount
  useEffect(() => {
    const data = localStorage.getItem(VAULT_STORAGE_KEY);
    setVaultExists(!!data);
  }, []);

  const resetIdleTimer = (forceUnlocked?: boolean) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    const active = forceUnlocked !== undefined ? forceUnlocked : !isLocked;
    if (active) {
      idleTimerRef.current = setTimeout(() => {
        lockVault();
      }, IDLE_TIMEOUT);
    }
  };

  const lockVault = () => {
    setIsLocked(true);
    setVaultItems(null); // Clear RAM
    setIsDecrypting(false);
    setCurrentVaultType(null);
    currentPasswordRef.current = null; // Clear active password from RAM
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  useEffect(() => {
    const handleActivity = () => resetIdleTimer();
    const handleVisibilityChange = () => { if (document.hidden) lockVault(); };
    const handleBeforeUnload = () => { lockVault(); };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLocked]);

  useEffect(() => {
    const handleVaultAdd = async (e: Event) => {
      const customEvent = e as CustomEvent;
      const newItem = { ...customEvent.detail, id: Date.now().toString() };
      
      if (isLocked || !currentPasswordRef.current) {
        // Vault is locked. Add to pending queue in memory.
        setLockedPendingItems(pending => [...pending, newItem]);
      } else {
        // Vault is unlocked. Add and re-encrypt immediately.
        await addVaultItem(newItem);
      }
    };
    window.addEventListener('cortex-vault-add', handleVaultAdd);
    return () => window.removeEventListener('cortex-vault-add', handleVaultAdd);
  }, [isLocked]);

  const setupVault = async (masterPassword: string, burnerPassword?: string) => {
    setIsDecrypting(true);
    try {
      const realPayload = await encryptPayload(masterPassword, []);
      // If burner password is provided, use it. Otherwise generate an unguessable string so dummy payload is generated but inaccessible.
      const dummyPwd = burnerPassword || (Date.now().toString(36) + Math.random().toString(36));
      const dummyPayload = await encryptPayload(dummyPwd, []);

      const storageData = { realPayload, dummyPayload };
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(storageData));
      
      setVaultExists(true);
      
      // Auto-unlock with master password
      await unlockVault(masterPassword);
    } catch (error) {
      console.error("Vault Setup Failed", error);
    } finally {
      setIsDecrypting(false);
    }
  };

  const unlockVault = async (password: string) => {
    try {
      setIsDecrypting(true);
      const rawData = localStorage.getItem(VAULT_STORAGE_KEY);
      if (!rawData) throw new Error("No vault found in local storage");
      
      const { realPayload, dummyPayload } = JSON.parse(rawData);

      // attemptUnlock returns the decrypted data AND which vault succeeded
      const { data, vaultType } = await attemptUnlock(password, realPayload, dummyPayload);
      
      await new Promise(res => setTimeout(res, 600)); // Artificial cascade delay

      const mergedData = [...data, ...lockedPendingItems];
      setLockedPendingItems([]);

      setVaultItems(mergedData);
      setCurrentVaultType(vaultType);
      currentPasswordRef.current = password; // Store temporarily for re-encryption
      setIsLocked(false);
      resetIdleTimer(true);

      // If there were pending items, save them to local storage now
      if (lockedPendingItems.length > 0) {
        await _saveAndReencrypt(mergedData, password, vaultType);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDecrypting(false);
    }
  };

  // Helper to re-encrypt and save to localStorage
  const _saveAndReencrypt = async (newItems: VaultItem[], password: string, vaultType: 'real' | 'burner') => {
    const rawData = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!rawData) return;
    const storageData = JSON.parse(rawData);

    // Re-encrypt the modified array
    const updatedPayload = await encryptPayload(password, newItems);

    // Update only the payload corresponding to the active vault type
    if (vaultType === 'real') {
      storageData.realPayload = updatedPayload;
    } else {
      storageData.dummyPayload = updatedPayload;
    }

    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(storageData));
  };

  const secureCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setClipboardTimeLeft(15);
      if (clipboardTimerRef.current) clearInterval(clipboardTimerRef.current);

      clipboardTimerRef.current = setInterval(() => {
        setClipboardTimeLeft((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            if (clipboardTimerRef.current) clearInterval(clipboardTimerRef.current);
            // Clear clipboard asynchronously outside of state updater
            setTimeout(() => {
              navigator.clipboard.writeText('').catch(() => {
                // Ignore focus errors
              });
            }, 0);
            return null;
          }
        });
      }, 1000);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  const addVaultItem = async (item: Omit<VaultItem, 'id'>) => {
    if (!vaultItems || !currentPasswordRef.current || !currentVaultType) return;
    const newItem = { ...item, id: Date.now().toString(36) + Math.random().toString(36).substring(2) };
    const newItems = [...vaultItems, newItem];
    setVaultItems(newItems);
    await _saveAndReencrypt(newItems, currentPasswordRef.current, currentVaultType);
  };

  const updateVaultItem = async (id: string, updates: Partial<VaultItem>) => {
    if (!vaultItems || !currentPasswordRef.current || !currentVaultType) return;
    const newItems = vaultItems.map(item => item.id === id ? { ...item, ...updates } : item);
    setVaultItems(newItems);
    await _saveAndReencrypt(newItems, currentPasswordRef.current, currentVaultType);
  };

  const deleteVaultItem = async (id: string) => {
    if (!vaultItems || !currentPasswordRef.current || !currentVaultType) return;
    const newItems = vaultItems.filter(item => item.id !== id);
    setVaultItems(newItems);
    await _saveAndReencrypt(newItems, currentPasswordRef.current, currentVaultType);
  };

  return (
    <VaultContext.Provider
      value={{
        isLocked,
        isDecrypting,
        vaultExists,
        currentVaultType,
        vaultItems,
        clipboardTimeLeft,
        setupVault,
        unlockVault,
        lockVault,
        secureCopy,
        addVaultItem,
        updateVaultItem,
        deleteVaultItem,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};
