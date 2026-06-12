'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault, VaultItem } from '@/context/VaultContext';

export default function VaultUI({ onClose }: { onClose: () => void }) {
  const {
    isLocked,
    isDecrypting,
    vaultExists,
    currentVaultType,
    vaultItems,
    setupVault,
    unlockVault,
    lockVault,
    secureCopy,
    clipboardTimeLeft,
    updateVaultItem,
    addVaultItem,
    deleteVaultItem
  } = useVault();

  // Unlock form
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Setup form
  const [setupMaster, setSetupMaster] = useState('');
  const [setupMasterConfirm, setSetupMasterConfirm] = useState('');
  const [setupBurner, setSetupBurner] = useState('');
  const [setupBurnerConfirm, setSetupBurnerConfirm] = useState('');
  const [setupError, setSetupError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', username: '', password: '', notes: '' });

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await unlockVault(password);
      setPassword('');
    } catch (err) {
      setError('Decryption Failed. Unauthorized access attempt logged.');
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError('');
    if (setupMaster !== setupMasterConfirm) {
      setSetupError('Master passwords do not match.');
      return;
    }
    if (setupMaster.length < 8) {
      setSetupError('Master password must be at least 8 characters.');
      return;
    }
    if (setupBurner && setupBurner !== setupBurnerConfirm) {
      setSetupError('Burner passwords do not match.');
      return;
    }
    if (setupBurner && setupBurner === setupMaster) {
      setSetupError('Burner password cannot be the same as Master password.');
      return;
    }
    
    await setupVault(setupMaster, setupBurner || undefined);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;
    addVaultItem(newItem);
    setNewItem({ title: '', username: '', password: '', notes: '' });
    setShowAddForm(false);
  };

  if (vaultExists === null) return null; // Loading state

  return (
    <div className="flex flex-col h-[90vh] max-h-[800px] w-full max-w-5xl bg-[#0a0a0a] text-zinc-300 font-mono relative overflow-hidden rounded-xl border border-zinc-800 shadow-2xl mx-auto">
      
      {/* Top Edge Clipboard Timer Bar */}
      <AnimatePresence>
        {clipboardTimeLeft !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 4, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-0 left-0 right-0 bg-amber-500/20 z-50"
          >
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 15, ease: 'linear' }}
              className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 p-8 flex flex-col w-full relative">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-3">
              Cortex Vault
              {!isLocked && (
                <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-sm border border-cyan-500/30">
                  DECRYPTED
                </span>
              )}
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Zero-Knowledge Cryptographic Storage</p>
          </div>
          <div className="flex items-center gap-6">
            {!isLocked && (
              <button
                onClick={lockVault}
                className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest hover:underline"
              >
                [ Lock Session ]
              </button>
            )}
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          
          {/* ── SETUP VIEW ── */}
          {vaultExists === false && !isDecrypting && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center justify-center overflow-y-auto"
            >
              <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 backdrop-blur-md w-full max-w-xl shadow-2xl relative">
                <div className="text-center mb-6">
                  <h2 className="text-amber-500 font-semibold tracking-wide text-xl uppercase mb-2">Initialize Cortex Vault</h2>
                  <p className="text-zinc-400 text-sm">Your vault is encrypted locally. There is no cloud backup or password reset. Do not forget your keys.</p>
                </div>

                <form onSubmit={handleSetup} className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-zinc-200 text-sm font-semibold uppercase tracking-widest border-b border-zinc-800 pb-2">1. Master Key</h3>
                    <input
                      type="password" required placeholder="Create Master Password"
                      value={setupMaster} onChange={(e) => setSetupMaster(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 font-mono"
                    />
                    <input
                      type="password" required placeholder="Confirm Master Password"
                      value={setupMasterConfirm} onChange={(e) => setSetupMasterConfirm(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 font-mono"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-zinc-200 text-sm font-semibold uppercase tracking-widest border-b border-zinc-800 pb-2">2. Burner Key (Optional)</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Enter a secondary "Burner" password. If forced to unlock your Vault, use this password. It will open an isolated dummy vault, hiding your master records perfectly via plausible deniability. Leave blank if you don't need this.
                    </p>
                    <input
                      type="password" placeholder="Create Burner Password (Optional)"
                      value={setupBurner} onChange={(e) => setSetupBurner(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 font-mono"
                    />
                    {setupBurner.length > 0 && (
                      <input
                        type="password" placeholder="Confirm Burner Password" required
                        value={setupBurnerConfirm} onChange={(e) => setSetupBurnerConfirm(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 font-mono"
                      />
                    )}
                  </div>

                  {setupError && (
                    <div className="text-red-400 text-xs text-center uppercase tracking-wide bg-red-500/10 py-2 rounded border border-red-500/20">
                      {setupError}
                    </div>
                  )}

                  <button
                    type="submit"
                    style={{ background: '#f59e0b', color: '#000' }}
                    className="w-full font-semibold py-3 rounded transition-colors uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:brightness-110 mt-4"
                  >
                    Generate & Encrypt Vault
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── LOCKED VIEW ── */}
          {vaultExists === true && isLocked && !isDecrypting && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 backdrop-blur-md w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center border border-zinc-700 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-zinc-200 font-semibold tracking-wide">AUTHENTICATION REQUIRED</h2>
                </div>

                <form onSubmit={handleUnlock} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono placeholder:text-zinc-700"
                      placeholder="Enter Master Key"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-xs text-center uppercase tracking-wide bg-red-500/10 py-2 rounded border border-red-500/20"
                    >
                      {error}
                    </motion.div>
                  )}
                  <button
                    type="submit"
                    style={{ background: '#f59e0b', color: '#000' }}
                    className="w-full font-semibold py-3 rounded transition-colors uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110"
                  >
                    Decrypt Payload
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── DECRYPTING SPINNER ── */}
          {isDecrypting && (
            <motion.div
              key="decrypting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="text-amber-500 font-mono flex flex-col items-center">
                <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mb-6 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    style={{ width: '50%' }}
                  />
                </div>
                <div className="animate-pulse tracking-widest text-sm bg-amber-500/10 px-4 py-2 border border-amber-500/20 rounded">
                  INITIALIZING DECRYPTION CASCADE...
                </div>
              </div>
            </motion.div>
          )}

          {/* ── UNLOCKED VIEW ── */}
          {!isLocked && !isDecrypting && vaultItems && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative pb-24"
            >
              {currentVaultType === 'burner' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-3 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  <div>
                    <p className="font-bold uppercase tracking-widest mb-1">Burner Vault Active</p>
                    <p className="opacity-80">You have unlocked the dummy payload. Plausible deniability is active. Master records are cryptographically wiped from memory. Changes made here will not affect your Master Vault.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vaultItems.map((item, idx) => (
                  <VaultCard 
                    key={item.id} 
                    item={item} 
                    index={idx} 
                    onCopy={() => secureCopy(item.password || '')} 
                    onUpdate={(updates) => updateVaultItem(item.id, updates)}
                    onDelete={() => deleteVaultItem(item.id)}
                  />
                ))}
              </div>

              {/* Add Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-zinc-900/40 border border-zinc-800 p-6 rounded-lg"
                >
                  <h3 className="text-amber-500 font-medium mb-4 tracking-wide uppercase text-sm">Add New Record</h3>
                  <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Title</label>
                        <input required value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-3 py-2 text-white focus:border-amber-500/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Identity (Username)</label>
                        <input value={newItem.username} onChange={e => setNewItem({...newItem, username: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-3 py-2 text-white focus:border-amber-500/50 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Secret Key (Password)</label>
                      <input value={newItem.password} onChange={e => setNewItem({...newItem, password: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-3 py-2 text-white focus:border-amber-500/50 focus:outline-none" />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded hover:bg-amber-500/30 transition-colors text-xs uppercase tracking-widest">Save Record</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {!isLocked && !isDecrypting && !showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            title="Add New Record"
            style={{ background: '#f59e0b', color: '#000' }}
            className="absolute bottom-8 right-12 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 hover:brightness-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

function VaultCard({ item, index, onCopy, onUpdate, onDelete }: { item: VaultItem, index: number, onCopy: () => void, onUpdate: (u: Partial<VaultItem>) => void, onDelete: () => void }) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({ ...item });

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-zinc-900/60 border border-amber-500/30 p-5 rounded-lg relative"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[9px] text-amber-500/70 uppercase tracking-widest mb-1">Title</label>
            <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-2 py-1.5 text-white text-sm focus:border-amber-500/50 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[9px] text-amber-500/70 uppercase tracking-widest mb-1">Identity</label>
            <input value={editForm.username} onChange={e => setEditForm({...editForm, username: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-2 py-1.5 text-white text-sm focus:border-amber-500/50 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[9px] text-amber-500/70 uppercase tracking-widest mb-1">Secret Key</label>
            <input value={editForm.password} onChange={e => setEditForm({...editForm, password: e.target.value})} className="w-full bg-black/40 border border-zinc-800 rounded px-2 py-1.5 text-white text-sm focus:border-amber-500/50 focus:outline-none" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onDelete} className="text-xs text-red-500/70 hover:text-red-400">DELETE</button>
          <div className="flex gap-2">
            <button onClick={() => { setEditForm({...item}); setIsEditing(false); }} className="text-xs text-zinc-500 hover:text-zinc-300">CANCEL</button>
            <button onClick={handleSave} className="text-xs text-amber-500 hover:text-amber-400">SAVE</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-lg hover:border-zinc-700 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-amber-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
        </button>
      </div>

      <h3 className="text-white font-medium mb-4 text-lg tracking-wide pr-8">{item.title}</h3>
      
      {item.username && (
        <div className="mb-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Identity</div>
          <div className="text-zinc-300 font-mono text-sm bg-black/40 px-3 py-2 rounded border border-zinc-800/50">
            {item.username}
          </div>
        </div>
      )}
      
      {item.password && (
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Secret Key</div>
          <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded border border-zinc-800/50 group/secret relative overflow-hidden">
            <div className="text-zinc-400 font-mono text-sm tracking-wide relative z-10">
              {showPassword ? item.password : '••••••••••••••••'}
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-white transition-colors"
                title={showPassword ? "Hide Password" : "Reveal Password"}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
              <button
                onClick={handleCopy}
                className={`transition-colors ${copied ? 'text-amber-500' : 'text-zinc-500 hover:text-white'}`}
                title="Copy to Ephemeral Clipboard"
              >
                {copied ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                )}
              </button>
            </div>
            {copied && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-amber-500/10 pointer-events-none"
              />
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
