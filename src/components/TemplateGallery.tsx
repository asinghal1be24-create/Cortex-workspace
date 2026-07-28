'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkspaceFile } from '@/types';
import { Code2, Database, PenTool, LayoutTemplate, FilePlus2, ArrowRight, ArrowLeft } from 'lucide-react';

export type TemplateType = 'text' | 'code' | 'finance' | 'canvas' | 'empty';

interface TemplateGalleryProps {
  onSelect: (files: WorkspaceFile[]) => void;
}

const TEMPLATES: Record<TemplateType, { title: string, description: string, hoverTip: string, icon: any, accentColor: string, bgGlow: string, files: WorkspaceFile[] }> = {
  text: {
    title: 'Text Notes',
    description: 'Clean markdown editor for journals, tasks, and structured documentation.',
    hoverTip: 'Create .md or .txt files for journals and notes.',
    icon: PenTool,
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.1)',
    files: [
      { id: 't_text', name: 'untitled.txt', content: '# New Note\n\nStart typing here...' }
    ]
  },
  code: {
    title: 'Code Editor',
    description: 'Syntax highlighting and a monospaced environment for deep development work.',
    hoverTip: 'Supports .py, .cpp, .ts, and more.',
    icon: Code2,
    accentColor: '#6366f1', // Indigo
    bgGlow: 'rgba(99, 102, 241, 0.15)',
    files: [
      { id: 't_code', name: 'untitled.code', content: 'function main() {\n  console.log("Hello Cortex!");\n}\n\nmain();' }
    ]
  },
  finance: {
    title: 'Finance',
    description: 'Grid-based spreadsheet environment for modeling and tabular datasets.',
    hoverTip: 'Grid-based editor for .csv datasets.',
    icon: Database,
    accentColor: '#10b981', // Emerald
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    files: [
      { id: 't_finance', name: 'finance.csv', content: 'Date,Category,Amount\n2024-01-01,Food,25.50\n' }
    ]
  },
  canvas: {
    title: 'Whiteboard',
    description: 'Infinite spatial canvas with drawing tools, pins, and dynamic overlays.',
    hoverTip: 'Infinite .canvas for spatial mind-mapping.',
    icon: LayoutTemplate,
    accentColor: '#f59e0b', // Amber
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    files: [
      { id: 't_canvas', name: 'untitled.canvas', content: '{"version":1,"nodes":[],"edges":[]}' }
    ]
  },
  empty: {
    title: 'Empty File',
    description: 'Start fresh with a clean, completely empty text document.',
    hoverTip: 'Creates a blank workspace with a single empty .txt file.',
    icon: FilePlus2,
    accentColor: '#a1a1aa', // Zinc 400
    bgGlow: 'rgba(161, 161, 170, 0.1)',
    files: [
      { id: 't_empty', name: 'untitled.txt', content: '' }
    ]
  }
};

const SUBTITLE_ITEMS = [
  { action: 'Initialize', target: 'Your Journal' },
  { action: 'Deploy', target: 'Your Codebase' },
  { action: 'Structure', target: 'Your Budgets' },
  { action: 'Visualize', target: 'Your Whiteboard' }
];

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<TemplateType | null>(null);
  const [subIdx, setSubIdx] = useState(0);
  const [hoveredStart, setHoveredStart] = useState(false);
  const [hoveredChoose, setHoveredChoose] = useState(false);
  const [hoveredPolaroidIdx, setHoveredPolaroidIdx] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mouse move parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycle subtitle text
  useEffect(() => {
    const interval = setInterval(() => {
      setSubIdx(prev => (prev + 1) % SUBTITLE_ITEMS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Stable random stars
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.7 + 0.15,
      delay: Math.random() * 5
    }));
  }, []);

  // Polaroid cards data
  const polaroids = useMemo(() => [
    {
      title: 'Notes',
      type: 'text' as TemplateType,
      img: '/polaroids/notes_polaroid.webp',
      left: '8%',
      top: '12%',
      rotate: '-8deg',
      parallaxFactor: 35,
    },
    {
      title: 'Codebase',
      type: 'code' as TemplateType,
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
      left: '76%',
      top: '14%',
      rotate: '7deg',
      parallaxFactor: 20,
    },
    {
      title: 'Spreadsheets',
      type: 'finance' as TemplateType,
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
      left: '12%',
      top: '64%',
      rotate: '-11deg',
      parallaxFactor: 45,
    },
    {
      title: 'Whiteboard',
      type: 'canvas' as TemplateType,
      img: '/polaroids/canvas_polaroid.webp',
      left: '74%',
      top: '66%',
      rotate: '9deg',
      parallaxFactor: 30,
    },
    {
      title: 'Secure Vault',
      type: 'empty' as TemplateType, // empty note
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
      left: '45%',
      top: '74%',
      rotate: '-3deg',
      parallaxFactor: 15,
    }
  ], []);

  const handleSelect = (type: TemplateType) => {
    const instantiatedFiles = TEMPLATES[type].files.map(f => ({
      ...f,
      id: `${f.id}_${Date.now()}`
    }));

    onSelect(instantiatedFiles);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050505] h-full overflow-hidden w-full relative text-white select-none">
      
      {/* 1. Deep Space Starfield & Grain Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
        {/* Film grain noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
        
        {/* Pulsing galaxy stars */}
        {isMounted && stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2.5}px rgba(255,255,255,0.35)`,
              animationDuration: `${3 + star.delay}s`,
            }}
          />
        ))}

        {/* Ambient faint neon background dust */}
        <div className="absolute top-[25%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[150px]" />
        
        {/* Soft bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* 2. Parallax Floating Polaroid Cards (Only visible or active in background) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${showTemplates ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}
        style={{ zIndex: showTemplates ? 10 : 30 }}
      >
        {polaroids.map((p, idx) => {
          const dx = mousePos.x * p.parallaxFactor * 1.5;
          const dy = mousePos.y * p.parallaxFactor * 1.5;
          const isHovered = hoveredPolaroidIdx === idx;
          
          return (
            <div
              key={idx}
              onClick={() => handleSelect(p.type)}
              className="absolute transition-transform duration-700 ease-out will-change-transform pointer-events-auto"
              style={{
                left: p.left,
                top: p.top,
                transform: `translate(${dx}px, ${dy}px) rotate(${p.rotate})`,
              }}
            >
              <div 
                onMouseEnter={() => setHoveredPolaroidIdx(idx)}
                onMouseLeave={() => setHoveredPolaroidIdx(null)}
                className="group relative w-28 h-36 md:w-44 md:h-56 bg-zinc-950 p-1.5 pb-5 md:p-2 md:pb-8 shadow-2xl hover:z-50 hover:scale-105 transition-all duration-300 ease-out cursor-pointer border border-white/5 rounded-xs"
              >
                {/* White tape decoration */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/10 backdrop-blur-xs rotate-1 pointer-events-none" />
                
                {/* Inner Image Frame */}
                <div className="w-full h-full overflow-hidden bg-black relative rounded-2xs">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isHovered ? 0.95 : 0.4,
                      filter: isHovered ? 'none' : 'grayscale(100%)',
                      transition: 'all 0.5s ease',
                    }}
                  />
                  {/* Subtle caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 md:p-3">
                    <span className="text-white text-[10px] md:text-xs font-mono font-medium tracking-tight">
                      {p.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Interface Layout */}
      <div className="relative z-20 flex-1 flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!showTemplates ? (
            /* HERO SPLASH SCREEN */
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 py-20 my-auto"
            >
              {/* Giant CORTEX Text */}
              <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 tracking-tighter mb-4 mix-blend-overlay drop-shadow-sm select-none">
                CORTEX
              </h1>

              {/* Cycling Subtitle */}
              <div className="text-lg md:text-2xl text-zinc-400 font-light mb-12 h-12 flex items-center justify-center gap-2">
                <span className="font-serif italic text-zinc-500 transition-colors">
                  {SUBTITLE_ITEMS[subIdx].action}
                </span>
                <span className="text-white font-medium relative h-[1.5em] w-auto overflow-hidden inline-flex items-center">
                  <motion.span
                    key={subIdx}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(3px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.4 }}
                    className="absolute"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {SUBTITLE_ITEMS[subIdx].target}
                  </motion.span>
                  <span className="opacity-0 pointer-events-none">
                    {SUBTITLE_ITEMS[subIdx].target}
                  </span>
                </span>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => handleSelect('empty')}
                  onMouseEnter={() => setHoveredStart(true)}
                  onMouseLeave={() => setHoveredStart(false)}
                  style={{
                    background: hoveredStart ? '#e4e4e7' : '#ffffff',
                    color: '#000000',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 'none',
                    boxShadow: '0 0 20px rgba(255,255,255,0.15)',
                    transform: hoveredStart ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  Start Fresh <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowTemplates(true)}
                  onMouseEnter={() => setHoveredChoose(true)}
                  onMouseLeave={() => setHoveredChoose(false)}
                  style={{
                    background: hoveredChoose ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                    color: hoveredChoose ? '#ffffff' : '#e4e4e7',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    fontWeight: '500',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    transform: hoveredChoose ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  Choose Template
                </button>
              </div>
            </motion.div>
          ) : (
            /* TEMPLATE GALLERY CARDS GRID */
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-12 justify-center my-auto"
            >
              {/* Back Button */}
              <div className="mb-6 flex justify-start">
                <button
                  onClick={() => setShowTemplates(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium hover:scale-102 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Space
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                  Select a Foundational Pillar
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  Cortex will instantly provision a sovereign workspace environment tailored to your workflow.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
                {(Object.entries(TEMPLATES) as [TemplateType, typeof TEMPLATES[TemplateType]][]).map(([key, template], idx) => {
                  const Icon = template.icon;
                  const isHovered = hoveredCard === key;

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      onHoverStart={() => setHoveredCard(key)}
                      onHoverEnd={() => setHoveredCard(null)}
                      onClick={() => handleSelect(key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelect(key);
                        }
                      }}
                      onFocus={() => setHoveredCard(key)}
                      onBlur={() => setHoveredCard(null)}
                      tabIndex={0}
                      className="group cursor-pointer relative w-full max-w-[340px] sm:max-w-[300px] mx-auto outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-2xl touch-manipulation"
                    >
                      {/* Glow border overlay */}
                      <div 
                        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xs pointer-events-none"
                        style={{ background: template.accentColor }}
                      />

                      {/* Card Content container */}
                      <div className="relative flex flex-col justify-between rounded-2xl bg-[#090909]/80 border border-white/5 backdrop-blur-md transition-all duration-300 h-[280px] p-5 z-10 overflow-hidden active:scale-[0.98]">
                        
                        {/* Radial inside glow */}
                        <div 
                          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: template.bgGlow, transform: 'translate(15%, -15%)' }}
                        />

                        {/* Top Section */}
                        <div className="flex flex-col">
                          {/* Badge Icon */}
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-all duration-300"
                            style={{ 
                              backgroundColor: isHovered ? template.bgGlow : 'rgba(255,255,255,0.02)',
                              border: isHovered ? `1px solid ${template.accentColor}25` : '1px solid rgba(255,255,255,0.04)',
                              color: isHovered ? template.accentColor : '#8e8a9f'
                            }}
                          >
                            <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                          </div>

                          <h3 className="text-lg font-medium text-zinc-100 mb-2.5 transition-colors duration-200" style={{ color: isHovered ? template.accentColor : '#e4e4e7' }}>
                            {template.title}
                          </h3>
                          
                          <div className="relative h-[70px] overflow-hidden">
                            <p className={`text-zinc-400 text-xs leading-relaxed absolute inset-0 transition-all duration-200 ${isHovered ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'}`}>
                              {template.description}
                            </p>
                            <p className={`text-zinc-300 text-xs leading-relaxed absolute inset-0 transition-all duration-200 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-1 pointer-events-none'}`}>
                              {template.hoverTip}
                            </p>
                          </div>
                        </div>

                        {/* Bottom line */}
                        <div className="relative z-20 mt-auto flex items-center justify-between text-xs pt-3 border-t border-white/5">
                          <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            Select
                          </span>
                          <span 
                            className="transform transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                            style={{ color: template.accentColor }}
                          >
                            →
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
