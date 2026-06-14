'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WorkspaceFile } from '@/types';
import { Code2, Database, PenTool, LayoutTemplate, FilePlus2 } from 'lucide-react';

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
      { id: 't_finance', name: 'untitled.csv', content: 'Date,Category,Amount\n2024-01-01,Food,25.50\n' }
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

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
  const [hovered, setHovered] = useState<TemplateType | null>(null);

  const handleSelect = (type: TemplateType) => {
    // Auto incrementing IDs to avoid conflicts if they spawn multiple
    const instantiatedFiles = TEMPLATES[type].files.map(f => ({
      ...f,
      id: `${f.id}_${Date.now()}`
    }));

    if (type === 'empty') {
      onSelect(instantiatedFiles);
    } else {
      const welcomeContent = `<h1>🚀 Welcome to Cortex</h1>
<p>Cortex is a next-generation, all-in-one cognitive workspace. It unifies notes, coding, data analysis, visual thinking, and AI into a single seamless, local-first environment.</p>
<hr />
<h2>📌 Supported File Types & Workspaces</h2>

<h3>📝 Text Notes (.txt, .md)</h3>
<p>A clean, distraction-free markdown editor.</p>
<ul>
  <li>Create <strong>.md</strong> files for rich documentation, journals, and project planning.</li>
  <li>Create <strong>.txt</strong> files for raw, unformatted notes.</li>
</ul>

<h3>💻 Code Editor (.py, .cpp, .js, .ts, etc.)</h3>
<p>A developer-focused environment with rich syntax highlighting.</p>
<ul>
  <li>Write scripts and applications by creating files like <strong>.py</strong> (Python), <strong>.cpp</strong> (C++), <strong>.js</strong> (JavaScript), or <strong>.tsx</strong> (React).</li>
  <li>Supports deep coding workflows in a monospaced, distraction-free view.</li>
</ul>

<h3>📊 Finance & Data (.csv)</h3>
<p>A grid-based spreadsheet workspace for tabular datasets.</p>
<ul>
  <li>Create <strong>.csv</strong> files to instantly open a spreadsheet environment.</li>
  <li>Perfect for financial tracking, modeling, and structured data analysis.</li>
</ul>

<h3>🎨 Whiteboard (.canvas)</h3>
<p>An infinite spatial canvas for visual thinking.</p>
<ul>
  <li>Create <strong>.canvas</strong> files to start brainstorming with freehand drawing, sticky notes, and mind maps.</li>
</ul>

<hr />
<h2>🔐 Cortex Vault</h2>
<p>Keep sensitive information absolutely secure. Click the <strong>Vault</strong> button in the top-right corner to access a password-protected, encrypted local storage space. Ideal for API keys, credentials, and private project information.</p>

<hr />
<h2>🤖 Meet NEO — Your AI Copilot</h2>
<p>Click <strong>NEO</strong> in the top-right corner to launch your AI assistant. NEO understands your entire workspace context across all files and projects. Ask NEO to write Python code, analyze your CSV datasets, summarize your markdown notes, or brainstorm on a canvas.</p>

<hr />
<h2>🔄 Local Sync & Backup</h2>
<p>Cortex is local-first. Link a folder on your device to automatically sync changes in real-time, or export everything as a ZIP archive at any time.</p>

<hr />
<h2>🧠 Consciousness Graph</h2>
<p>Open the <strong>◎ Consciousness</strong> tab from the left sidebar to see a living map of everything you are working on. Cortex automatically finds relationships and connects related notes and files.</p>

<hr />
<h3>🎯 Quick Start</h3>
<ol>
  <li>Create a new file (e.g., <code>script.py</code>, <code>budget.csv</code>, or <code>architecture.canvas</code>).</li>
  <li>Store sensitive API keys in the Vault.</li>
  <li>Ask NEO to help you write code or summarize data.</li>
  <li>Enable Sync to save everything to your local hard drive.</li>
</ol>
<p>Welcome to a smarter way of thinking, building, and creating.</p>`;

      const welcomeFile: WorkspaceFile = {
        id: `welcome_file_${Date.now()}`,
        name: 'Start.txt',
        content: welcomeContent
      };
      
      onSelect([welcomeFile, ...instantiatedFiles]);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 bg-[#040404] h-full overflow-y-auto overflow-x-hidden w-full">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center my-auto py-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4 md:mb-6">Cortex</h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Select a foundational pillar. Cortex will instantly provision an environment tailored to your workflow.
            </p>
          </motion.div>
        </div>

        {/* Notebook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full">
          {(Object.entries(TEMPLATES) as [TemplateType, typeof TEMPLATES[TemplateType]][]).map(([key, template], idx) => {
            const Icon = template.icon;
            const isHovered = hovered === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                onHoverStart={() => setHovered(key)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => handleSelect(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(key);
                  }
                }}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                className="group cursor-pointer relative w-full max-w-[340px] sm:max-w-[300px] mx-auto outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl touch-manipulation"
              >
                {/* Outer glowing border effect */}
                <div 
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
                  style={{ background: template.accentColor }}
                />

                {/* The Minimalist Card */}
                <div className="relative flex flex-col justify-between rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 h-[320px] p-5 sm:p-6 z-10 overflow-hidden active:scale-[0.98]">
                  
                  {/* Subtle Background Glow inside the card */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: template.bgGlow, transform: 'translate(20%, -20%)' }}
                  />

                  {/* Top Section: Icon & Content */}
                  <div className="relative z-20 flex flex-col">
                    {/* Icon Badge */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ 
                        backgroundColor: isHovered ? template.bgGlow : 'rgba(255,255,255,0.03)',
                        border: isHovered ? `1px solid ${template.accentColor}30` : '1px solid rgba(255,255,255,0.05)',
                        color: isHovered ? template.accentColor : '#a1a1aa'
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-xl font-medium tracking-tight text-zinc-100 mb-3 transition-colors duration-300" style={{ color: isHovered ? template.accentColor : '#f4f4f5' }}>
                      {template.title}
                    </h3>
                    
                    <div className="relative h-[80px]">
                      <p className={`text-zinc-400 text-sm leading-relaxed absolute inset-0 transition-all duration-300 ${isHovered ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                        {template.description}
                      </p>
                      <p className={`text-zinc-300 text-sm leading-relaxed absolute inset-0 transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'}`}>
                        {template.hoverTip}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section: Arrow indicator */}
                  <div className="relative z-20 mt-auto flex items-center justify-between text-sm font-medium pt-4 border-t border-white/5">
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                      Select
                    </span>
                    <span 
                      className="transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
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
      </div>
    </div>
  );
}
