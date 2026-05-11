"use client";

import { useState, useEffect, useRef } from "react";
import { WorkspaceFile } from "@/types";
import { getFileType } from "./DynamicCanvas";
import { extractKeywords, jaccard, getProject } from "@/lib/similarity";

// ── Types ──────────────────────────────────────────────────────────────────

interface CNode {
  id: string;
  label: string;
  type: string;
  project: string;
  x: number; y: number; vx: number; vy: number;
  keywords: Set<string>;
  color: string;
}

interface CEdge {
  from: string; to: string;
  strength: number; reason: string;
  manual: boolean; color: string;
}

const TYPE_COLORS: Record<string, string> = {
  text: '#6199f5', code: '#9b7ff0', finance: '#4dba84', whiteboard: '#f09532',
};


function computeAutoEdges(nodes: CNode[]): CEdge[] {
  const edges: CEdge[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) continue;
      let best = { strength: 0, reason: '' };
      if (a.project === b.project && a.project.length > 1) best = { strength: 0.9, reason: `Project: ${a.project}` };
      const sim = jaccard(a.keywords, b.keywords);
      if (sim > 0.05 && sim * 4 > best.strength) {
        const shared = [...a.keywords].filter(w => b.keywords.has(w)).slice(0, 3);
        best = { strength: Math.min(0.95, sim * 4), reason: `Topics: ${shared.join(', ')}` };
      }
      if ((a.type === 'finance' && b.type === 'text') || (a.type === 'text' && b.type === 'finance')) {
        if (0.3 > best.strength) best = { strength: 0.3, reason: 'Finance ↔ Notes' };
      }
      if ((a.type === 'code' && b.type === 'whiteboard') || (a.type === 'whiteboard' && b.type === 'code')) {
        if (0.35 > best.strength) best = { strength: 0.35, reason: 'Code ↔ Diagram' };
      }
      if (best.strength > 0) {
        seen.add(key);
        edges.push({ from: a.id, to: b.id, ...best, manual: false, color: 'rgba(255,255,255,0.35)' });
      }
    }
  }
  return edges;
}

// ── LINK COLORS ────────────────────────────────────────────────────────────
const LINK_COLORS = ['#f09532','#6199f5','#9b7ff0','#4dba84','#e07272','#ffffff'];

// ── COMPONENT ──────────────────────────────────────────────────────────────

export default function ConsciousnessView({
  files, activeFileId, onSelectFile,
}: { files: WorkspaceFile[]; activeFileId: string; onSelectFile: (id: string) => void; }) {

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const nodesRef = useRef<CNode[]>([]);
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const isSimRunning = useRef(false);

  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [renderNodes, setRenderNodes] = useState<CNode[]>([]);
  const [autoEdges, setAutoEdges] = useState<CEdge[]>([]);
  const [manualEdges, setManualEdges] = useState<CEdge[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: CNode } | null>(null);
  const [linkMode, setLinkMode] = useState(false);
  const [linkFirst, setLinkFirst] = useState<string | null>(null);
  const [linkColor, setLinkColor] = useState('#f09532');
  const [hovEdgeIdx, setHovEdgeIdx] = useState<{ type: 'auto' | 'manual'; idx: number } | null>(null);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDims({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Build nodes when files change
  useEffect(() => {
    const next: CNode[] = files.map((f, i) => {
      const ex = nodesRef.current.find(n => n.id === f.id);
      const angle = (2 * Math.PI * i) / files.length;
      const rad = Math.min(dims.w, dims.h) * 0.28;
      const type = getFileType(f.name);
      return {
        id: f.id, label: f.name, type,
        project: getProject(f.name),
        x: ex?.x ?? dims.w / 2 + rad * Math.cos(angle),
        y: ex?.y ?? dims.h / 2 + rad * Math.sin(angle),
        vx: ex?.vx ?? 0, vy: ex?.vy ?? 0,
        color: TYPE_COLORS[type] || '#6199f5',
        keywords: extractKeywords(f.content),
      };
    });
    nodesRef.current = next;
    setRenderNodes([...next]);
    setAutoEdges(computeAutoEdges(next));
  }, [files, dims]);

  // Physics sim
  const startSim = () => {
    if (isSimRunning.current) return;
    isSimRunning.current = true;
    const { w, h } = dims;
    const allEdges = [...autoEdges, ...manualEdges];

    const tick = () => {
      const ns = nodesRef.current;
      for (let i = 0; i < ns.length; i++) {
        if (dragRef.current?.id === ns[i].id) continue;
        for (let j = i + 1; j < ns.length; j++) {
          if (dragRef.current?.id === ns[j].id) continue;
          const dx = ns[j].x - ns[i].x, dy = ns[j].y - ns[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 4000 / (dist * dist);
          ns[i].vx -= (dx / dist) * force; ns[i].vy -= (dy / dist) * force;
          ns[j].vx += (dx / dist) * force; ns[j].vy += (dy / dist) * force;
        }
      }
      for (const e of allEdges) {
        const a = ns.find(n => n.id === e.from), b = ns.find(n => n.id === e.to);
        if (!a || !b) continue;
        if (dragRef.current?.id === a.id || dragRef.current?.id === b.id) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = e.manual ? 150 : 220 - e.strength * 80;
        const diff = (dist - target) * 0.015;
        a.vx += (dx / dist) * diff; a.vy += (dy / dist) * diff;
        b.vx -= (dx / dist) * diff; b.vy -= (dy / dist) * diff;
      }
      for (const n of ns) {
        if (dragRef.current?.id === n.id) continue;
        n.vx += (w / 2 - n.x) * 0.002; n.vy += (h / 2 - n.y) * 0.002;
        n.vx *= 0.82; n.vy *= 0.82;
        n.x = Math.max(20, Math.min(w - 20, n.x + n.vx));
        n.y = Math.max(20, Math.min(h - 20, n.y + n.vy));
      }
      setRenderNodes([...ns]);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    setTimeout(() => {
      if (animRef.current) { cancelAnimationFrame(animRef.current); isSimRunning.current = false; }
    }, 4000);
  };

  useEffect(() => {
    startSim();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); isSimRunning.current = false; };
  }, [autoEdges, manualEdges, dims]);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const getSVGPos = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    if (linkMode) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const { x, y } = getSVGPos(e);
    const node = nodesRef.current.find(n => n.id === id)!;
    dragRef.current = { id, ox: x - node.x, oy: y - node.y };
  };

  const onSVGPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const { x, y } = getSVGPos(e);
    const node = nodesRef.current.find(n => n.id === dragRef.current!.id);
    if (!node) return;
    node.x = x - dragRef.current.ox;
    node.y = y - dragRef.current.oy;
    setRenderNodes([...nodesRef.current]);
  };

  const onSVGPointerUp = () => { dragRef.current = null; startSim(); };

  // ── Node click (link mode) ─────────────────────────────────────────────────
  const onNodeClick = (id: string) => {
    if (!linkMode) { onSelectFile(id); return; }
    if (!linkFirst) { setLinkFirst(id); return; }
    if (linkFirst !== id) {
      const key = [linkFirst, id].sort().join('|');
      const dup = manualEdges.some(e => [e.from, e.to].sort().join('|') === key);
      if (!dup) {
        setManualEdges(prev => [...prev, {
          from: linkFirst, to: id, strength: 1, reason: 'Manual', manual: true, color: linkColor,
        }]);
      }
    }
    setLinkFirst(null);
  };

  const removeManualEdge = (idx: number) => setManualEdges(prev => prev.filter((_, i) => i !== idx));

  const allEdges = [...autoEdges, ...manualEdges];
  const nodeMap = Object.fromEntries(renderNodes.map(n => [n.id, n]));

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden select-none" style={{ background: '#050508' }}>

      {/* Stars */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2, pointerEvents: 'none' }}>
        {Array.from({ length: 80 }, (_, i) => (
          <circle key={i} cx={`${(i * 137.5) % 100}%`} cy={`${(i * 61.8) % 100}%`}
            r={(i % 3 === 0) ? 1.2 : 0.5} fill="white" />
        ))}
      </svg>

      {/* ── TOOLBAR ── */}
      <div style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', gap: 8, alignItems: 'center',
        background: 'rgba(11,11,15,0.92)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '8px 16px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#dddaeb', letterSpacing: 1.5 }}>CONSCIOUSNESS</span>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />

        {/* Link mode toggle */}
        <button onClick={() => { setLinkMode(v => !v); setLinkFirst(null); }} style={{
          padding: '4px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all .2s',
          background: linkMode ? 'rgba(240,149,50,0.15)' : 'transparent',
          color: linkMode ? '#f09532' : '#6a6780',
          border: linkMode ? '1px solid rgba(240,149,50,0.3)' : '1px solid rgba(255,255,255,0.06)',
        }}>
          {linkMode ? (linkFirst ? '● Click 2nd node' : '○ Click 1st node') : '⊕ Draw Link'}
        </button>

        {/* Color picker for links */}
        {linkMode && (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {LINK_COLORS.map(c => (
              <button key={c} onClick={() => setLinkColor(c)} style={{
                width: linkColor === c ? 18 : 12, height: linkColor === c ? 18 : 12,
                borderRadius: '50%', background: c, border: linkColor === c ? `2px solid white` : 'none',
                cursor: 'pointer', transition: 'all .15s', flexShrink: 0,
              }} />
            ))}
          </div>
        )}

        {linkMode && <button onClick={() => { setLinkMode(false); setLinkFirst(null); }}
          style={{ fontSize: 11, color: '#6a6780', cursor: 'pointer', background: 'none', border: 'none' }}>✕ Cancel</button>}
      </div>

      {/* ── SVG ── */}
      <svg width="100%" height="100%"
        onPointerMove={onSVGPointerMove}
        onPointerUp={onSVGPointerUp}
        onPointerCancel={onSVGPointerUp}
        style={{ cursor: linkMode ? 'crosshair' : 'default' }}
      >
        {/* Edges */}
        {allEdges.map((e, i) => {
          const a = nodeMap[e.from], b = nodeMap[e.to];
          if (!a || !b) return null;
          const isHl = hovEdgeIdx?.idx === i || hovered === e.from || hovered === e.to;
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const edgeType = i < autoEdges.length ? 'auto' : 'manual';
          return (
            <g key={`${edgeType}-${i}`}
              onMouseEnter={() => setHovEdgeIdx({ type: edgeType, idx: i })}
              onMouseLeave={() => setHovEdgeIdx(null)}
              onDoubleClick={() => e.manual && removeManualEdge(i - autoEdges.length)}
              style={{ cursor: e.manual ? 'pointer' : 'default' }}
            >
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={10} />
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={e.manual ? e.color : isHl ? '#ffffff' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isHl ? 1.5 : e.manual ? 1.2 : 0.7}
                strokeDasharray={e.manual ? 'none' : '4 6'}
                opacity={isHl ? 1 : e.manual ? 0.7 : 0.5}
                style={{ transition: 'all .2s' }}
              />
              {isHl && (
                <text x={midX} y={midY - 7} textAnchor="middle"
                  fontSize="9" fill={e.manual ? e.color : '#8888aa'}
                  fontFamily="'DM Sans', system-ui" style={{ pointerEvents: 'none' }}>
                  {e.manual ? `✦ ${e.reason}` : `${e.reason} · ${Math.round(e.strength * 100)}%`}
                </text>
              )}
            </g>
          );
        })}

        {/* Ghost line when linking */}
        {linkMode && linkFirst && (() => {
          const fn = nodeMap[linkFirst];
          return fn ? (
            <circle cx={fn.x} cy={fn.y} r={14} fill={linkColor} opacity={0.2}
              className="pulse-ring" />
          ) : null;
        })()}

        {/* Nodes — small dots */}
        {renderNodes.map(n => {
          const isHov = hovered === n.id;
          const isActive = n.id === activeFileId;
          const isFirst = n.id === linkFirst;
          const DOT_R = 7;

          return (
            <g key={n.id}
              style={{ cursor: linkMode ? 'crosshair' : dragRef.current?.id === n.id ? 'grabbing' : 'grab' }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onPointerDown={e => onNodePointerDown(e, n.id)}
              onClick={() => onNodeClick(n.id)}
            >
              {/* Glow */}
              <circle cx={n.x} cy={n.y} r={DOT_R * 3.5} fill={n.color}
                opacity={isHov || isActive ? 0.12 : 0.04}
                style={{ transition: 'opacity .25s' }} />

              {/* Pulse ring for active/selected */}
              {(isActive || isFirst) && (
                <circle cx={n.x} cy={n.y} r={DOT_R} fill={isFirst ? linkColor : n.color}
                  opacity={0.2} className="pulse-ring" />
              )}

              {/* Dot */}
              <circle cx={n.x} cy={n.y} r={isHov || isActive ? DOT_R + 2 : DOT_R}
                fill={isActive ? n.color : isFirst ? linkColor : n.color}
                stroke={isFirst ? linkColor : n.color}
                strokeWidth={isActive || isFirst ? 2 : 1}
                opacity={isHov || isActive || isFirst ? 1 : 0.75}
                style={{ transition: 'r .15s, opacity .15s' }}
              />
            </g>
          );
        })}
      </svg>

      {/* ── HOVER TOOLTIP ── */}
      {hovered && (() => {
        const n = nodeMap[hovered];
        if (!n) return null;
        const kws = [...n.keywords].slice(0, 5);
        return (
          <div style={{
            position: 'absolute', left: n.x + 16, top: n.y - 12,
            pointerEvents: 'none', zIndex: 20,
            background: 'rgba(11,11,15,0.95)', backdropFilter: 'blur(10px)',
            border: `1px solid ${n.color}40`, borderRadius: 10,
            padding: '10px 14px', minWidth: 160, maxWidth: 240,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#dddaeb', wordBreak: 'break-all' }}>{n.label}</span>
            </div>
            <div style={{ fontSize: 10, color: '#6a6780', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              {n.type}
            </div>
            {kws.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {kws.map(w => (
                  <span key={w} style={{
                    fontSize: 10, padding: '1px 6px', borderRadius: 8,
                    background: `${n.color}18`, color: n.color, border: `1px solid ${n.color}30`,
                  }}>{w}</span>
                ))}
              </div>
            )}
            <div style={{ fontSize: 10, color: '#6a6780', marginTop: 6 }}>
              {linkMode ? 'Click to link' : 'Click to open · Drag to move'}
            </div>
          </div>
        );
      })()}

      {/* ── LEGEND ── */}
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        background: 'rgba(11,11,15,0.88)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
        padding: '12px 14px', fontSize: 11, color: '#6a6780',
      }}>
        <div style={{ fontWeight: 600, color: '#dddaeb', marginBottom: 8 }}>Node types</div>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
            <span style={{ textTransform: 'capitalize' }}>{type}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8, paddingTop: 8 }}>
          <div>Dbl-click manual edge to remove</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        background: 'rgba(11,11,15,0.88)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
        padding: '10px 14px', fontSize: 11, color: '#6a6780',
      }}>
        <span style={{ color: '#dddaeb', fontWeight: 600 }}>{renderNodes.length}</span> nodes &nbsp;·&nbsp;
        <span style={{ color: '#dddaeb', fontWeight: 600 }}>{autoEdges.length}</span> auto &nbsp;·&nbsp;
        <span style={{ color: '#f09532', fontWeight: 600 }}>{manualEdges.length}</span> manual
      </div>
    </div>
  );
}
