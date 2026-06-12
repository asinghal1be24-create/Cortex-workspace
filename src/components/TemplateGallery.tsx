'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WorkspaceFile } from '@/types';
import { Code2, Database, PenTool, LayoutTemplate, FilePlus2 } from 'lucide-react';

export type TemplateType = 'text' | 'code' | 'finance' | 'canvas';

interface TemplateGalleryProps {
  onSelect: (files: WorkspaceFile[]) => void;
}

const TEMPLATES: Record<TemplateType, { title: string, description: string, hoverTip: string, icon: any, coverStyle: React.CSSProperties, files: WorkspaceFile[] }> = {
  text: {
    title: 'Text Notes',
    description: 'Clean markdown editor for journals, tasks, and structured documentation.',
    hoverTip: 'Create .md or .txt files for journals and notes.',
    icon: PenTool,
    coverStyle: { background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', borderBottom: '1px solid #374151' }, // Slate
    files: [
      { id: 't_text', name: 'untitled.txt', content: '# New Note\n\nStart typing here...' }
    ]
  },
  code: {
    title: 'Code Editor',
    description: 'Syntax highlighting and a monospaced environment for deep development work.',
    hoverTip: 'Supports .py, .cpp, .ts, and more.',
    icon: Code2,
    coverStyle: { background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', borderBottom: '1px solid #4338ca' }, // Indigo
    files: [
      { id: 't_code', name: 'untitled.code', content: 'function main() {\n  console.log("Hello Cortex!");\n}\n\nmain();' }
    ]
  },
  finance: {
    title: 'Finance & Data',
    description: 'Grid-based spreadsheet environment for modeling and tabular datasets.',
    hoverTip: 'Grid-based editor for .csv datasets.',
    icon: Database,
    coverStyle: { background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', borderBottom: '1px solid #059669' }, // Emerald
    files: [
      { id: 't_finance', name: 'untitled.csv', content: 'Date,Category,Amount\n2024-01-01,Food,25.50\n' }
    ]
  },
  canvas: {
    title: 'Whiteboard',
    description: 'Infinite spatial canvas with drawing tools, pins, and dynamic overlays.',
    hoverTip: 'Infinite .canvas for spatial mind-mapping.',
    icon: LayoutTemplate,
    coverStyle: { background: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', borderBottom: '1px solid #b45309' }, // Amber
    files: [
      { id: 't_canvas', name: 'untitled.canvas', content: '{"version":1,"nodes":[],"edges":[]}' }
    ]
  }
};

export default function TemplateGallery({ onSelect }: TemplateGalleryProps) {
  const [hovered, setHovered] = useState<TemplateType | null>(null);

  const handleSelect = (type: TemplateType) => {
    const welcomeContent = `<h1>🚀 Welcome to Cortex</h1>
<p>Cortex is an all-in-one workspace that combines notes, coding, data analysis, visual thinking, and AI into a single seamless experience.</p>
<hr />
<h2>📌 The 4 Core Workspaces</h2>
<h3>📝 Text Notes</h3>
<p>Perfect for:</p>
<ul>
  <li>Documentation</li>
  <li>Journaling</li>
  <li>Research notes</li>
  <li>Project planning</li>
</ul>
<p>Features:</p>
<ul>
  <li>Clean writing interface</li>
  <li>Multiple pages per document</li>
  <li>Organized note-taking</li>
</ul>
<h3>💻 Code Editor</h3>
<p>Built for developers who need a focused coding environment.</p>
<p>Features:</p>
<ul>
  <li>Syntax highlighting</li>
  <li>Developer-friendly formatting</li>
  <li>Support for deep coding workflows</li>
</ul>
<h3>📊 Finance & Data</h3>
<p>A spreadsheet-style workspace for working with structured data.</p>
<p>Perfect for:</p>
<ul>
  <li>CSV files</li>
  <li>Financial tracking</li>
  <li>Data analysis</li>
  <li>Tables and datasets</li>
</ul>
<h3>🎨 Whiteboard</h3>
<p>An infinite canvas for visual thinking and brainstorming.</p>
<p>Features:</p>
<ul>
  <li>Freehand drawing</li>
  <li>Sticky notes</li>
  <li>Diagrams and mind maps</li>
  <li>Unlimited workspace</li>
</ul>
<p>💡 Tip: Both Text Notes and Whiteboards support multiple pages. Click the ➕ button at the bottom to add a new page.</p>
<hr />
<h2>🔐 Cortex Vault</h2>
<p>Keep sensitive information secure.</p>
<p>Use the Vault button in the top-right corner to access a:</p>
<ul>
  <li>Password-protected area</li>
  <li>Encrypted local storage space</li>
</ul>
<p>Ideal for storing:</p>
<ul>
  <li>API keys</li>
  <li>Passwords</li>
  <li>Private credentials</li>
  <li>Sensitive project information</li>
</ul>
<hr />
<h2>🤖 Meet NEO — Your AI Copilot</h2>
<p>Click NEO in the top-right corner to launch your AI assistant.</p>
<p>What makes NEO special?</p>
<ul>
  <li>Understands your entire workspace</li>
  <li>Sees context across files and projects</li>
  <li>Helps you work faster and smarter</li>
</ul>
<p>You can ask NEO to:</p>
<ul>
  <li>Write or debug code</li>
  <li>Analyze spreadsheet data</li>
  <li>Summarize notes</li>
  <li>Generate ideas</li>
  <li>Answer questions about your workspace</li>
</ul>
<hr />
<h2>🔄 Local Sync & Backup</h2>
<p>Keep your work connected to your computer.</p>
<p>With Sync, you can:</p>
<ul>
  <li>Link a folder on your device</li>
  <li>Automatically save changes in real time</li>
  <li>Keep files backed up locally</li>
</ul>
<p>Need to move your workspace?</p>
<ul>
  <li>Export everything as a ZIP archive anytime</li>
</ul>
<hr />
<h2>🧠 Consciousness Graph</h2>
<p>Open the ◎ Consciousness tab from the left sidebar to see your workspace as a connected knowledge map.</p>
<p>Cortex automatically:</p>
<ul>
  <li>Finds relationships between ideas</li>
  <li>Connects related notes and files</li>
  <li>Visualizes project knowledge</li>
  <li>Helps you discover hidden patterns</li>
</ul>
<p>Think of it as a living map of everything you're working on.</p>
<hr />
<h3>🎯 Quick Start</h3>
<ol>
  <li>Create a Note, Spreadsheet, Code File, or Whiteboard.</li>
  <li>Store sensitive information in the Vault.</li>
  <li>Ask NEO for help whenever you're stuck.</li>
  <li>Enable Sync to save everything locally.</li>
  <li>Explore the Consciousness Graph to uncover connections across your work.</li>
</ol>
<p>Welcome to a smarter way of thinking, building, and creating with Cortex.</p>`;

    const welcomeFile: WorkspaceFile = {
      id: `welcome_file_${Date.now()}`,
      name: 'Start.txt',
      content: welcomeContent
    };
    
    // Auto incrementing IDs to avoid conflicts if they spawn multiple
    const instantiatedFiles = TEMPLATES[type].files.map(f => ({
      ...f,
      id: `${f.id}_${Date.now()}`
    }));

    onSelect([welcomeFile, ...instantiatedFiles]);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#080810] h-full overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase mb-4">New Workspace</h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Select a foundational pillar. Cortex will instantly provision an environment tailored to your workflow.
            </p>
          </motion.div>
        </div>

        {/* Notebook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
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
                className="relative group cursor-pointer"
              >
                {/* Glow effect behind the card */}
                <div 
                  className={`absolute -inset-4 bg-amber-500/10 blur-2xl rounded-[2.5rem] transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} 
                />

                {/* The Notebook Card */}
                <div className={`relative flex flex-col rounded-2xl overflow-hidden bg-[#12121a] border border-zinc-800 shadow-2xl transition-all duration-300 transform aspect-[3/4] ${isHovered ? '-translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-zinc-600' : ''}`}>
                  
                  {/* Top Cover (Gradient & Binding) */}
                  <div className="relative flex-1 flex flex-col items-center justify-center" style={template.coverStyle}>
                    
                    {/* Subtle dot pattern overlay for texture */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                    {/* Notebook Spine (Binding rings) */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/30 border-r border-white/10 flex flex-col justify-evenly py-6 z-10">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-5 h-2 bg-[#12121a] rounded-r-md border-y border-r border-black shadow-inner opacity-80 ml-[-2px]" />
                      ))}
                    </div>

                    {/* Large Center Icon */}
                    <motion.div 
                      className="relative z-10 text-white/30"
                      animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Icon className="w-20 h-20" strokeWidth={1} />
                    </motion.div>

                    {/* Overlay gradient to darken the bottom of the cover slightly */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Bottom Info Panel */}
                  <div className="h-2/5 p-6 flex flex-col bg-[#12121a] relative z-20">
                    <h3 className={`text-xl font-bold uppercase tracking-wide mb-2 transition-colors duration-300 ${isHovered ? 'text-amber-500' : 'text-white'}`}>
                      {template.title}
                    </h3>
                    <p className={`text-zinc-500 text-sm leading-relaxed flex-1 transition-opacity duration-300 absolute inset-x-6 top-[3.5rem] ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                      {template.description}
                    </p>

                    <div className={`text-amber-500 text-xs font-medium leading-relaxed mt-auto transition-all duration-300 absolute inset-x-6 top-[3.5rem] ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'}`}>
                      {template.hoverTip}
                    </div>
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
