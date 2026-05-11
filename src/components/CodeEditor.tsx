"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ 
  content, 
  fileName, 
  onChange 
}: { 
  content: string; 
  fileName: string; 
  onChange: (val: string) => void;
}) {
  // Determine language based on extension
  let language = "javascript";
  if (fileName.endsWith('.py')) language = "python";
  if (fileName.endsWith('.m')) language = "matlab"; // Note: Monaco doesn't have default MATLAB, but it will try to syntax highlight
  if (fileName.endsWith('.sql')) language = "sql";
  if (fileName.endsWith('.html')) language = "html";
  if (fileName.endsWith('.css')) language = "css";
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) language = "typescript";

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('cortex-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '9b7ff0', fontStyle: 'bold' },    // P.purple
        { token: 'type', foreground: 'f09532', fontStyle: 'bold' },       // P.amber
        { token: 'string', foreground: '4dba84' },                        // P.green
        { token: 'number', foreground: 'e07272' },                        // P.red
        { token: 'identifier', foreground: 'dddaeb' },                    // P.text
        { token: 'comment', foreground: '6a6780', fontStyle: 'italic' },  // P.muted
        { token: 'variable', foreground: '6199f5' },                      // P.blue
        { token: 'function', foreground: 'f09532' },                      // P.amber
        { token: 'class', foreground: 'f09532', fontStyle: 'bold' },      // P.amber
      ],
      colors: {
        'editor.background': '#07070a', // P.bg
        'editor.foreground': '#dddaeb', // P.text
        'editorLineNumber.foreground': '#2e2c42', // P.faint
        'editor.selectionBackground': '#17171f', // P.elevated
        'editor.lineHighlightBackground': '#111118', // P.surface
        'editorCursor.foreground': '#f09532', // P.amber
        'editorIndentGuide.background': '#111118',
        'editorIndentGuide.activeBackground': '#2e2c42',
      }
    });
  };

  return (
    <div className="flex-1 w-full h-full bg-[#07070a]">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={content}
        theme="cortex-dark"
        beforeMount={handleEditorWillMount}
        onChange={(val) => onChange(val || '')}
        options={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: 14,
          minimap: { enabled: false },
          padding: { top: 24 },
          lineHeight: 1.6,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "all",
        }}
      />
    </div>
  );
}
