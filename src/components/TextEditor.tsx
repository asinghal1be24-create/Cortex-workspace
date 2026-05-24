"use client";

import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Mark, Node, mergeAttributes, InputRule } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useEffect, useRef, useState, useCallback } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
interface Page { id: number; content: string; }
interface CheckItem { text: string; checked: boolean; }
interface Overlay {
  id: number;
  type: 'image' | 'bullets' | 'table';
  x: number; y: number;
  src?: string;
  imgWidth?: number; imgHeight?: number;       // image sizing
  items?: CheckItem[];
  rows?: number; cols?: number; cells?: string[][]; borderColor?: string;
}
interface TextEditorProps {
  content: string;
  onChange: (val: string) => void;
  pages?: Page[] | null;
  currentPageIdx?: number;
  onAddPage?: () => void;
  onSelectPage?: (idx: number) => void;
}

// ── Custom FontSize Extension ────────────────────────────────────────────────
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Mark.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
        renderHTML: attributes => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
  parseHTML() { return [{ tag: 'span[style*=font-size]' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => chain().setMark('fontSize', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().unsetMark('fontSize').run(),
    };
  },
});

// ── Data Bridge Spark Extension (Phase 2 - AI) ───────────────────────────────

function DataSparkComponent(props: any) {
  const { node, updateAttributes, editor } = props;
  const { rawText, status, filename, amount, category } = node.attrs;

  useEffect(() => {
    let isMounted = true;
    // Only parse if it's new (status === 'pending')
    if (status !== 'pending') return;

    async function parseAI() {
      try {
        let availableLedgers: string[] = [];
        try {
          const stored = localStorage.getItem('cortex_workspace_files');
          if (stored) {
            const files = JSON.parse(stored);
            availableLedgers = files
              .filter((f: any) => f.name.toLowerCase().endsWith('.csv'))
              .map((f: any) => f.name.replace(/\.csv$/i, ''));
          }
        } catch {}

        const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;
        const apiBase = isCapacitor ? 'https://cortex-workspace.vercel.app' : '';

        const res = await fetch(`${apiBase}/api/bridge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: rawText, availableLedgers })
        });
        
        let data;
        try {
          data = await res.json();
        } catch (e) {
          throw new Error("Failed to parse API response as JSON");
        }
        
        if (!isMounted) return;

        if (!res.ok || data.error) {
          throw new Error(data.error || "Server Error");
        }

        if (data.isLogEvent) {
          updateAttributes({ 
            status: 'success', 
            filename: data.filename, 
            amount: data.amount, 
            category: data.category 
          });
          
          // Fire the mutator in page.tsx
          const event = new CustomEvent('cortex-bridge', { 
            detail: { filename: data.filename, amount: data.amount, category: data.category } 
          });
          window.dispatchEvent(event);
        } else {
          updateAttributes({ status: 'ignored' });
        }
      } catch (error) {
        console.error("DataSpark AI Error:", error);
        if (isMounted) {
          updateAttributes({ status: 'error' });
        }
      }
    }
    parseAI();
    return () => { isMounted = false; };
  }, [status, rawText, updateAttributes]);

  // If the AI decides it's not a log, just render the original text back out
  if (status === 'ignored') {
    return <NodeViewWrapper as="span" style={{ color: 'var(--color-cortex-muted)' }}>{rawText}</NodeViewWrapper>;
  }

  // Visuals for the Spark Dot
  const isThinking = status === 'pending';
  const isError = status === 'error';
  
  const bg = isError ? '#e07272' : isThinking ? '#6a6780' : 'var(--color-cortex-amber)';
  const shadow = isThinking ? 'none' : `0 0 6px ${bg}`;
  const animation = isThinking ? 'pulse 1.5s ease-in-out infinite' : 'none';

  return (
    <NodeViewWrapper as="span" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px' }}>
      <span
        style={{
          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
          background: bg, boxShadow: shadow, animation, cursor: 'help'
        }}
        title={
          isThinking ? `AI Parsing: "${rawText}"...` : 
          isError ? `Error parsing: "${rawText}"` :
          `Data Bridge: Sent ${amount} to ${filename} for ${category}\nOriginal: "${rawText}"`
        }
      />
    </NodeViewWrapper>
  );
}

const DataSparkNode = Node.create({
  name: 'dataSpark',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      rawText: { default: '' },
      status: { default: 'pending' }, // 'pending' | 'success' | 'error' | 'ignored'
      filename: { default: '' },
      amount: { default: '' },
      category: { default: '' },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="data-spark"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    // Fallback static HTML rendering (mainly for saving to state)
    return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'data-spark' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DataSparkComponent);
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state } = this.editor;
        const { $from, empty } = state.selection;
        if (!empty) return false;

        const text = $from.parent.textContent;
        const match = text.match(/^\/log\s+(.+)$/i);

        if (match) {
          const rawText = match[1].trim();
          
          // Delete the typed command and insert the Spark dot
          this.editor.chain()
            .deleteRange({ from: $from.start(), to: $from.end() })
            .insertContent({ type: this.name, attrs: { rawText } })
            .run();
            
          // Return false so Tiptap still executes the normal 'Enter' action (creating a new line below the dot)
          return false;
        }
        return false;
      },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        // Matches anything between $$ $$ (e.g. $$spent 40 on food$$)
        find: /\$\$([^$]+)\$\$/,
        handler: ({ state, range, match }) => {
          const [_, rawText] = match;
          state.tr.replaceWith(range.from, range.to, this.type.create({ rawText: rawText.trim() }));
        },
      }),
    ];
  },
});

// ── Temporal Reminder Extension (Chronos Pills) ──────────────────────────────

function TemporalReminderComponent(props: any) {
  const { node, updateAttributes, editor } = props;
  const { rawText, status, task, dateTime, formattedDate, id } = node.attrs;

  useEffect(() => {
    let isMounted = true;
    if (status !== 'pending') return;

    async function parseReminder() {
      try {
        const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;
        const apiBase = isCapacitor ? 'https://cortex-workspace.vercel.app' : '';

        // Fetch voice-intent parser
        const res = await fetch(`${apiBase}/api/voice-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: rawText,
            currentTime: new Date().toString(),
            availableLedgers: []
          })
        });

        const data = await res.json();
        if (!isMounted) return;

        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed parsing");
        }

        if (data.intent === 'schedule_reminder' && data.isTemporalEvent) {
          const uniqueId = 'rem_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
          updateAttributes({
            status: 'active',
            task: data.task,
            dateTime: data.dateTime,
            formattedDate: data.formattedDate,
            id: uniqueId
          });

          // Dispatch to global page scheduler to register the alarm
          const event = new CustomEvent('cortex-reminder-created', {
            detail: {
              id: uniqueId,
              task: data.task,
              dateTime: data.dateTime,
              formattedDate: data.formattedDate,
              rawText: rawText
            }
          });
          window.dispatchEvent(event);
        } else if (data.intent === 'log_expense' && data.isLogEvent) {
          // Smart redirection: if voice was actually an expense log, trigger data bridge!
          updateAttributes({ status: 'ignored' });
          const event = new CustomEvent('cortex-bridge', {
            detail: { filename: data.filename, amount: data.amount, category: data.category }
          });
          window.dispatchEvent(event);
        } else {
          // If general text, mark as ignored so Tiptap renders the text normally
          updateAttributes({ status: 'ignored' });
        }
      } catch (error) {
        console.error("TemporalReminder AI Error:", error);
        if (isMounted) {
          updateAttributes({ status: 'error' });
        }
      }
    }

    parseReminder();
    return () => { isMounted = false; };
  }, [status, rawText, updateAttributes]);

  // Handle triggered/expired status checks dynamically
  useEffect(() => {
    if (status !== 'active') return;

    // Listen for local notifications/alarms trigger events to update the pill state
    const handleTriggered = (e: any) => {
      if (e.detail.id === id) {
        updateAttributes({ status: 'triggered' });
      }
    };
    const handleExpired = (e: any) => {
      if (e.detail.id === id) {
        updateAttributes({ status: 'expired' });
      }
    };

    window.addEventListener('cortex-reminder-triggered', handleTriggered);
    window.addEventListener('cortex-reminder-expired', handleExpired);
    return () => {
      window.removeEventListener('cortex-reminder-triggered', handleTriggered);
      window.removeEventListener('cortex-reminder-expired', handleExpired);
    };
  }, [status, id, updateAttributes]);

  if (status === 'ignored') {
    return <NodeViewWrapper as="span" style={{ color: 'var(--color-cortex-text)' }}>{rawText}</NodeViewWrapper>;
  }

  const isThinking = status === 'pending';
  const isError = status === 'error';
  const isActive = status === 'active';
  const isTriggered = status === 'triggered';
  const isExpired = status === 'expired';

  // Aesthetic styling matching the theme
  let pillBg = 'rgba(255, 255, 255, 0.05)';
  let pillBorder = '1px solid var(--color-cortex-border)';
  let pillColor = 'var(--color-cortex-muted)';
  let glowStyle = {};

  if (isThinking) {
    pillBg = 'rgba(255,255,255,0.03)';
    pillColor = 'var(--color-cortex-muted)';
    glowStyle = { animation: 'cortex-pulse 1.5s ease-in-out infinite' };
  } else if (isError) {
    pillBg = 'rgba(224, 114, 114, 0.1)';
    pillBorder = '1px solid rgba(224, 114, 114, 0.3)';
    pillColor = '#e07272';
  } else if (isActive) {
    pillBg = 'var(--color-cortex-amberGlow)';
    pillBorder = '1px solid var(--color-cortex-amberBorder)';
    pillColor = 'var(--color-cortex-amber)';
    glowStyle = { boxShadow: '0 0 8px var(--color-cortex-amberBorder)', animation: 'cortex-pulse 2s ease-in-out infinite' };
  } else if (isTriggered) {
    pillBg = 'rgba(0, 240, 255, 0.15)';
    pillBorder = '1px solid rgba(0, 240, 255, 0.4)';
    pillColor = '#00f0ff';
    glowStyle = { boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)', animation: 'cortex-pulse 1s ease-in-out infinite' };
  } else if (isExpired) {
    pillBg = 'rgba(255, 255, 255, 0.04)';
    pillBorder = '1px solid rgba(255, 255, 255, 0.08)';
    pillColor = 'rgba(255, 255, 255, 0.3)';
    glowStyle = { textDecoration: 'line-through' };
  }

  return (
    <NodeViewWrapper as="span" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px' }}>
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500,
          background: pillBg, border: pillBorder, color: pillColor,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none', cursor: 'pointer', ...glowStyle
        }}
        onClick={() => {
          if (isActive) {
            alert(`Reminder: "${task}" is set for ${formattedDate}`);
          }
        }}
      >
        <span style={{ fontSize: 10 }}>⏰</span>
        <span>
          {isThinking ? `Scheduling: "${rawText}"...` :
           isError ? `Error: "${rawText}"` :
           `[${task}] @${formattedDate}`}
        </span>
      </span>
    </NodeViewWrapper>
  );
}

const TemporalReminderNode = Node.create({
  name: 'temporalReminder',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      rawText: { default: '' },
      status: { default: 'pending' }, // 'pending' | 'active' | 'triggered' | 'expired' | 'error' | 'ignored'
      task: { default: '' },
      dateTime: { default: '' },
      formattedDate: { default: '' },
      id: { default: '' },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="temporal-reminder"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'temporal-reminder' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TemporalReminderComponent);
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state } = this.editor;
        const { $from, empty } = state.selection;
        if (!empty) return false;

        const text = $from.parent.textContent;
        const match = text.match(/^\/remind\s+(.+)$/i);

        if (match) {
          const rawText = match[1].trim();
          
          this.editor.chain()
            .deleteRange({ from: $from.start(), to: $from.end() })
            .insertContent({ type: this.name, attrs: { rawText } })
            .run();
            
          return false;
        }
        return false;
      },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: /@remind\(([^)]+)\)/,
        handler: ({ state, range, match }) => {
          const [_, rawText] = match;
          state.tr.replaceWith(range.from, range.to, this.type.create({ rawText: rawText.trim() }));
        },
      }),
    ];
  },
});


// ── PageStrip ────────────────────────────────────────────────────────────────
function PageStrip({ pages, currentIdx, onSelect, onAdd }: {
  pages: Page[]; currentIdx: number;
  onSelect: (i: number) => void; onAdd: () => void;
}) {
  return (
    <div style={{
      height: 40, flexShrink: 0,
      borderTop: '1px solid var(--color-cortex-border)',
      background: 'var(--color-cortex-sidebar)',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 4, overflowX: 'auto',
    }}>
      {pages.map((pg, i) => (
        <button key={pg.id} onClick={() => onSelect(i)} style={{
          padding: '3px 14px', borderRadius: 6, fontSize: 11, fontWeight: 500,
          cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
          background: currentIdx === i ? 'var(--color-cortex-amberGlow)' : 'transparent',
          color: currentIdx === i ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)',
          border: currentIdx === i ? '1px solid var(--color-cortex-amberBorder)' : '1px solid transparent',
        }}>{i + 1}</button>
      ))}
      <button onClick={onAdd} title="Add page" style={{
        marginLeft: 4, width: 26, height: 26, borderRadius: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, lineHeight: 1, cursor: 'pointer', flexShrink: 0,
        background: 'transparent', color: 'var(--color-cortex-muted)',
        border: '1px dashed var(--color-cortex-border)', transition: 'all .15s',
      }}>+</button>
    </div>
  );
}

// ── Table size picker (hover grid) ───────────────────────────────────────────
function TablePicker({ onPick, onClose }: {
  onPick: (rows: number, cols: number) => void; onClose: () => void;
}) {
  const [hover, setHover] = useState({ r: 0, c: 0 });
  const MAX = 8;
  return (
    <div style={{
      position: 'absolute', top: 44, left: 0, zIndex: 100,
      background: 'var(--color-cortex-elevated)',
      border: '1px solid var(--color-cortex-border)',
      borderRadius: 10, padding: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ fontSize: 10, color: 'var(--color-cortex-muted)', marginBottom: 6, textAlign: 'center' }}>
        {hover.r > 0 ? `${hover.r} × ${hover.c}` : 'Hover to pick size'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${MAX}, 18px)`, gap: 3 }}>
        {Array.from({ length: MAX * MAX }, (_, i) => {
          const r = Math.floor(i / MAX) + 1;
          const c = (i % MAX) + 1;
          const active = r <= hover.r && c <= hover.c;
          return (
            <div key={i}
              onMouseEnter={() => setHover({ r, c })}
              onClick={() => { onPick(hover.r, hover.c); onClose(); }}
              style={{
                width: 18, height: 18, borderRadius: 3, cursor: 'pointer',
                background: active ? 'var(--color-cortex-amber)' : 'var(--color-cortex-surface)',
                border: `1px solid ${active ? 'var(--color-cortex-amberBorder)' : 'var(--color-cortex-border)'}`,
                transition: 'all .1s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Draggable overlay (checklist / table / image) ────────────────────────────
type ResizeDir = 'n'|'s'|'e'|'w'|'ne'|'nw'|'se'|'sw';
interface ResizeOp { dir: ResizeDir; sx:number; sy:number; sw:number; sh:number; sox:number; soy:number; ar:number; }

function OverlayItem({ overlay, onRemove, onUpdate }: {
  overlay: Overlay; onRemove: () => void; onUpdate: (p: Partial<Overlay>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ ox: number; oy: number } | null>(null);
  const resizeRef = useRef<ResizeOp | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // ── Unified pointer handlers ──
  const onPD = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.nd')) return;
    e.stopPropagation();
    containerRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = { ox: e.clientX - overlay.x, oy: e.clientY - overlay.y };
  };
  const startResize = (e: React.PointerEvent, dir: ResizeDir) => {
    e.stopPropagation();
    containerRef.current?.setPointerCapture(e.pointerId);
    const w = overlay.imgWidth ?? 280;
    const h = overlay.imgHeight ?? 200;
    resizeRef.current = { dir, sx: e.clientX, sy: e.clientY, sw: w, sh: h, sox: overlay.x, soy: overlay.y, ar: w / h };
  };
  const onPM = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resizeRef.current) {
      const rs = resizeRef.current;
      const dx = e.clientX - rs.sx, dy = e.clientY - rs.sy;
      const MIN = 60;
      let nw = rs.sw, nh = rs.sh, nx = rs.sox, ny = rs.soy;
      switch (rs.dir) {
        case 'se': nw = Math.max(MIN, rs.sw + dx); nh = nw / rs.ar; break;
        case 'sw': nw = Math.max(MIN, rs.sw - dx); nh = nw / rs.ar; nx = rs.sox + rs.sw - nw; break;
        case 'ne': nw = Math.max(MIN, rs.sw + dx); nh = nw / rs.ar; ny = rs.soy + rs.sh - nh; break;
        case 'nw': nw = Math.max(MIN, rs.sw - dx); nh = nw / rs.ar; nx = rs.sox + rs.sw - nw; ny = rs.soy + rs.sh - nh; break;
        case 'e':  nw = Math.max(MIN, rs.sw + dx); break;
        case 'w':  nw = Math.max(MIN, rs.sw - dx); nx = rs.sox + rs.sw - nw; break;
        case 's':  nh = Math.max(MIN, rs.sh + dy); break;
        case 'n':  nh = Math.max(MIN, rs.sh - dy); ny = rs.soy + rs.sh - nh; break;
      }
      onUpdate({ imgWidth: nw, imgHeight: nh, x: nx, y: ny });
    } else if (dragRef.current) {
      onUpdate({ x: e.clientX - dragRef.current.ox, y: e.clientY - dragRef.current.oy });
    }
  };
  const onPU = () => { dragRef.current = null; resizeRef.current = null; };

  const base: React.CSSProperties = {
    position: 'absolute', left: overlay.x, top: overlay.y,
    cursor: 'grab', userSelect: 'none', zIndex: 20,
    background: 'rgba(11,11,22,0.9)', backdropFilter: 'blur(8px)',
    border: '1px solid var(--color-cortex-border)', borderRadius: 10,
    padding: 12, minWidth: 130,
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  };

  const closeBtn = (
    <button className="nd" onClick={onRemove} style={{
      position: 'absolute', top: -8, right: -8, width: 18, height: 18,
      borderRadius: '50%', background: 'var(--color-cortex-elevated)',
      border: '1px solid var(--color-cortex-border)',
      color: 'var(--color-cortex-muted)', fontSize: 11, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>×</button>
  );

  // ── Resize handles helper ──
  const H = 8; // handle size px
  const THRESH = 24; // px proximity to show handle
  const near = (hx: number, hy: number) => {
    if (!mousePos && !resizeRef.current) return false;
    if (resizeRef.current) return resizeRef.current.dir !== undefined; // keep visible while resizing
    const dx = (mousePos?.x ?? 0) - hx, dy = (mousePos?.y ?? 0) - hy;
    return Math.sqrt(dx * dx + dy * dy) < THRESH;
  };
  const handleStyle = (cursor: string, pos: React.CSSProperties, hx: number, hy: number): React.CSSProperties => ({
    position: 'absolute', width: H, height: H, borderRadius: 2,
    background: '#d0cde8', border: '1px solid rgba(255,255,255,0.5)',
    cursor, zIndex: 30, transition: 'opacity .12s',
    opacity: near(hx, hy) ? 1 : 0,
    pointerEvents: near(hx, hy) ? 'auto' : 'none',
    ...pos,
  });
  const makeHandle = (dir: ResizeDir, cursor: string, pos: React.CSSProperties, hx: number, hy: number) => (
    <div key={dir} className="nd"
      style={handleStyle(cursor, pos, hx, hy)}
      onPointerDown={e => startResize(e, dir)}
    />
  );
  const resizeHandles = (w: number, h: number) => {
    const m = -H / 2;
    return [
      makeHandle('nw', 'nwse-resize', { top: m, left: m },           0,   0),
      makeHandle('n',  'ns-resize',   { top: m, left: w/2+m },       w/2, 0),
      makeHandle('ne', 'nesw-resize', { top: m, right: m },           w,   0),
      makeHandle('w',  'ew-resize',   { top: h/2+m, left: m },       0,   h/2),
      makeHandle('e',  'ew-resize',   { top: h/2+m, right: m },      w,   h/2),
      makeHandle('sw', 'nesw-resize', { bottom: m, left: m },         0,   h),
      makeHandle('s',  'ns-resize',   { bottom: m, left: w/2+m },    w/2, h),
      makeHandle('se', 'nwse-resize', { bottom: m, right: m },        w,   h),
    ];
  };

  // ── Image ──
  if (overlay.type === 'image') {
    const imgW = overlay.imgWidth ?? 280;
    const imgH = overlay.imgHeight ?? 200;
    return (
      <div ref={containerRef} style={{
        position: 'absolute', left: overlay.x, top: overlay.y,
        cursor: resizeRef.current ? undefined : 'grab',
        userSelect: 'none', zIndex: 20,
        background: 'rgba(11,11,22,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-cortex-border)', borderRadius: 10,
        padding: 6, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        width: imgW + 12, // 6px padding each side
      }} onPointerDown={onPD} onPointerMove={e => {
          // track mouse relative to image area (offset by 6px padding)
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left - 6, y: e.clientY - rect.top - 6 });
          onPM(e);
        }}
        onPointerUp={onPU}
        onMouseLeave={() => { if (!resizeRef.current) setMousePos(null); }}
      >
        {closeBtn}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={overlay.src} alt="pinned" style={{ width: imgW, height: imgH, borderRadius: 6, display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
        {resizeHandles(imgW, imgH)}
      </div>
    );
  }

  // Checklist overlay
  if (overlay.type === 'bullets') {
    const items: CheckItem[] = (overlay.items as unknown as CheckItem[]) ?? [];
    const toggle = (i: number) =>
      onUpdate({ items: items.map((it, idx) => idx === i ? { ...it, checked: !it.checked } : it) as unknown as CheckItem[] });
    const setText = (i: number, text: string) =>
      onUpdate({ items: items.map((it, idx) => idx === i ? { ...it, text } : it) as unknown as CheckItem[] });

    return (
      <div ref={containerRef} style={{ ...base, minWidth: 220, padding: '12px 14px' }} onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}>
        {closeBtn}
        <div style={{ fontSize: 10, color: '#9a9895', fontWeight: 600, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>Checklist</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button className="nd" onClick={() => toggle(i)} style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
              background: item.checked ? '#e07272' : 'transparent',
              border: `2px solid ${item.checked ? '#e07272' : '#9a9895'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#fff', transition: 'all .15s',
            }}>{item.checked ? '✓' : ''}</button>
            <input className="nd" value={item.text} onChange={e => setText(i, e.target.value)} style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: item.checked ? '#6a6780' : '#d0cde8',
              fontSize: 12, width: '100%',
              textDecoration: item.checked ? 'line-through' : 'none',
              transition: 'all .15s',
            }} />
          </div>
        ))}
        <button className="nd"
          onClick={() => onUpdate({ items: [...items, { text: '', checked: false }] as unknown as CheckItem[] })}
          style={{ fontSize: 11, color: '#9a9895', marginTop: 4, cursor: 'pointer', background: 'none', border: 'none' }}
        >+ Add item</button>
      </div>
    );
  }

  // Table overlay
  if (overlay.type === 'table') {
    const rows = overlay.rows ?? 3;
    const cols = overlay.cols ?? 3;
    const cells = overlay.cells ?? Array.from({ length: rows }, () => Array(cols).fill(''));
    const bc = overlay.borderColor ?? '#c8b89a';
    return (
      <div ref={containerRef} style={{ ...base, padding: 0, overflow: 'visible' }} onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}>
        {closeBtn}
        {/* Border color row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderBottom: `1px solid ${bc}`, background: `${bc}22`, borderRadius: '10px 10px 0 0' }}>
          <span style={{ fontSize: 9, color: '#9a9895', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Border</span>
          <input className="nd" type="color" value={bc}
            onChange={e => onUpdate({ borderColor: e.target.value })}
            style={{ width: 18, height: 18, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'transparent' }}
          />
          <div style={{ width: 12, height: 12, borderRadius: 3, background: bc, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 11 }}>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }, (_, c) => (
                  <td key={c} style={{ border: `1px solid ${bc}`, padding: 0 }}>
                    <input className="nd" value={cells[r]?.[c] ?? ''}
                      onChange={e => {
                        const next = cells.map(row => [...row]);
                        next[r][c] = e.target.value;
                        onUpdate({ cells: next });
                      }}
                      style={{
                        background: r === 0 ? `${bc}28` : 'transparent',
                        border: 'none', outline: 'none', padding: '5px 8px',
                        color: r === 0 ? '#d0cde8' : '#b8b5cc',
                        fontWeight: r === 0 ? 600 : 400, fontSize: 11, width: 80,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

// ── Font size menu ────────────────────────────────────────────────────────────
const FONT_LEVELS = [
  { label: 'Normal', size: '14px', cmd: '14px' as const },
  { label: 'Medium', size: '18px', cmd: '18px' as const },
  { label: 'Large',  size: '22px', cmd: '22px' as const },
  { label: 'XL',     size: '28px', cmd: '28px' as const },
  { label: 'XXL',    size: '36px', cmd: '36px' as const },
];
function FontMenu({ onClose, onSelect }: { onClose: () => void; onSelect: (cmd: typeof FONT_LEVELS[0]) => void }) {
  return (
    <div style={{
      position: 'absolute', top: 44, left: 0, zIndex: 100,
      background: 'var(--color-cortex-elevated)', border: '1px solid var(--color-cortex-border)',
      borderRadius: 10, padding: '6px 0', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 140,
    }}>
      {FONT_LEVELS.map(f => (
        <button key={f.label} onClick={() => { onSelect(f); onClose(); }} style={{
          width: '100%', textAlign: 'left', padding: '7px 14px',
          fontSize: f.size, background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-cortex-text)', lineHeight: 1.2,
          transition: 'background .1s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-cortex-surface)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >{f.label}</button>
      ))}
    </div>
  );
}

// ── SVG icon button ───────────────────────────────────────────────────────────
function IconBtn({ title, onClick, active, children }: {
  title: string; onClick: () => void; active?: boolean; children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 32, height: 32, borderRadius: 7, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'all .15s', border: 'none',
      background: active ? 'var(--color-cortex-amberGlow)' : 'transparent',
      color: active ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)',
    }}>{children}</button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TextEditor({
  content, onChange,
  pages, currentPageIdx = 0, onAddPage, onSelectPage,
}: TextEditorProps) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const editorWrapRef = useRef<HTMLDivElement>(null);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [isListening, setIsListening] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      DataSparkNode,
      TemporalReminderNode,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none py-8 min-h-[500px] cortex-editor',
      },
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) { /* sync on page switch */ }
  }, [content, editor]);

  // ── Overlay helpers ────────────────────────────────────────────────────────
  const addOverlay = useCallback((ov: Omit<Overlay, 'id'>) => {
    setOverlays(prev => [...prev, { ...ov, id: Date.now() }]);
  }, []);
  const removeOverlay = (id: number) => setOverlays(prev => prev.filter(o => o.id !== id));
  const updateOverlay = (id: number, patch: Partial<Overlay>) =>
    setOverlays(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        // cap to 400px wide max, preserve aspect ratio
        const maxW = 400;
        const w = Math.min(img.naturalWidth, maxW);
        const h = (img.naturalHeight / img.naturalWidth) * w;
        addOverlay({ type: 'image', x: 60, y: 60, src, imgWidth: w, imgHeight: h });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleInsertTable = (rows: number, cols: number) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  };

  const handleFontSelect = (f: typeof FONT_LEVELS[0]) => {
    if (f.cmd === '14px') {
      editor?.chain().focus().unsetFontSize().run();
    } else {
      editor?.chain().focus().setFontSize(f.cmd).run();
    }
  };

  const isBulletActive = editor?.isActive('bulletList') ?? false;
  const isHeadingActive = FONT_LEVELS.some(f => f.cmd !== '14px' && editor?.isActive('fontSize', { fontSize: f.cmd }));

  // ── Voice-to-Bridge ────────────────────────────────────────────────────────
  const handleMicClick = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Try Chrome or Safari.');
      return;
    }

    if (isListening) return; // Prevent multiple instances

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        try {
          let availableLedgers: string[] = [];
          try {
            const stored = localStorage.getItem('cortex_workspace_files');
            if (stored) {
              const files = JSON.parse(stored);
              availableLedgers = files
                .filter((f: any) => f.name.toLowerCase().endsWith('.csv'))
                .map((f: any) => f.name.replace(/\.csv$/i, ''));
            }
          } catch {}

          const isCapacitor = typeof window !== 'undefined' && !!(window as any).Capacitor;
          const apiBase = isCapacitor ? 'https://cortex-workspace.vercel.app' : '';

          // Fetch voice intent
          const res = await fetch(`${apiBase}/api/voice-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: transcript,
              currentTime: new Date().toString(),
              availableLedgers
            })
          });

          const data = await res.json();
          if (res.ok && !data.error) {
            if (data.intent === 'schedule_reminder' && data.isTemporalEvent) {
              const uniqueId = 'rem_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
              editor?.chain().focus().insertContent({
                type: 'temporalReminder',
                attrs: {
                  rawText: transcript,
                  status: 'active',
                  task: data.task,
                  dateTime: data.dateTime,
                  formattedDate: data.formattedDate,
                  id: uniqueId
                }
              }).run();

              // Register the alarm globally
              const registerEvent = new CustomEvent('cortex-reminder-created', {
                detail: {
                  id: uniqueId,
                  task: data.task,
                  dateTime: data.dateTime,
                  formattedDate: data.formattedDate,
                  rawText: transcript
                }
              });
              window.dispatchEvent(registerEvent);
            } else if (data.intent === 'log_expense' && data.isLogEvent) {
              editor?.chain().focus().insertContent({
                type: 'dataSpark',
                attrs: {
                  rawText: transcript,
                  status: 'success',
                  filename: data.filename,
                  amount: data.amount,
                  category: data.category
                }
              }).run();

              // Trigger ledger
              const bridgeEvent = new CustomEvent('cortex-bridge', {
                detail: { filename: data.filename, amount: data.amount, category: data.category }
              });
              window.dispatchEvent(bridgeEvent);
            } else {
              // General text
              editor?.chain().focus().insertContent(data.text + ' ').run();
            }
          } else {
            // Fallback: insert raw transcript if API failed
            editor?.chain().focus().insertContent(transcript + ' ').run();
          }
        } catch (err) {
          console.error("Mic processing error:", err);
          editor?.chain().focus().insertContent(transcript + ' ').run();
        }
      }
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Table border CSS ── */}
      <style>{`
        .cortex-editor { font-size: 14px; line-height: 1.6; }
        .cortex-editor p { font-size: 14px; margin: 0 0 1em 0; }
        .cortex-editor h4 { font-size: 18px; font-weight: 600; margin: 1.2em 0 0.5em 0; line-height: 1.4; }
        .cortex-editor h3 { font-size: 22px; font-weight: 600; margin: 1.2em 0 0.5em 0; line-height: 1.3; }
        .cortex-editor h2 { font-size: 28px; font-weight: 700; margin: 1.2em 0 0.5em 0; line-height: 1.2; letter-spacing: -0.01em; }
        .cortex-editor h1 { font-size: 36px; font-weight: 800; margin: 1em 0 0.5em 0; line-height: 1.1; letter-spacing: -0.02em; }
        .cortex-editor ul { list-style-type: disc; margin-left: 1.5em; margin-bottom: 1em; }
        .cortex-editor li { margin-bottom: 0.25em; }
        .cortex-editor table { border-collapse: collapse; margin: 12px 0; }
        .cortex-editor td, .cortex-editor th { border: 1.5px solid #c8b89a; padding: 6px 10px; min-width: 60px; }
        .cortex-editor th { background: rgba(200,184,154,0.12); font-weight: 600; color: #d0cde8; }
        .cortex-editor td { color: #b8b5cc; }
        @keyframes cortex-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
      `}</style>

      {/* ── Toolbar ── */}
      <div style={{
        height: 44, flexShrink: 0,
        borderBottom: '1px solid var(--color-cortex-border)',
        background: 'var(--color-cortex-sidebar)',
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 2,
      }}>

        {/* Aa — Font size */}
        <div style={{ position: 'relative' }}>
          <IconBtn title="Font size" active={showFontMenu || isHeadingActive} onClick={() => { setShowFontMenu(v => !v); setShowTablePicker(false); }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.5 }}>Aa</span>
          </IconBtn>
          {showFontMenu && <FontMenu onClose={() => setShowFontMenu(false)} onSelect={handleFontSelect} />}
        </div>

        <div style={{ width: 1, height: 20, background: 'var(--color-cortex-border)', margin: '0 4px' }} />

        {/* Paperclip — Pin image */}
        <IconBtn title="Pin image" onClick={() => imgInputRef.current?.click()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </IconBtn>
        <input ref={imgInputRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); e.target.value = ''; }}
        />

        {/* Microphone — Voice-to-Bridge */}
        <IconBtn title="Voice-to-Bridge (Dictate a log)" active={isListening} onClick={handleMicClick}>
          {isListening ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--color-cortex-amber)" stroke="none">
              <circle cx="12" cy="12" r="8" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          )}
        </IconBtn>

        {/* Checklist — Pointer */}
        <IconBtn title="Add checklist" active={false}
          onClick={() => addOverlay({ type: 'bullets', x: 80, y: 80, items: [{ text: 'Item one', checked: false }, { text: 'Item two', checked: false }] as unknown as CheckItem[] })}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="7" r="2.5"/><line x1="11" y1="7" x2="21" y2="7"/>
            <circle cx="6" cy="17" r="2.5"/><line x1="11" y1="17" x2="21" y2="17"/>
          </svg>
        </IconBtn>

        {/* Table grid — Cells */}
        <div style={{ position: 'relative' }}>
          <IconBtn title="Insert table" active={showTablePicker}
            onClick={() => { setShowTablePicker(v => !v); setShowFontMenu(false); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
              <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
          </IconBtn>
          {showTablePicker && (
            <TablePicker onPick={handleInsertTable} onClose={() => setShowTablePicker(false)} />
          )}
        </div>

        <div style={{ flex: 1 }} />
      </div>

      {/* ── Editor + overlays ── */}
      <div ref={editorWrapRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', overflowY: 'auto', padding: '0 24px' }}>
          <EditorContent editor={editor} />
        </div>

        {/* Checklist & table overlays float over the text */}
        {overlays.map(ov => (
          <OverlayItem key={ov.id} overlay={ov}
            onRemove={() => removeOverlay(ov.id)}
            onUpdate={patch => updateOverlay(ov.id, patch)}
          />
        ))}
      </div>

      {/* ── Page strip ── */}
      {pages && onAddPage && onSelectPage && (
        <PageStrip pages={pages} currentIdx={currentPageIdx} onSelect={onSelectPage} onAdd={onAddPage} />
      )}
    </div>
  );
}
