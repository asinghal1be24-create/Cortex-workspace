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
  vaultItems: VaultItem[] | null;
  clipboardTimeLeft: number | null;
  unlockVault: (password: string) => Promise<void>;
  lockVault: () => void;
  secureCopy: (textToCopy: string) => Promise<void>;
  addVaultItem: (item: Omit<VaultItem, 'id'>) => void;
  updateVaultItem: (id: string, item: Partial<VaultItem>) => void;
  deleteVaultItem: (id: string) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};

// Mock data generation for initial testing
const createMockEncryptedPayloads = async () => {
  const dummyData = [
    { id: '1', title: 'Burner Mail', username: 'john.doe@proton.me', password: 'password123' },
    { id: '2', title: 'Fake Server SSH', username: 'root', password: 'supersecretfake' }
  ];
  const realData = [
    { id: '3', title: 'Cortex Master Node', username: 'admin', password: 'HQ_RealPassword_8832!' },
    { id: '4', title: 'Offshore Bank', username: 'operative_99', password: 'Money_100234!' }
  ];

  // We are creating temporary mock payloads so the developer can test "real" vs "dummy"
  // For the actual app, these payloads would come from Supabase.
  const realPayload = await encryptPayload('real_password', realData);
  const dummyPayload = await encryptPayload('burner_password', dummyData);

  return { realPayload, dummyPayload };
};

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [vaultItems, setVaultItems] = useState<VaultItem[] | null>(null);
  const [lockedPendingItems, setLockedPendingItems] = useState<VaultItem[]>([]);
  const [clipboardTimeLeft, setClipboardTimeLeft] = useState<number | null>(null);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clipboardTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-lock mechanic (5 minutes = 300,000 ms)
  const IDLE_TIMEOUT = 300000;

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (!isLocked) {
      idleTimerRef.current = setTimeout(() => {
        lockVault();
      }, IDLE_TIMEOUT);
    }
  };

  const lockVault = () => {
    setIsLocked(true);
    setVaultItems(null); // Clear RAM
    setIsDecrypting(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  useEffect(() => {
    const handleActivity = () => resetIdleTimer();
    const handleVisibilityChange = () => {
      if (document.hidden) lockVault();
    };
    const handleBeforeUnload = () => {
      lockVault(); // Clear right before page refresh
    };

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
  }, [isLocked]); // Re-bind when lock state changes

  useEffect(() => {
    const handleVaultAdd = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newItem = { ...customEvent.detail, id: Date.now().toString() };
      
      setVaultItems(prev => {
        if (!prev) {
          // Vault is locked. Add to pending queue in memory.
          setLockedPendingItems(pending => [...pending, newItem]);
          return prev;
        }
        return [...prev, newItem];
      });
    };
    window.addEventListener('cortex-vault-add', handleVaultAdd);
    return () => window.removeEventListener('cortex-vault-add', handleVaultAdd);
  }, []);

  const unlockVault = async (password: string) => {
    try {
      setIsDecrypting(true);
      // Fetch mock payloads for now
      const { realPayload, dummyPayload } = await createMockEncryptedPayloads();

      const decryptedData = await attemptUnlock(password, realPayload, dummyPayload);
      
      // Artificial delay to show the decryption cascade UI
      await new Promise(res => setTimeout(res, 800));

      const mergedData = [...decryptedData, ...lockedPendingItems];
      setLockedPendingItems([]);

      setVaultItems(mergedData);
      setIsLocked(false);
      setIsDecrypting(false);
      resetIdleTimer();
    } catch (error) {
      setIsDecrypting(false);
      throw error;
    }
  };

  const secureCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setClipboardTimeLeft(15);

      if (clipboardTimerRef.current) clearInterval(clipboardTimerRef.current);

      clipboardTimerRef.current = setInterval(async () => {
        setClipboardTimeLeft((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            // Timer hit 0
            if (clipboardTimerRef.current) clearInterval(clipboardTimerRef.current);
            navigator.clipboard.writeText(''); // Clear clipboard
            return null;
          }
        });
      }, 1000);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  const addVaultItem = (item: Omit<VaultItem, 'id'>) => {
    if (!vaultItems) return;
    const newItem = { ...item, id: Date.now().toString() };
    setVaultItems([...vaultItems, newItem]);
  };

  const updateVaultItem = (id: string, updates: Partial<VaultItem>) => {
    if (!vaultItems) return;
    setVaultItems(vaultItems.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteVaultItem = (id: string) => {
    if (!vaultItems) return;
    setVaultItems(vaultItems.filter(item => item.id !== id));
  };

  return (
    <VaultContext.Provider
      value={{
        isLocked,
        isDecrypting,
        vaultItems,
        clipboardTimeLeft,
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
