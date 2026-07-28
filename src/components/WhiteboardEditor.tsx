"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Page { id: number; content: string; bgType?: 'dotted' | 'lined' | 'plain' | 'white'; }

function PageStrip({ pages, currentIdx, onSelect, onAdd }: {
  pages: Page[];
  currentIdx: number;
  onSelect: (i: number) => void;
  onAdd: () => void;
}) {
  return (
    <div style={{
      height: 40, flexShrink: 0,
      borderTop: '1px solid var(--color-cortex-border)',
      background: 'var(--color-cortex-sidebar)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 4, overflowX: 'auto',
    }}>
      {pages.map((pg, i) => (
        <button
          key={pg.id}
          onClick={() => onSelect(i)}
          style={{
            padding: '3px 14px', borderRadius: 6, fontSize: 11, fontWeight: 500,
            cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
            background: currentIdx === i ? 'var(--color-cortex-amberGlow)' : 'transparent',
            color: currentIdx === i ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)',
            border: currentIdx === i
              ? '1px solid var(--color-cortex-amberBorder)'
              : '1px solid transparent',
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={onAdd}
        title="Add page"
        style={{
          marginLeft: 4, width: 26, height: 26, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, lineHeight: 1, cursor: 'pointer', flexShrink: 0,
          background: 'transparent', color: 'var(--color-cortex-muted)',
          border: '1px dashed var(--color-cortex-border)', transition: 'all .15s',
        }}
      >+</button>
    </div>
  );
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  color: string;
  points: Point[];
  isEraser?: boolean;
}

interface LaserPoint extends Point {
  timestamp: number;
}

// ── Overlay elements (image / bullet list / table) ─────────────────────────
type OverlayType = 'image' | 'bullets' | 'table';
interface CheckItem { text: string; checked: boolean; }
interface Overlay {
  id: number;
  type: OverlayType;
  x: number; y: number;
  src?: string; imgWidth?: number; imgHeight?: number;  // image
  items?: CheckItem[];                                    // checklist
  rows?: number; cols?: number; cells?: string[][]; borderColor?: string; // table
}

// ── Draggable overlay item ──────────────────────────────────────────────────
type ResizeDir = 'n'|'s'|'e'|'w'|'ne'|'nw'|'se'|'sw';
interface ResizeOp { dir: ResizeDir; sx:number; sy:number; sw:number; sh:number; sox:number; soy:number; ar:number; }

function OverlayItem({ overlay, onRemove, onUpdate }: {
  overlay: Overlay;
  onRemove: () => void;
  onUpdate: (patch: Partial<Overlay>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ ox: number; oy: number } | null>(null);
  const resizeRef = useRef<ResizeOp | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
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
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
  const onPointerUp = () => { dragRef.current = null; resizeRef.current = null; };

  const base: React.CSSProperties = {
    position: 'absolute', left: overlay.x, top: overlay.y,
    cursor: 'grab', userSelect: 'none',
    background: 'rgba(11,11,22,0.88)', backdropFilter: 'blur(8px)',
    border: '1px solid var(--color-cortex-border)', borderRadius: 10,
    padding: 10, minWidth: 120,
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
  };

  const closeBtn = (
    <button className="no-drag" onClick={onRemove} style={{
      position: 'absolute', top: -8, right: -8, width: 18, height: 18,
      borderRadius: '50%', background: 'var(--color-cortex-elevated)',
      border: '1px solid var(--color-cortex-border)',
      color: 'var(--color-cortex-muted)', fontSize: 11, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
    }}>×</button>
  );

  // ── Resize handles ──
  const H = 8;
  const THRESH = 24;
  const near = (hx: number, hy: number) => {
    if (!mousePos && !resizeRef.current) return false;
    if (resizeRef.current) return resizeRef.current.dir !== undefined;
    const dx = (mousePos?.x ?? 0) - hx, dy = (mousePos?.y ?? 0) - hy;
    return Math.sqrt(dx * dx + dy * dy) < THRESH;
  };
  const hStyle = (cursor: string, pos: React.CSSProperties, hx: number, hy: number): React.CSSProperties => ({
    position: 'absolute', width: H, height: H, borderRadius: 2,
    background: '#d0cde8', border: '1px solid rgba(255,255,255,0.5)',
    cursor, zIndex: 30, transition: 'opacity .12s',
    opacity: near(hx, hy) ? 1 : 0,
    pointerEvents: near(hx, hy) ? 'auto' : 'none',
    ...pos,
  });
  const mkH = (dir: ResizeDir, cursor: string, pos: React.CSSProperties, hx: number, hy: number) => (
    <div key={dir} className="no-drag" style={hStyle(cursor, pos, hx, hy)} onPointerDown={e => startResize(e, dir)} />
  );
  const resizeHandles = (w: number, h: number) => {
    const m = -H / 2;
    return [
      mkH('nw','nwse-resize',{top:m,left:m},       0,   0),   mkH('n','ns-resize',{top:m,left:w/2+m},     w/2, 0),   mkH('ne','nesw-resize',{top:m,right:m},     w,   0),
      mkH('w','ew-resize',{top:h/2+m,left:m},       0, h/2),                                                          mkH('e','ew-resize',{top:h/2+m,right:m},    w, h/2),
      mkH('sw','nesw-resize',{bottom:m,left:m},     0,   h),   mkH('s','ns-resize',{bottom:m,left:w/2+m}, w/2, h),   mkH('se','nwse-resize',{bottom:m,right:m},  w,   h),
    ];
  };

  if (overlay.type === 'image') {
    const imgW = overlay.imgWidth ?? 280;
    const imgH = overlay.imgHeight ?? 200;
    return (
      <div ref={containerRef} style={{
        position: 'absolute', left: overlay.x, top: overlay.y,
        cursor: 'grab', userSelect: 'none',
        background: 'rgba(11,11,22,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-cortex-border)', borderRadius: 10,
        padding: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        width: imgW + 12,
      }} onPointerDown={onPointerDown}
        onPointerMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left - 6, y: e.clientY - rect.top - 6 });
          onPointerMove(e);
        }}
        onPointerUp={onPointerUp}
        onMouseLeave={() => { if (!resizeRef.current) setMousePos(null); }}
      >
        {closeBtn}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={overlay.src} alt="pinned" style={{ width: imgW, height: imgH, borderRadius: 6, display: 'block', objectFit: 'cover', pointerEvents: 'none' }} />
        {resizeHandles(imgW, imgH)}
      </div>
    );
  }

  if (overlay.type === 'bullets') {
    const items: CheckItem[] = (overlay.items as unknown as CheckItem[]) ?? [];
    const toggleItem = (i: number) => {
      const next = items.map((it, idx) => idx === i ? { ...it, checked: !it.checked } : it);
      onUpdate({ items: next as unknown as CheckItem[] });
    };
    const updateText = (i: number, text: string) => {
      const next = items.map((it, idx) => idx === i ? { ...it, text } : it);
      onUpdate({ items: next as unknown as CheckItem[] });
    };
    return (
      <div style={{ ...base, minWidth: 220, padding: '12px 14px' }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        {closeBtn}
        <div style={{ fontSize: 10, color: '#9a9895', fontWeight: 600, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>Checklist</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            {/* Circle toggle */}
            <button
              className="no-drag"
              onClick={() => toggleItem(i)}
              style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                background: item.checked ? '#e07272' : 'transparent',
                border: `2px solid ${item.checked ? '#e07272' : '#9a9895'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: '#fff', transition: 'all .15s',
              }}
            >{item.checked ? '✓' : ''}</button>
            <input
              className="no-drag"
              value={item.text}
              onChange={e => updateText(i, e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: item.checked ? '#6a6780' : '#d0cde8',
                fontSize: 12, width: '100%',
                textDecoration: item.checked ? 'line-through' : 'none',
                transition: 'all .15s',
              }}
            />
          </div>
        ))}
        <button
          className="no-drag"
          onClick={() => onUpdate({ items: [...items, { text: '', checked: false }] as unknown as CheckItem[] })}
          style={{ fontSize: 11, color: '#9a9895', marginTop: 4, cursor: 'pointer', background: 'none', border: 'none' }}
        >+ Add item</button>
      </div>
    );
  }

  if (overlay.type === 'table') {
    const rows = overlay.rows ?? 3;
    const cols = overlay.cols ?? 3;
    const cells = overlay.cells ?? Array.from({ length: rows }, () => Array(cols).fill(''));
    const borderColor = overlay.borderColor ?? '#c8b89a';
    return (
      <div style={{ ...base, padding: 0, overflow: 'visible' }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        {closeBtn}
        {/* Table color picker row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 8px', borderBottom: `1px solid ${borderColor}`,
          background: `${borderColor}22`,
        }}>
          <span style={{ fontSize: 9, color: '#9a9895', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Border</span>
          <input
            className="no-drag"
            type="color"
            value={borderColor}
            onChange={e => onUpdate({ borderColor: e.target.value })}
            style={{ width: 18, height: 18, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'transparent' }}
          />
          <div style={{ width: 12, height: 12, borderRadius: 3, background: borderColor, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 11 }}>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }, (_, c) => (
                  <td key={c} style={{ border: `1px solid ${borderColor}`, padding: 0 }}>
                    <input
                      className="no-drag"
                      value={cells[r]?.[c] ?? ''}
                      onChange={e => {
                        const next = cells.map(row => [...row]);
                        next[r][c] = e.target.value;
                        onUpdate({ cells: next });
                      }}
                      style={{
                        background: r === 0 ? `${borderColor}28` : 'transparent',
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

export default function WhiteboardEditor({ 

  content, 
  onChange,
  pages,
  currentPageIdx = 0,
  onAddPage,
  onSelectPage,
  currentBgType = 'dotted',
  onChangeBgType,
}: { 
  content: string; 
  onChange: (val: string) => void;
  pages?: Page[] | null;
  currentPageIdx?: number;
  onAddPage?: () => void;
  onSelectPage?: (idx: number) => void;
  currentBgType?: 'dotted' | 'lined' | 'plain' | 'white';
  onChangeBgType?: (t: 'dotted' | 'lined' | 'plain' | 'white') => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const laserCanvasRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool] = useState<"pen" | "laser" | "eraser">("pen");
  const [color, setColor] = useState<string>("#f09532");
  // bgType is now per-page, driven by props
  const bgType = currentBgType;
  const setBgType = (t: 'dotted' | 'lined' | 'plain' | 'white') => onChangeBgType?.(t);

  // Overlays: positioned HTML elements on top of canvas
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const imgPinRef = useRef<HTMLInputElement>(null);

  const addOverlay = useCallback((ov: Omit<Overlay, 'id'>) => {
    setOverlays(prev => [...prev, { ...ov, id: Date.now() }]);
  }, []);

  const removeOverlay = (id: number) => setOverlays(prev => prev.filter(o => o.id !== id));

  const updateOverlay = (id: number, patch: Partial<Overlay>) =>
    setOverlays(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));

  const handlePinImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const maxW = 400;
        const w = Math.min(img.naturalWidth, maxW);
        const h = (img.naturalHeight / img.naturalWidth) * w;
        addOverlay({ type: 'image', x: 80, y: 80, src, imgWidth: w, imgHeight: h });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleAddBullets = () =>
    addOverlay({ type: 'bullets', x: 80, y: 80, items: [{ text: 'Item one', checked: false }, { text: 'Item two', checked: false }] as unknown as CheckItem[] });

  const handleAddTable = () =>
    addOverlay({ type: 'table', x: 80, y: 80, rows: 3, cols: 3, cells: Array.from({ length: 3 }, () => Array(3).fill('')), borderColor: '#c8b89a' });

  // State to hold saved strokes
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const isDrawingRef = useRef(false);

  // Laser state
  const laserPointsRef = useRef<LaserPoint[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Load initial content
  useEffect(() => {
    if (content) {
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          setStrokes(parsed);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save content
  const saveStrokes = (newStrokes: Stroke[]) => {
    setStrokes(newStrokes);
    onChange(JSON.stringify(newStrokes));
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && mainCanvasRef.current && laserCanvasRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        mainCanvasRef.current.width = clientWidth;
        mainCanvasRef.current.height = clientHeight;
        laserCanvasRef.current.width = clientWidth;
        laserCanvasRef.current.height = clientHeight;
        redrawMainCanvas();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size
    return () => window.removeEventListener("resize", handleResize);
  }, [strokes]); // Re-draw on resize

  const redrawMainCanvas = () => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.forEach(p => ctx.lineTo(p.x, p.y));
      
      if (stroke.isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 20;
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
  };

  // Main render loop for the laser
  useEffect(() => {
    const renderLaser = () => {
      const canvas = laserCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();
        
        // Remove points older than 500ms
        laserPointsRef.current = laserPointsRef.current.filter(p => now - p.timestamp < 500);

        if (laserPointsRef.current.length > 0) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          
          for (let i = 1; i < laserPointsRef.current.length; i++) {
            const p1 = laserPointsRef.current[i - 1];
            const p2 = laserPointsRef.current[i];
            const age = now - p2.timestamp;
            const opacity = Math.max(0, 1 - (age / 500));
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(240, 50, 50, ${opacity})`; // Red laser color
            ctx.lineWidth = 6 * opacity + 2; // Thicker at the front
            ctx.stroke();
            
            // Add a glow effect
            ctx.shadowColor = 'rgba(240, 50, 50, 1)';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(renderLaser);
    };
    renderLaser();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const getCoordinates = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    const { x, y } = getCoordinates(e);

    if (tool === "pen" || tool === "eraser") {
      currentStrokeRef.current = { color, points: [{ x, y }], isEraser: tool === "eraser" };
    } else if (tool === "laser") {
      laserPointsRef.current.push({ x, y, timestamp: Date.now() });
    }
    
    // Capture pointer to track outside bounds temporarily
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getCoordinates(e);

    if ((tool === "pen" || tool === "eraser") && currentStrokeRef.current) {
      currentStrokeRef.current.points.push({ x, y });
      
      // Draw live on main canvas
      const ctx = mainCanvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        if (tool === "eraser") {
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineWidth = 20;
          ctx.strokeStyle = "rgba(0,0,0,1)";
        } else {
          ctx.globalCompositeOperation = "source-over";
          ctx.lineWidth = 3;
          ctx.strokeStyle = color;
        }

        const points = currentStrokeRef.current.points;
        const last = points[points.length - 2];
        const current = points[points.length - 1];
        if (last && current) {
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(current.x, current.y);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
      }
    } else if (tool === "laser") {
      laserPointsRef.current.push({ x, y, timestamp: Date.now() });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDrawingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if ((tool === "pen" || tool === "eraser") && currentStrokeRef.current) {
      saveStrokes([...strokes, currentStrokeRef.current]);
      currentStrokeRef.current = null;
    }
  };

  // Background styling
  const bgStyles = {
    dotted: { backgroundImage: 'radial-gradient(circle, var(--color-cortex-muted) 1px, transparent 1px)', backgroundSize: '24px 24px' },
    lined: { backgroundImage: 'linear-gradient(transparent 95%, var(--color-cortex-borderHover) 5%)', backgroundSize: '100% 32px' },
    plain: { background: 'transparent' },
    white: { background: '#FAF9F6' }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#080810]" style={{ overflow: 'hidden' }}>
      {/* Toolbar */}
      <div 
        className="h-14 border-b border-[var(--color-cortex-border)] bg-[var(--color-cortex-sidebar)] flex items-center px-4 gap-6 shrink-0 overflow-x-auto whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Style tag to hide WebKit scrollbars */}
        <style>{`
          .h-14::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setTool("pen")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tool === "pen" ? 'bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] border border-[var(--color-cortex-amberBorder)]' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`}
          >
            ✎ Pen
          </button>
          <button 
            onClick={() => setTool("eraser")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tool === "eraser" ? 'bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] border border-[var(--color-cortex-amberBorder)]' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`}
          >
            ▱ Eraser
          </button>
          <button 
            onClick={() => setTool("laser")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${tool === "laser" ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            Laser
          </button>
        </div>

        <div className="w-px h-6 bg-[var(--color-cortex-border)] shrink-0" />

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[var(--color-cortex-muted)] uppercase tracking-wide">Color</span>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === "laser" || tool === "eraser"}
            className={`w-7 h-7 rounded cursor-pointer border-0 p-0 outline-none bg-transparent ${(tool === 'laser' || tool === 'eraser') ? 'opacity-30' : ''}`}
            style={{ WebkitAppearance: 'none' }}
          />
        </div>

        <div className="w-px h-6 bg-[var(--color-cortex-border)] shrink-0" />

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[var(--color-cortex-muted)] uppercase tracking-wide mr-2">Paper</span>
          {(["dotted", "lined", "plain", "white"] as const).map(type => (
            <button
              key={type}
              onClick={() => setBgType(type)}
              className={`px-3 py-1 rounded text-xs capitalize transition-colors ${bgType === type ? 'bg-[var(--color-cortex-surface)] text-[var(--color-cortex-text)] border border-[var(--color-cortex-border)]' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-[var(--color-cortex-border)] shrink-0" />

        {/* ── Pin / Pointer / Cells ── */}
        <div className="flex gap-1 items-center shrink-0">
          {/* Pin — image (paperclip icon) */}
          <button
            onClick={() => imgPinRef.current?.click()}
            title="Pin image"
            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <input ref={imgPinRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handlePinImage(f); e.target.value=''; }} />

          {/* Pointer — checklist */}
          <button
            onClick={handleAddBullets}
            title="Add checklist"
            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="7" r="2.5"/><line x1="11" y1="7" x2="21" y2="7"/>
              <circle cx="6" cy="17" r="2.5"/><line x1="11" y1="17" x2="21" y2="17"/>
            </svg>
          </button>

          {/* Cells — table grid */}
          <button
            onClick={handleAddTable}
            title="Add table"
            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
              <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
          </button>
        </div>

        <div className="flex-grow shrink" />
        
        <button 
          onClick={() => saveStrokes([])}
          className="text-xs text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-red)] transition-colors px-3 py-1 border border-transparent hover:border-[var(--color-cortex-border)] rounded shrink-0"
        >
          Clear Board
        </button>
      </div>

      {/* Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        style={bgStyles[bgType]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas 
          ref={mainCanvasRef}
          className="absolute inset-0 w-full h-full touch-none"
        />
        <canvas ref={laserCanvasRef} className="absolute inset-0 w-full h-full touch-none pointer-events-none" />

        {/* ── Overlays ── */}
        {overlays.map(ov => (
          <OverlayItem key={ov.id} overlay={ov} onRemove={() => removeOverlay(ov.id)} onUpdate={patch => updateOverlay(ov.id, patch)} />
        ))}
      </div>
      {pages && onAddPage && onSelectPage && (
        <PageStrip
          pages={pages}
          currentIdx={currentPageIdx}
          onSelect={onSelectPage}
          onAdd={onAddPage}
        />
      )}
    </div>
  );
}
