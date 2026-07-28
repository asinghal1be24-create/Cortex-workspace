'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { X, Mail, Lock, Loader2, KeyRound } from 'lucide-react';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const signInResult = useSignIn() as any;
  const signUpResult = useSignUp() as any;

  const signIn = signInResult.signIn;
  const signInLoaded = signInResult.isLoaded;
  const setSignInActive = signInResult.setActive;

  const signUp = signUpResult.signUp;
  const signUpLoaded = signUpResult.isLoaded;
  const setSignUpActive = signUpResult.setActive;

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email verification (OTP code) states
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  React.useEffect(() => {
    console.log("[AuthModal] Mount/Update state:", {
      signInLoaded,
      signUpLoaded,
      hasSignIn: !!signIn,
      hasSignUp: !!signUp
    });
  }, [signInLoaded, signUpLoaded, signIn, signUp]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signInLoaded || !signUpLoaded || !signIn || !signUp) {
      setError("Authentication service is loading. Please try again in a moment.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // 1. Initiate sign up
        await signUp.create({
          emailAddress: email,
          password,
        });
        
        // 2. Prepare email address verification
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setPendingVerification(true);
      } else {
        // Sign in
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === 'complete' && setSignInActive) {
          await setSignInActive({ session: result.createdSessionId });
          onClose();
        } else {
          setError('Sign in requires further steps.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) {
      setError("Verification service is loading. Please try again.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete' && setSignUpActive) {
        await setSignUpActive({ session: completeSignUp.createdSessionId });
        onClose();
      } else {
        setError('Verification failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500 opacity-5 blur-[60px] pointer-events-none" />

        <div className="p-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">
              {pendingVerification ? 'Verify Email' : (isSignUp ? 'Initialize Sync' : 'Access Cortex')}
            </h2>
            <p className="text-zinc-500 text-sm">
              {pendingVerification 
                ? `Enter the 6-digit confirmation code sent to ${email}`
                : (isSignUp 
                  ? 'Create an account to securely sync your workspace across devices.' 
                  : 'Sign in to access your synced workspace.')}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!pendingVerification ? (
              <motion.form 
                key="auth-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleAuth} 
                className="space-y-4"
              >
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-xs text-center uppercase tracking-wide bg-red-500/10 py-2 rounded border border-red-500/20">
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] border border-[var(--color-cortex-amberBorder)] rounded-xl font-medium shadow-[0_0_8px_rgba(240,149,50,0.1)] transition-all duration-300 mt-6 enabled:hover:bg-[rgba(240,149,50,0.22)] enabled:hover:border-[rgba(240,149,50,0.6)] enabled:hover:shadow-[0_0_16px_rgba(240,149,50,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {isSignUp ? 'Create Account' : 'Authenticate'}
                </button>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                    className="text-xs text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-widest"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form 
                key="verify-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleVerify} 
                className="space-y-4"
              >
                <div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-Digit Verification Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono placeholder:text-zinc-700 tracking-[0.2em] text-center font-bold"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-xs text-center uppercase tracking-wide bg-red-500/10 py-2 rounded border border-red-500/20">
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] border border-[var(--color-cortex-amberBorder)] rounded-xl font-medium shadow-[0_0_8px_rgba(240,149,50,0.1)] transition-all duration-300 mt-6 enabled:hover:bg-[rgba(240,149,50,0.22)] enabled:hover:border-[rgba(240,149,50,0.6)] enabled:hover:shadow-[0_0_16px_rgba(240,149,50,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Verify & Activate
                </button>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => { setPendingVerification(false); setError(''); }}
                    className="text-xs text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-widest"
                  >
                    ← Back to Sign Up
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5 z-50"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}
