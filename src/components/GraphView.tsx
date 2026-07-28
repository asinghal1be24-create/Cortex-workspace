"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WorkspaceFile } from "@/types";
import { getFileType } from "./DynamicCanvas";

interface GraphNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

interface GraphEdge {
  from: string;
  to: string;
  strength: number;
  reason: string;
}

const TYPE_COLORS: Record<string, string> = {
  text:       '#6199f5',
  code:       '#9b7ff0',
  finance:    '#4dba84',
  whiteboard: '#f09532',
};

function computeEdges(files: WorkspaceFile[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (let i = 0; i < files.length; i++) {
    for (let j = i + 1; j < files.length; j++) {
      const a = files[i], b = files[j];
      const aType = getFileType(a.name), bType = getFileType(b.name);

      // Same type → connected
      if (aType === bType) {
        edges.push({ from: a.id, to: b.id, strength: 0.75, reason: `Same type: ${aType}` });
        continue;
      }

      // finance ↔ text (reports, summaries)
      if ((aType === 'finance' && bType === 'text') || (aType === 'text' && bType === 'finance')) {
        edges.push({ from: a.id, to: b.id, strength: 0.45, reason: 'Finance ↔ Notes' });
        continue;
      }

      // code ↔ whiteboard (architecture diagrams)
      if ((aType === 'code' && bType === 'whiteboard') || (aType === 'whiteboard' && bType === 'code')) {
        edges.push({ from: a.id, to: b.id, strength: 0.5, reason: 'Code ↔ Diagram' });
        continue;
      }

      // Shared keywords in name
      const aWords = a.name.toLowerCase().replace(/\.\w+$/, '').split(/[\s_\-]+/);
      const bWords = b.name.toLowerCase().replace(/\.\w+$/, '').split(/[\s_\-]+/);
      const shared = aWords.filter(w => w.length > 3 && bWords.includes(w));
      if (shared.length > 0) {
        edges.push({ from: a.id, to: b.id, strength: 0.6, reason: `Shared: ${shared.join(', ')}` });
      }
    }
  }
  return edges;
}

export default function GraphView({
  files,
  activeFileId,
  onSelectFile,
}: {
  files: WorkspaceFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const animRef = useRef<number | null>(null);

  // Measure container
  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Build nodes when files change
  useEffect(() => {
    setNodes(prev => {
      return files.map((f, i) => {
        const existing = prev.find(n => n.id === f.id);
        const angle = (2 * Math.PI * i) / files.length;
        const radius = Math.min(dims.w, dims.h) * 0.28;
        const type = getFileType(f.name);
        return {
          id: f.id,
          label: f.name,
          type,
          x: existing?.x ?? dims.w / 2 + radius * Math.cos(angle),
          y: existing?.y ?? dims.h / 2 + radius * Math.sin(angle),
          vx: existing?.vx ?? 0,
          vy: existing?.vy ?? 0,
          r: 22,
          color: TYPE_COLORS[type] || '#6199f5',
        };
      });
    });
    setEdges(computeEdges(files));
  }, [files, dims]);

  // Force-directed layout simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    const tick = () => {
      setNodes(prev => {
        const next = prev.map(n => ({ ...n }));
        const k = 0.015;    // spring constant
        const repel = 4000; // repulsion
        const damping = 0.8;
        const centerX = dims.w / 2;
        const centerY = dims.h / 2;

        // Repulsion between all nodes
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x;
            const dy = next[j].y - next[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = repel / (dist * dist);
            next[i].vx -= (dx / dist) * force;
            next[i].vy -= (dy / dist) * force;
            next[j].vx += (dx / dist) * force;
            next[j].vy += (dy / dist) * force;
          }
        }

        // Attraction along edges
        for (const edge of edges) {
          const a = next.find(n => n.id === edge.from);
          const b = next.find(n => n.id === edge.to);
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const target = 180 / edge.strength;
          const diff = dist - target;
          a.vx += dx / dist * diff * k;
          a.vy += dy / dist * diff * k;
          b.vx -= dx / dist * diff * k;
          b.vy -= dy / dist * diff * k;
        }

        // Gravity towards center
        for (const n of next) {
          n.vx += (centerX - n.x) * 0.002;
          n.vy += (centerY - n.y) * 0.002;
          n.vx *= damping;
          n.vy *= damping;
          n.x += n.vx;
          n.y += n.vy;
          // Boundary
          n.x = Math.max(n.r + 20, Math.min(dims.w - n.r - 20, n.x));
          n.y = Math.max(n.r + 20, Math.min(dims.h - n.r - 60, n.y));
        }
        return next;
      });
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    // Stop after 3 seconds (layout settles)
    const stop = setTimeout(() => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }, 3000);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearTimeout(stop);
    };
  }, [edges, dims]);

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="flex-1 relative overflow-hidden" style={{ background: '#050508' }}>
      {/* Star background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3, pointerEvents: 'none' }}>
        {Array.from({ length: 80 }, (_, i) => (
          <circle key={i} cx={`${(i * 137.5) % 100}%`} cy={`${(i * 61.8) % 100}%`}
            r={(i % 3 === 0) ? 1.2 : 0.6} fill="white" opacity={0.3 + 0.4 * (i % 3) / 3} />
        ))}
      </svg>

      {/* Main SVG Graph */}
      <svg ref={svgRef} width="100%" height="100%">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 2L8 5L2 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const a = nodeMap[e.from], b = nodeMap[e.to];
          if (!a || !b) return null;
          const isHighlighted = hovered === e.from || hovered === e.to;
          const col = isHighlighted
            ? (nodeMap[e.from]?.color || '#fff')
            : 'rgba(255,255,255,0.12)';
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          return (
            <g key={i}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={col}
                strokeWidth={isHighlighted ? e.strength * 2.5 : e.strength * 0.8}
                strokeDasharray={isHighlighted ? "6 3" : "3 6"}
                opacity={isHighlighted ? 0.9 : 0.4}
                className={isHighlighted ? "graph-edge" : ""}
                style={{ transition: 'stroke .25s, opacity .25s' }}
              />
              {/* Edge label on hover */}
              {isHighlighted && (
                <text x={midX} y={midY - 6} textAnchor="middle"
                  fontSize="10" fill={nodeMap[e.from]?.color || '#fff'}
                  fontFamily="'DM Sans', system-ui" opacity="0.85">
                  {e.reason}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(n => {
          const isHov = hovered === n.id;
          const isActive = n.id === activeFileId;
          return (
            <g key={n.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectFile(n.id)}
            >
              {/* Pulse ring for active */}
              {(isActive || isHov) && (
                <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={0.12}
                  className="pulse-ring" />
              )}
              {/* Outer glow */}
              <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill={n.color}
                opacity={isHov ? 0.09 : 0.03}
                style={{ transition: 'opacity .3s' }} />
              {/* Node body */}
              <circle cx={n.x} cy={n.y} r={n.r}
                fill={isActive ? n.color : `${n.color}28`}
                stroke={n.color}
                strokeWidth={isActive ? 2.5 : isHov ? 1.8 : 1}
                opacity={isHov || isActive ? 1 : 0.75}
                style={{ transition: 'all .2s' }} />
              {/* Icon inside node */}
              <text x={n.x} y={n.y + 5} textAnchor="middle"
                fontSize="13" fill={isActive ? '#07070a' : n.color}
                fontFamily="'DM Sans', system-ui">
                {n.type === 'code' ? '⟨⟩' : n.type === 'finance' ? '⊞' : n.type === 'whiteboard' ? '⬡' : '☰'}
              </text>
              {/* Label below */}
              <text x={n.x} y={n.y + n.r + 16} textAnchor="middle"
                fontSize="11" fontWeight="500"
                fill={isHov || isActive ? '#dddaeb' : '#6a6780'}
                fontFamily="'DM Sans', system-ui"
                style={{ transition: 'fill .2s' }}>
                {n.label.length > 18 ? n.label.slice(0, 15) + '…' : n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        background: 'rgba(17,17,24,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
        padding: '10px 14px', fontSize: 11, color: '#6a6780'
      }}>
        <div style={{ fontWeight: 600, color: '#dddaeb', marginBottom: 6 }}>Brain Map</div>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
            <span style={{ textTransform: 'capitalize' }}>{type}</span>
          </div>
        ))}
        <div style={{ marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 6 }}>
          Dashed lines = semantic link
        </div>
        <div>Click a node to open file</div>
      </div>
    </div>
  );
}
