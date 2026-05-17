"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
  activeFileName: string;
  activeFileContent: string;
  relatedFilesData: { name: string; content: string }[];
}

export default function AICopilot({ isOpen, onClose, activeFileName, activeFileContent, relatedFilesData }: AICopilotProps) {
  // Build the context string safely
  const buildContext = () => {
    let ctx = `[ACTIVE FILE: ${activeFileName}]\n${activeFileContent}\n\n`;
    if (relatedFilesData.length > 0) {
      ctx += `[RELATED FILES FOR CONTEXT]\n`;
      relatedFilesData.forEach(f => {
        // Truncate related file content to avoid blowing up context window
        const truncated = f.content.length > 1000 ? f.content.slice(0, 1000) + '... [TRUNCATED]' : f.content;
        ctx += `--- ${f.name} ---\n${truncated}\n\n`;
      });
    }
    return ctx;
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: {
      contextText: buildContext(),
    },
    onError: (err) => {
      alert("Neo encountered an error: " + err.message);
      console.error(err);
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const B = {
    bg: 'var(--color-cortex-bg)',
    sidebar: 'var(--color-cortex-sidebar)',
    border: 'var(--color-cortex-border)',
    amber: 'var(--color-cortex-amber)',
    amberGlow: 'var(--color-cortex-amberGlow)',
    amberBorder: 'var(--color-cortex-amberBorder)',
    text: 'var(--color-cortex-text)',
    muted: 'var(--color-cortex-muted)',
    surface: 'var(--color-cortex-surface)',
    elevated: 'var(--color-cortex-elevated)',
  };

  return (
    <div style={{
      width: 320,
      background: B.sidebar,
      borderLeft: `1px solid ${B.border}`,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative',
      zIndex: 20,
    }}>
      {/* Header */}
      <div style={{
        height: 56, borderBottom: `1px solid ${B.border}`, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: B.amber, letterSpacing: 0.5 }}>NEO</span>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: B.muted, cursor: 'pointer', fontSize: 18
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: B.muted, fontSize: 13, marginTop: 40, lineHeight: 1.6 }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🧠</div>
            I'm reading <strong>{activeFileName}</strong>.<br/>
            Need a sounding board?
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              fontSize: 11, color: B.muted, marginBottom: 4, padding: '0 4px',
              textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500
            }}>
              {m.role === 'user' ? 'You' : 'Neo'}
            </div>
            <div style={{
              background: m.role === 'user' ? B.elevated : 'transparent',
              border: m.role === 'user' ? `1px solid ${B.border}` : 'none',
              padding: m.role === 'user' ? '10px 14px' : '0 4px',
              borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '0',
              color: m.role === 'user' ? B.text : '#b8b5cc',
              fontSize: 14, lineHeight: 1.6,
              maxWidth: '90%',
              whiteSpace: 'pre-wrap'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ fontSize: 12, color: B.amber, fontStyle: 'italic' }}>Thinking...</div>
        )}
        {error && (
          <div style={{ fontSize: 12, color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', padding: '8px', borderRadius: '4px' }}>
            Connection Error: {error.message || "Failed to reach Groq API."}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px', borderTop: `1px solid ${B.border}`, background: B.surface }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your file..."
            style={{
              flex: 1, background: B.bg, border: `1px solid ${B.border}`,
              padding: '10px 14px', borderRadius: 8, color: B.text, fontSize: 13,
              outline: 'none'
            }}
          />
          <button type="submit" disabled={isLoading || !input?.trim()} style={{
            background: B.amber, color: '#000', border: 'none', borderRadius: 8,
            padding: '0 14px', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: (!input?.trim() || isLoading) ? 0.5 : 1
          }}>
            ↑
          </button>
        </form>
        <div style={{ fontSize: 10, color: B.muted, textAlign: 'center', marginTop: 8 }}>
          Reading: {activeFileName} + {relatedFilesData.length} related files
        </div>
      </div>
    </div>
  );
}
