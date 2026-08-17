"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CodeEditor({ 
  content, 
  fileName, 
  onChange 
}: { 
  content: string; 
  fileName: string; 
  onChange: (val: string) => void;
}) {
  const [isPreview, setIsPreview] = useState(false);

  // Determine language based on extension
  let language = "javascript";
  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith('.py')) language = "python";
  if (lowerName.endsWith('.cpp') || lowerName.endsWith('.h')) language = "cpp";
  if (lowerName.endsWith('.m')) language = "matlab"; 
  if (lowerName.endsWith('.sql')) language = "sql";
  if (lowerName.endsWith('.html')) language = "html";
  if (lowerName.endsWith('.css')) language = "css";
  if (lowerName.endsWith('.ts') || lowerName.endsWith('.tsx')) language = "typescript";
  if (lowerName.endsWith('.md')) language = "markdown";

  const handleEditorWillMount = (monaco: any) => {
    // 1. Define MATLAB syntax
    monaco.languages.register({ id: 'matlab' });
    monaco.languages.setMonarchTokensProvider('matlab', {
      keywords: [
        'break', 'case', 'catch', 'classdef', 'continue', 'else', 'elseif', 'end',
        'for', 'function', 'global', 'if', 'otherwise', 'parfor', 'persistent',
        'return', 'spmd', 'switch', 'try', 'while'
      ],
      operators: [
        '+', '-', '*', '/', '\\', '^', '.*', './', '.\\', '.^',
        '==', '~=', '>', '>=', '<', '<=', '&', '|', '&&', '||', '~'
      ],
      tokenizer: {
        root: [
          [/[a-zA-Z_]\w*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
          [/[0-9.]+/, 'number'],
          [/'[^']*'/, 'string'],
          [/"[^"]*"/, 'string'],
          [/%{/, 'comment', '@comment_block'],
          [/%(.*)$/, 'comment'],
        ],
        comment_block: [
          [/%}/, 'comment', '@pop'],
          [/.+/, 'comment']
        ]
      }
    });

    // 2. Define Cyberpunk Neon Theme
    monaco.editor.defineTheme('cortex-cyberpunk', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'f09532', fontStyle: 'bold' },    // Amber
        { token: 'type', foreground: 'b5179e', fontStyle: 'bold' },       // Deep Pink
        { token: 'string', foreground: 'f72585' },                        // Hot Pink
        { token: 'number', foreground: '4cc9f0' },                        // Electric Blue
        { token: 'identifier', foreground: 'e2e8f0' },                    // White
        { token: 'comment', foreground: '4dba84', fontStyle: 'italic' },  // Neon Green
        { token: 'variable', foreground: '4cc9f0' },                      // Electric Blue
        { token: 'function', foreground: 'f09532' },                      // Amber
        { token: 'class', foreground: 'b5179e', fontStyle: 'bold' },      // Deep Pink
      ],
      colors: {
        'editor.background': '#00000000', // Transparent for glassmorphism
        'editor.foreground': '#e2e8f0', 
        'editorLineNumber.foreground': '#4b5563', 
        'editor.selectionBackground': '#17171f', 
        'editor.lineHighlightBackground': '#ffffff0a', // Subtle white highlight
        'editorCursor.foreground': '#f09532', // Amber cursor
        'editorIndentGuide.background': '#ffffff1a',
        'editorIndentGuide.activeBackground': '#4b5563',
      }
    });
  };

  return (
    <div className="flex-1 w-full h-full bg-transparent flex flex-col relative">
      {language === "markdown" && (
        <div className="absolute top-4 right-10 z-[100] flex gap-1 bg-cortex-elevated rounded-md border border-cortex-border p-1 shadow-2xl">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              !isPreview ? "bg-cortex-faint text-cortex-amber" : "text-cortex-muted hover:text-white"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              isPreview ? "bg-cortex-faint text-cortex-amber" : "text-cortex-muted hover:text-white"
            }`}
          >
            Preview
          </button>
        </div>
      )}
      
      {isPreview ? (
        <div className="flex-1 overflow-auto p-8 bg-transparent">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={content}
          theme="cortex-cyberpunk"
          beforeMount={handleEditorWillMount}
          onChange={(val) => onChange(val || '')}
          loading={
            <div style={{ 
              height: '100%', width: '100%', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', 
              color: 'var(--color-cortex-muted)' 
            }}>
              Initializing Neural Uplink...
            </div>
          }
          options={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 14,
            minimap: { enabled: false }, // Disabled
            padding: { top: 24, bottom: 24 },
            lineHeight: 1.6,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            wordWrap: 'on'
          }}
        />
      )}
    </div>
  );
}
