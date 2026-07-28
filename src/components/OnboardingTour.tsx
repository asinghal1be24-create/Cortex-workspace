'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ArrowRight, Check } from 'lucide-react';

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: 'bottom' | 'top' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'sidebar-toggles',
    title: 'Foundational Pillars',
    description: 'Toggle between raw workspace Files and your AI-mapped semantic graph (Consciousness).',
    position: 'right'
  },
  {
    targetId: 'workspace-files',
    title: 'Workspace Files',
    description: 'Manage active text documents, code scripts, budgets, and visual canvases here.',
    position: 'right'
  },
  {
    targetId: 'neo-button',
    title: 'NEO — AI Copilot',
    description: 'Launch NEO to query your files, summarize datasets, write scripts, or explain code.',
    position: 'bottom'
  },
  {
    targetId: 'vault-button',
    title: 'Plausible Deniability Vault',
    description: 'Secure highly sensitive keys, files, and credentials behind a dual-password decoy vault.',
    position: 'bottom'
  },
  {
    targetId: 'save-button',
    title: 'Manual Cloud Sync',
    description: 'Perform a secure batch sync to Supabase database. Local-first architecture guarantees offline safety.',
    position: 'bottom'
  }
];

export default function OnboardingTour() {
  const [isActive, setIsActive] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<{ top: number; left: number; right: number; bottom: number; width: number; height: number } | null>(null);
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredNext, setHoveredNext] = useState(false);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompleted = localStorage.getItem('cortex_onboarded');
    if (!hasCompleted) {
      // Trigger tour automatically after a brief delay to allow templates initialization
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to manual restart event from the parent
  useEffect(() => {
    const handleRestart = () => {
      setStepIdx(0);
      setIsActive(true);
    };
    window.addEventListener('restart-cortex-tour', handleRestart);
    return () => window.removeEventListener('restart-cortex-tour', handleRestart);
  }, []);

  // Window resize listener
  useEffect(() => {
    if (!isActive) return;
    const updateSize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [isActive]);

  // Compute position of active target element
  useEffect(() => {
    if (!isActive) return;
    
    const updateRect = () => {
      const step = TOUR_STEPS[stepIdx];
      const el = document.getElementById(step.targetId);
      if (el) {
        const r = el.getBoundingClientRect();
        setRect({
          top: r.top,
          left: r.left,
          right: r.right,
          bottom: r.bottom,
          width: r.width,
          height: r.height
        });
      } else {
        // If element is not in DOM (e.g. mobile view or dynamic UI state), skip or auto-advance
        setRect(null);
      }
    };

    updateRect();
    // Brief polling to align overlay if layouts shift
    const interval = setInterval(updateRect, 500);
    return () => clearInterval(interval);
  }, [isActive, stepIdx, windowSize]);

  if (!isActive) return null;

  const currentStep = TOUR_STEPS[stepIdx];

  // Calculate Tooltip floating position
  let tooltipStyle: React.CSSProperties = { position: 'fixed', zIndex: 100002 };
  if (rect) {
    const gap = 16;
    const tWidth = 320;
    const tHeight = 180;

    if (currentStep.position === 'right') {
      tooltipStyle.left = Math.min(rect.right + gap, windowSize.w - tWidth - 20);
      tooltipStyle.top = Math.max(20, Math.min(rect.top + rect.height / 2 - tHeight / 2, windowSize.h - tHeight - 20));
    } else if (currentStep.position === 'left') {
      tooltipStyle.left = Math.max(20, rect.left - tWidth - gap);
      tooltipStyle.top = Math.max(20, Math.min(rect.top + rect.height / 2 - tHeight / 2, windowSize.h - tHeight - 20));
    } else if (currentStep.position === 'bottom') {
      tooltipStyle.left = Math.max(20, Math.min(rect.left + rect.width / 2 - tWidth / 2, windowSize.w - tWidth - 20));
      tooltipStyle.top = Math.min(rect.bottom + gap, windowSize.h - tHeight - 20);
    } else {
      tooltipStyle.left = Math.max(20, Math.min(rect.left + rect.width / 2 - tWidth / 2, windowSize.w - tWidth - 20));
      tooltipStyle.top = Math.max(20, rect.top - tHeight - gap);
    }
  } else {
    // Center of the screen if element not found
    tooltipStyle.left = '50%';
    tooltipStyle.top = '50%';
    tooltipStyle.transform = 'translate(-50%, -50%)';
  }

  const handleNext = () => {
    if (stepIdx < TOUR_STEPS.length - 1) {
      setStepIdx(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('cortex_onboarded', 'true');
    setIsActive(false);
  };

  return (
    <div className="fixed inset-0 z-[100000] pointer-events-auto">
      
      {/* 4-Panel Cutout Backdrop Overlay */}
      {rect && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Panel */}
          <div 
            className="absolute bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto"
            style={{ top: 0, left: 0, width: '100%', height: rect.top }}
          />
          {/* Bottom Panel */}
          <div 
            className="absolute bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto"
            style={{ top: rect.bottom, left: 0, width: '100%', height: windowSize.h - rect.bottom }}
          />
          {/* Left Panel */}
          <div 
            className="absolute bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto"
            style={{ top: rect.top, left: 0, width: rect.left, height: rect.height }}
          />
          {/* Right Panel */}
          <div 
            className="absolute bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto"
            style={{ top: rect.top, left: rect.right, width: windowSize.w - rect.right, height: rect.height }}
          />
        </div>
      )}

      {/* Target Focus Border Glow */}
      {rect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={`focus-${stepIdx}`}
          className="absolute pointer-events-none"
          style={{
            position: 'fixed',
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
            border: '2px solid rgba(245, 158, 11, 0.8)',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.4), inset 0 0 15px rgba(245, 158, 11, 0.2)',
            borderRadius: '6px',
            zIndex: 100001
          }}
        />
      )}

      {/* Tour Step Card */}
      <AnimatePresence mode="wait">
        <motion.div
          ref={tooltipRef}
          key={stepIdx}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          style={tooltipStyle}
          className="w-[320px] rounded-xl bg-[#090909]/95 border border-amber-500/25 p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">
              System Tour ({stepIdx + 1}/{TOUR_STEPS.length})
            </span>
            <button 
              onClick={handleComplete} 
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-base font-bold text-zinc-100 mb-1.5 font-sans tracking-tight">
              {currentStep.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {currentStep.description}
            </p>
          </div>

          {/* Footer Controls */}
          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <button
              onClick={handleComplete}
              className="text-[10px] uppercase font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Skip Tour
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => setHoveredNext(true)}
              onMouseLeave={() => setHoveredNext(false)}
              style={{
                background: hoveredNext ? '#fbbf24' : '#f59e0b',
                color: '#000000',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '11px',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.2)',
                transform: hoveredNext ? 'scale(1.03)' : 'scale(1)'
              }}
            >
              {stepIdx < TOUR_STEPS.length - 1 ? (
                <>Next <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>Finish <Check className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
