'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CyberTooltipProps {
  id?: string; // Kept for backwards compatibility with page.tsx
  title: string;
  content?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
  delay?: number; // Kept for backwards compatibility
}

export default function CyberTooltip({ title, content, position = 'bottom', align = 'center', children }: CyberTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  let containerAlign = 'left-1/2 -translate-x-1/2';
  let arrowAlign = 'left-1/2 -translate-x-1/2';
  if (align === 'start') {
    containerAlign = 'left-0';
    arrowAlign = 'left-4';
  } else if (align === 'end') {
    containerAlign = 'right-0';
    arrowAlign = 'right-4';
  }

  const positionClasses = {
    top: `bottom-full pb-3 ${containerAlign}`,
    bottom: `top-full pt-3 ${containerAlign}`,
    left: `right-full top-1/2 -translate-y-1/2 pr-3`,
    right: `left-full top-1/2 -translate-y-1/2 pl-3`,
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Target Element */}
      {children}

      {/* Tooltip Popup */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className={`absolute z-[150] ${content ? 'w-64' : 'whitespace-nowrap'} ${positionClasses[position]}`}
            style={{ pointerEvents: 'none' }}
          >
            {/* The cyber-styled container */}
            {content ? (
              <div className="relative bg-[#0a0a0a] border border-amber-500/50 rounded-lg p-4 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                {/* Pointer arrow */}
                <div className={`absolute w-3 h-3 bg-[#0a0a0a] border-amber-500/50 transform rotate-45
                  ${position === 'top' ? `bottom-[-7px] ${arrowAlign} border-b border-r` : ''}
                  ${position === 'bottom' ? `top-[-7px] ${arrowAlign} border-t border-l` : ''}
                  ${position === 'left' ? `right-[-7px] top-1/2 -translate-y-1/2 border-t border-r` : ''}
                  ${position === 'right' ? `left-[-7px] top-1/2 -translate-y-1/2 border-b border-l` : ''}
                `} />

                <div className="flex items-start gap-2">
                  <ArrowUpRight className="text-amber-500 mt-0.5" size={16} />
                  <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs">{title}</h4>
                </div>
                
                <div className="text-zinc-300 text-xs leading-relaxed font-mono mt-2">
                  {content}
                </div>
              </div>
            ) : (
              <div className="relative bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1.5 shadow-lg max-w-[200px] text-center">
                {/* Pointer arrow for compact mode */}
                <div className={`absolute w-2 h-2 bg-zinc-900 border-zinc-700 transform rotate-45
                  ${position === 'top' ? `bottom-[-5px] ${arrowAlign} border-b border-r` : ''}
                  ${position === 'bottom' ? `top-[-5px] ${arrowAlign} border-t border-l` : ''}
                  ${position === 'left' ? `right-[-5px] top-1/2 -translate-y-1/2 border-t border-r` : ''}
                  ${position === 'right' ? `left-[-5px] top-1/2 -translate-y-1/2 border-b border-l` : ''}
                `} />
                <span className="text-zinc-200 text-[10px] font-medium tracking-wide whitespace-nowrap">{title}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
