import { useState, useEffect, useRef } from "react";

const P = {
  bg: '#07070a', sidebar: '#0b0b0f', surface: '#111118', elevated: '#17171f',
  border: 'rgba(255,255,255,0.06)', borderHover: 'rgba(255,255,255,0.12)',
  text: '#dddaeb', muted: '#6a6780', faint: '#2e2c42',
  amber: '#f09532', amberGlow: 'rgba(240,149,50,0.12)', amberBorder: 'rgba(240,149,50,0.28)',
  blue: '#6199f5', purple: '#9b7ff0', green: '#4dba84', red: '#e07272',
};

// helper: seed pages array from initial content
function initPages(content) {
  return [{ id: 1, content }];
}

const NOTES = [
  { id:1, title:'Startup MVP Plan', tags:['startup','planning'], icon:'◈', mode:'text',
    content:`# The Second Brain — MVP

## Core Insight
Most note apps treat notes as *storage*. We're building notes as *thinking*. One is a filing cabinet, the other is a sparring partner.

## What We're Actually Building

**Multi-mode Canvas** — the same file switches between writing, code, and whiteboard. Auto-detected from filename extension.

**Contextual AI** — a thinking partner that knows what note you're currently inside. Unlike ChatGPT, it has *context*.

**Detective Graph** — every note is a dot. AI auto-connects them by semantic similarity. You just watch your brain map itself.

**Semantic Memory** — patterns across time. "Every time you mention stress, it correlates with your finance notes."

## The Magic Moment
When someone opens the graph for the first time and sees their own mind mapped out. That's the screenshot they share. That's the viral loop.

## MVP Sequence
Week 1–2: Note taking + code mode auto-detection
Week 3: AI thinking partner sidebar
Week 4: Basic graph (manual links first)
Week 5–6: Semantic auto-connection via pgvector
Week 7: Whiteboard mode
Week 8: Polish + launch to college`,
    pages: initPages(`# The Second Brain — MVP

## Core Insight
Most note apps treat notes as *storage*. We're building notes as *thinking*. One is a filing cabinet, the other is a sparring partner.

## What We're Actually Building

**Multi-mode Canvas** — the same file switches between writing, code, and whiteboard. Auto-detected from filename extension.

**Contextual AI** — a thinking partner that knows what note you're currently inside. Unlike ChatGPT, it has *context*.

**Detective Graph** — every note is a dot. AI auto-connects them by semantic similarity. You just watch your brain map itself.

**Semantic Memory** — patterns across time. "Every time you mention stress, it correlates with your finance notes."

## The Magic Moment
When someone opens the graph for the first time and sees their own mind mapped out. That's the screenshot they share. That's the viral loop.

## MVP Sequence
Week 1–2: Note taking + code mode auto-detection
Week 3: AI thinking partner sidebar
Week 4: Basic graph (manual links first)
Week 5–6: Semantic auto-connection via pgvector
Week 7: Whiteboard mode
Week 8: Polish + launch to college`) },

  { id:2, title:'db/schema.sql', tags:['code','backend'], icon:'◈', mode:'code',
    content:`-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Notes table with semantic embedding column
CREATE TABLE notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT,
  embedding   vector(1536),
  mode        TEXT DEFAULT 'text',
  tags        TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- IVFFlat index for fast cosine similarity search
CREATE INDEX ON notes
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Auto-connection function
CREATE OR REPLACE FUNCTION find_related_notes(
  source_id       UUID,
  match_threshold FLOAT DEFAULT 0.75,
  match_count     INT DEFAULT 8
)
RETURNS TABLE(id UUID, title TEXT, similarity FLOAT)
LANGUAGE SQL STABLE AS $$
  SELECT n.id, n.title,
    1 - (n.embedding <=> s.embedding) AS similarity
  FROM notes n, notes s
  WHERE s.id = source_id
    AND n.id != source_id
    AND 1 - (n.embedding <=> s.embedding) > match_threshold
  ORDER BY n.embedding <=> s.embedding
  LIMIT match_count;
$$;` },

  { id:3, title:'Finance — May 26', tags:['personal','finance'], icon:'◈', mode:'text',
    content:`# May 2026 — Financial Overview

## Income
- Internship stipend: ₹45,000
- Freelance (2 projects): ₹18,000
- **Total: ₹63,000**

## Expenses
Rent ₹12,000 · Food ₹10,200 · Transport ₹1,800 · Entertainment ₹4,500
**Total spent: ₹28,500**

## Savings Goal
Target: ₹50,000 runway before leaving college.
Current: ₹31,000 → **62% there**

## Notes
If the startup needs hardware for demos, I need a buffer. Stop the entertainment creep — nearly 50% over budget this month. Set a hard ₹3k limit.`,
    pages: initPages(`# May 2026 — Financial Overview

## Income
- Internship stipend: ₹45,000
- Freelance (2 projects): ₹18,000
- **Total: ₹63,000**

## Expenses
Rent ₹12,000 · Food ₹10,200 · Transport ₹1,800 · Entertainment ₹4,500
**Total spent: ₹28,500**

## Savings Goal
Target: ₹50,000 runway before leaving college.
Current: ₹31,000 → **62% there**

## Notes
If the startup needs hardware for demos, I need a buffer. Stop the entertainment creep — nearly 50% over budget this month. Set a hard ₹3k limit.`) },

  { id:4, title:'Research: Embeddings', tags:['research','AI'], icon:'◈', mode:'text',
    content:`# Vector Embeddings — Deep Dive

## What Are They?
A vector embedding maps text into high-dimensional space where *semantic similarity = geometric proximity*.

The classic example: king − man + woman ≈ queen

## Why This Matters for Cortex
Traditional search: find notes with matching *words*
Semantic search: find notes with matching *meaning*

If I write about "anxiety before a demo", the system should connect it to "public speaking fears" even with zero word overlap. That's the magic.

## Implementation Plan
1. On note save → call embedding API → store vector
2. On note open → query similar → populate graph
3. Threshold: 0.75 cosine similarity

## Key Papers
- "Attention Is All You Need" — Vaswani et al. 2017
- "Text Embeddings Reveal Almost as Much as Text" — 2023`,
    pages: initPages(`# Vector Embeddings — Deep Dive

## What Are They?
A vector embedding maps text into high-dimensional space where *semantic similarity = geometric proximity*.

The classic example: king − man + woman ≈ queen

## Why This Matters for Cortex
Traditional search: find notes with matching *words*
Semantic search: find notes with matching *meaning*

## Implementation Plan
1. On note save → call embedding API → store vector
2. On note open → query similar → populate graph
3. Threshold: 0.75 cosine similarity`) },

  { id:5, title:'Journal — May 10', tags:['personal','journal'], icon:'◈', mode:'text',
    content:`May 10, 2026.

Stayed up until 3am building the prototype. There's something about working on a problem you actually believe in — time stops feeling like time.

Claude helped me realize the graph view is the whole emotional hook. Nobody cares about "semantic search." But everyone is curious what their own mind looks like mapped out. That's the screenshot.

Worried about design. I'm not naturally visual. Either learn Figma properly, or find a cofounder who cares about aesthetics.

Also: I haven't slept properly in a week. The startup thing is bleeding into everything. Need to be intentional about rest.

Goals for tomorrow:
- Finish the prototype
- Talk to 3 potential users
- Sleep before 1am (be real with myself)`,
    pages: initPages(`May 10, 2026.

Stayed up until 3am building the prototype. There's something about working on a problem you actually believe in — time stops feeling like time.

Claude helped me realize the graph view is the whole emotional hook. Nobody cares about "semantic search." But everyone is curious what their own mind looks like mapped out. That's the screenshot.

Worried about design. I'm not naturally visual. Either learn Figma properly, or find a cofounder who cares about aesthetics.

Also: I haven't slept properly in a week. The startup thing is bleeding into everything. Need to be intentional about rest.

Goals for tomorrow:
- Finish the prototype
- Talk to 3 potential users
- Sleep before 1am (be real with myself)`) },
];

const GNODES = [
  { id:1, label:'Startup MVP', x:335, y:215, r:26, color:P.amber },
  { id:2, label:'schema.sql', x:530, y:130, r:20, color:P.blue },
  { id:3, label:'Finance', x:155, y:165, r:19, color:P.green },
  { id:4, label:'Embeddings', x:505, y:340, r:23, color:P.purple },
  { id:5, label:'Journal', x:178, y:340, r:18, color:P.red },
  { id:6, label:'UI Concepts', x:355, y:395, r:15, color:P.blue },
  { id:7, label:'React Flow', x:605, y:230, r:14, color:P.blue },
];
const GEDGES = [
  { from:1, to:4, s:0.88 }, { from:1, to:2, s:0.7 }, { from:1, to:5, s:0.62 },
  { from:1, to:3, s:0.42 }, { from:2, to:4, s:0.91 }, { from:2, to:7, s:0.68 },
  { from:4, to:7, s:0.52 }, { from:3, to:5, s:0.55 }, { from:1, to:6, s:0.65 },
];

const CSS = `
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5.1.0/400.css');
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5.1.0/500.css');
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/400.css');
  * { box-sizing: border-box; margin:0; padding:0; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:${P.faint}; border-radius:2px; }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.5} 60%{transform:scale(2.2);opacity:0} 100%{transform:scale(2.2);opacity:0} }
  @keyframes dash { to { stroke-dashoffset: -30; } }
  @keyframes fade-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow-pulse { 0%,100%{opacity:.3} 50%{opacity:.7} }
  .pulse-ring { animation: pulse-ring 3s ease-out infinite; transform-origin: center; }
  .graph-edge { animation: dash 3s linear infinite; }
  .msg-in { animation: fade-in .25s ease; }
  .glow { animation: glow-pulse 3s ease-in-out infinite; }
  button { cursor:pointer; border:none; background:none; font-family:inherit; }
  textarea { font-family:inherit; resize:none; border:none; outline:none; background:none; }
  input { font-family:inherit; border:none; outline:none; background:none; }
`;

function Tag({ label }) {
  const colors = { startup:P.amber, planning:P.amber, code:P.blue, backend:P.blue,
    personal:P.green, finance:P.green, journal:P.red, research:P.purple, AI:P.purple };
  const c = colors[label] || P.muted;
  return (
    <span style={{ fontSize:10, padding:'2px 7px', borderRadius:20,
      background:`${c}18`, color:c, border:`1px solid ${c}28`, letterSpacing:.3 }}>
      {label}
    </span>
  );
}

function Sidebar({ notes, current, onSelect, view, setView }) {
  return (
    <div style={{ width:220, background:P.sidebar, borderRight:`1px solid ${P.border}`,
      display:'flex', flexDirection:'column', flexShrink:0 }}>
      {/* Logo */}
      <div style={{ padding:'20px 18px 14px', borderBottom:`1px solid ${P.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:8, background:P.amber,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontSize:15, fontWeight:500, color:P.text, letterSpacing:-.3 }}>Cortex</span>
        </div>
      </div>
      {/* View toggle */}
      <div style={{ padding:'12px 12px 8px', borderBottom:`1px solid ${P.border}` }}>
        <div style={{ display:'flex', gap:4, background:P.surface, borderRadius:8,
          padding:3, border:`1px solid ${P.border}` }}>
          {['canvas','graph'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex:1, padding:'5px 0', borderRadius:6, fontSize:11, fontWeight:500,
              letterSpacing:.3, textTransform:'uppercase',
              background: view === v ? P.elevated : 'transparent',
              color: view === v ? P.amber : P.muted,
              border: view === v ? `1px solid ${P.amberBorder}` : '1px solid transparent',
              transition:'all .2s'
            }}>{v === 'canvas' ? '⊞ Canvas' : '◎ Graph'}</button>
          ))}
        </div>
      </div>
      {/* Notes list */}
      <div style={{ flex:1, overflowY:'auto', padding:'8px 8px' }}>
        <div style={{ fontSize:10, color:P.muted, letterSpacing:1, textTransform:'uppercase',
          padding:'8px 10px 6px', fontWeight:500 }}>Notes</div>
        {notes.map(n => (
          <div key={n.id} onClick={() => onSelect(n)} style={{
            padding:'9px 10px', borderRadius:8, marginBottom:2, cursor:'pointer',
            background: current.id === n.id ? P.amberGlow : 'transparent',
            border: current.id === n.id ? `1px solid ${P.amberBorder}` : '1px solid transparent',
            transition:'all .15s'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
              <span style={{ fontSize:11, color: current.id===n.id ? P.amber : P.muted }}>
                {n.mode === 'code' ? '⟨⟩' : n.mode === 'whiteboard' ? '⬡' : '☰'}
              </span>
              <span style={{ fontSize:13, fontWeight:500,
                color: current.id===n.id ? P.text : '#b8b5cc',
                whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {n.title}
              </span>
            </div>
            <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
              {n.tags.slice(0,2).map(t => <Tag key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>
      {/* New note btn */}
      <div style={{ padding:'12px', borderTop:`1px solid ${P.border}` }}>
        <button style={{ width:'100%', padding:'8px', borderRadius:8, fontSize:12,
          color:P.muted, border:`1px dashed ${P.border}`, fontWeight:500,
          display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          <span style={{ fontSize:16, lineHeight:1 }}>+</span> New Note
        </button>
      </div>
    </div>
  );
}

function TopBar({ note, mode, setMode, aiOpen, setAiOpen, view, setView }) {
  const modes = note.mode === 'code'
    ? [['text','☰ Text'],['code','⟨⟩ Code']]
    : [['text','☰ Text'],['whiteboard','⬡ Board']];
  return (
    <div style={{ height:52, borderBottom:`1px solid ${P.border}`, display:'flex',
      alignItems:'center', padding:'0 20px', gap:16, flexShrink:0, background:P.sidebar }}>
      {/* Note title */}
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ color:P.muted, fontSize:11 }}>{note.mode === 'code' ? '⟨⟩' : '☰'}</span>
        <span style={{ fontSize:14, fontWeight:500, color:P.text, letterSpacing:-.2 }}>{note.title}</span>
        <div style={{ display:'flex', gap:4 }}>
          {note.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
      {/* Mode pills */}
      <div style={{ display:'flex', gap:3, background:P.surface,
        borderRadius:8, padding:'3px', border:`1px solid ${P.border}` }}>
        {modes.map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setView('canvas'); }} style={{
            padding:'4px 12px', borderRadius:6, fontSize:11, fontWeight:500,
            background: (view==='canvas' && mode===m) ? P.elevated : 'transparent',
            color: (view==='canvas' && mode===m) ? P.text : P.muted,
            border: (view==='canvas' && mode===m) ? `1px solid ${P.border}` : '1px solid transparent',
            transition:'all .2s', letterSpacing:.2
          }}>{label}</button>
        ))}
      </div>
      {/* AI toggle */}
      <button onClick={() => setAiOpen(v => !v)} style={{
        padding:'6px 12px', borderRadius:8, fontSize:11, fontWeight:500,
        background: aiOpen ? P.amberGlow : P.surface,
        color: aiOpen ? P.amber : P.muted,
        border: `1px solid ${aiOpen ? P.amberBorder : P.border}`,
        letterSpacing:.2, transition:'all .2s'
      }}>✦ AI Partner</button>
    </div>
  );
}

// ── Page Strip ────────────────────────────────────────────────────────────────
function PageStrip({ pages, currentIdx, onSelect, onAdd }) {
  return (
    <div style={{
      height: 40, flexShrink: 0, borderTop: `1px solid ${P.border}`,
      background: P.sidebar, display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 4, overflowX: 'auto',
    }}>
      {pages.map((pg, i) => (
        <button key={pg.id} onClick={() => onSelect(i)} style={{
          padding: '3px 14px', borderRadius: 6, fontSize: 11, fontWeight: 500,
          cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
          background: currentIdx === i ? P.amberGlow : 'transparent',
          color: currentIdx === i ? P.amber : P.muted,
          border: currentIdx === i ? `1px solid ${P.amberBorder}` : `1px solid transparent`,
        }}>
          {i + 1}
        </button>
      ))}
      <button onClick={onAdd} title="Add page" style={{
        marginLeft: 4, width: 24, height: 24, borderRadius: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, lineHeight: 1, cursor: 'pointer', flexShrink: 0,
        background: 'transparent', color: P.muted,
        border: `1px dashed ${P.border}`, transition: 'all .15s',
      }}>+</button>
    </div>
  );
}

function TextCanvas({ note, pages, currentPageIdx, onAddPage, onSelectPage }) {
  const content = pages ? (pages[currentPageIdx]?.content ?? '') : note.content;
  const lines = content.split('\n');
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ flex:1, overflowY:'auto', padding:'48px 60px' }}>
      <div style={{ maxWidth:660, margin:'0 auto' }}>
        {lines.map((line, i) => {
          if (line.startsWith('# ')) return (
            <h1 key={i} style={{ fontSize:28, fontWeight:500, color:P.text,
              marginBottom:20, marginTop: i>0?32:0, letterSpacing:-.5, lineHeight:1.25 }}>
              {line.slice(2)}
            </h1>
          );
          if (line.startsWith('## ')) return (
            <h2 key={i} style={{ fontSize:17, fontWeight:500, color:P.text,
              marginBottom:12, marginTop:28, letterSpacing:-.2 }}>
              {line.slice(3)}
            </h2>
          );
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const content = line.slice(2);
            return (
              <div key={i} style={{ display:'flex', gap:10, marginBottom:6 }}>
                <span style={{ color:P.amber, marginTop:2, fontSize:12 }}>▸</span>
                <span style={{ fontSize:14, color:'#c5c2da', lineHeight:1.7 }}
                  dangerouslySetInnerHTML={{ __html: renderInline(content) }} />
              </div>
            );
          }
          if (/^\d+\./.test(line)) return (
            <div key={i} style={{ display:'flex', gap:10, marginBottom:6 }}>
              <span style={{ color:P.amber, fontSize:12, minWidth:16, marginTop:2, fontWeight:500 }}>{line.match(/^\d+/)[0]}.</span>
              <span style={{ fontSize:14, color:'#c5c2da', lineHeight:1.7 }}
                dangerouslySetInnerHTML={{ __html: renderInline(line.replace(/^\d+\.\s*/,'')) }} />
            </div>
          );
          if (line === '') return <div key={i} style={{ height:8 }} />;
          return (
            <p key={i} style={{ fontSize:14, color:'#c5c2da', lineHeight:1.75, marginBottom:6 }}
              dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
          );
        })}
      </div>
    </div>
    {pages && <PageStrip pages={pages} currentIdx={currentPageIdx} onSelect={onSelectPage} onAdd={onAddPage} />}
    </div>
  );
}

function renderInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${P.text};font-weight:500">$1</strong>`)
    .replace(/\*(.+?)\*/g, `<em style="color:#9b96c0">$1</em>`)
    .replace(/`(.+?)`/g, `<code style="font-family:'JetBrains Mono',monospace;font-size:12px;background:${P.surface};color:${P.blue};padding:1px 5px;border-radius:4px;border:1px solid ${P.border}">$1</code>`);
}

function CodeCanvas({ note }) {
  const keywords = /\b(CREATE|TABLE|INDEX|SELECT|FROM|WHERE|ORDER BY|LIMIT|RETURNS|LANGUAGE|FUNCTION|EXTENSION|DEFAULT|REFERENCES|ON DELETE|PRIMARY KEY|UNIQUE|NOT NULL|IF NOT EXISTS|AS|WITH|AND|OR|REPLACE|INSERT|UPDATE|DELETE)\b/g;
  const strings = /(--[^\n]*|'[^']*')/g;
  const types = /\b(UUID|TEXT|INT|FLOAT|BOOLEAN|TIMESTAMPTZ|vector|TABLE|FUNCTION)\b/g;

  function highlight(code) {
    return code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(--[^\n]*)/g, `<span style="color:#5e6080">$1</span>`)
      .replace(/\b(CREATE|TABLE|INDEX|SELECT|FROM|WHERE|ORDER BY|LIMIT|RETURNS|LANGUAGE|FUNCTION|EXTENSION|DEFAULT|REFERENCES|ON DELETE|PRIMARY KEY|IF NOT EXISTS|AS|WITH|AND|OR|REPLACE)\b/g,
        `<span style="color:${P.purple}">$&</span>`)
      .replace(/\b(UUID|TEXT|INT|FLOAT|BOOLEAN|TIMESTAMPTZ|vector)\b/g,
        `<span style="color:${P.amber}">$&</span>`)
      .replace(/'([^']*)'/g, `<span style="color:${P.green}">'$1'</span>`)
      .replace(/\b(\d+(\.\d+)?)\b/g, `<span style="color:${P.red}">$&</span>`);
  }

  const lines = note.content.split('\n');
  return (
    <div style={{ flex:1, overflowY:'auto', background:'#080810', padding:'32px 0' }}>
      <div style={{ fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:13,
        lineHeight:1.8, maxWidth:780, margin:'0 auto', padding:'0 40px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display:'flex', gap:0 }}>
            <span style={{ color:P.faint, userSelect:'none', minWidth:36,
              textAlign:'right', paddingRight:20, fontSize:11 }}>{i+1}</span>
            <span style={{ color:'#c0bdd8' }}
              dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WhiteboardCanvas({ pages, currentPageIdx, onAddPage, onSelectPage }) {
  const stickies = [
    { x:80, y:60, w:170, h:90, color:'#2a2218', border:P.amber, text:'Contextual AI\n↳ knows current note', label:'AI Partner' },
    { x:310, y:30, w:180, h:85, color:'#121a2a', border:P.blue, text:'Multi-mode Canvas\n↳ text / code / board', label:'Core' },
    { x:560, y:80, w:160, h:90, color:'#1a1228', border:P.purple, text:'pgvector\n↳ 1536-dim embeddings', label:'Backend' },
    { x:100, y:240, w:170, h:85, color:'#121e18', border:P.green, text:'Detective Graph\n↳ auto-connections', label:'Graph' },
    { x:360, y:230, w:175, h:90, color:'#1e1214', border:P.red, text:'Personal Memory\n↳ patterns across time', label:'Memory' },
  ];
  const arrows = [
    { x1:250,y1:110, x2:308,y2:80 }, { x1:490,y1:78, x2:558,y2:110 },
    { x1:165,y1:148, x2:160,y2:238 }, { x1:400,y1:115, x2:448,y2:228 },
    { x1:270,y1:280, x2:358,y2:275 },
  ];
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ flex:1, overflow:'hidden', position:'relative', background:'#080810' }}>
      {/* Dot grid */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.3 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={P.faint} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <defs>
          <marker id="wh-arrow" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke={P.muted} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>
        {arrows.map((a,i) => (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke={P.muted} strokeWidth="1" strokeDasharray="4 3"
            markerEnd="url(#wh-arrow)" opacity=".5" />
        ))}
        {stickies.map((s,i) => (
          <g key={i}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="8"
              fill={s.color} stroke={s.border} strokeWidth=".8" opacity=".9" />
            <text x={s.x+10} y={s.y+14} fontSize="9" fill={s.border} fontWeight="500"
              fontFamily="'DM Sans', system-ui" letterSpacing="1" opacity=".7">
              {s.label.toUpperCase()}
            </text>
            {s.text.split('\n').map((line,li) => (
              <text key={li} x={s.x+10} y={s.y+30+li*18} fontSize="12"
                fill={P.text} fontFamily="'DM Sans', system-ui" opacity=".85">
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
      {/* Toolbar */}
      <div style={{ position:'absolute', top:16, left:'50%', transform:'translateX(-50%)',
        background:P.elevated, border:`1px solid ${P.border}`, borderRadius:10,
        padding:'6px 12px', display:'flex', gap:8, alignItems:'center' }}>
        {['✎ Pen','□ Sticky','↔ Arrow','T Text'].map(t => (
          <button key={t} style={{ padding:'4px 10px', borderRadius:6, fontSize:11,
            color:t==='↔ Arrow' ? P.amber : P.muted, fontWeight:500,
            background:t==='↔ Arrow' ? P.amberGlow : 'transparent',
            border:`1px solid ${t==='↔ Arrow' ? P.amberBorder : 'transparent'}` }}>{t}</button>
        ))}
      </div>
    </div>
    {pages && <PageStrip pages={pages} currentIdx={currentPageIdx} onSelect={onSelectPage} onAdd={onAddPage} />}
    </div>
  );
}

function GraphView({ onSelect, currentId }) {
  const [hovered, setHovered] = useState(null);
  const W = 760, H = 500;
  const nodeMap = Object.fromEntries(GNODES.map(n => [n.id, n]));
  const noteMap = { 1:NOTES[0], 2:NOTES[1], 3:NOTES[2], 4:NOTES[3], 5:NOTES[4] };

  return (
    <div style={{ flex:1, background:'#050508', overflow:'hidden', position:'relative' }}>
      {/* Stars bg */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4 }}>
        {Array.from({length:60}, (_,i) => (
          <circle key={i} cx={`${(i*137.5)%100}%`} cy={`${(i*61.8)%100}%`}
            r={i%3===0?1.2:.6} fill="white" opacity={.3+.4*(i%3)/3} />
        ))}
      </svg>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:'block' }}>
        <defs>
          <radialGradient id="node-glow">
            <stop offset="0%" stopColor={P.amber} stopOpacity=".3"/>
            <stop offset="100%" stopColor={P.amber} stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Edges */}
        {GEDGES.map((e,i) => {
          const a = nodeMap[e.from], b = nodeMap[e.to];
          const isActive = hovered===e.from || hovered===e.to;
          const col = isActive ? a.color : P.muted;
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={col} strokeWidth={isActive ? e.s*2 : e.s*0.8}
              strokeDasharray={isActive ? "6 4" : "3 5"}
              opacity={isActive ? e.s : e.s*0.4}
              className={isActive ? "graph-edge" : ""}
              style={{ transition:'all .3s' }} />
          );
        })}
        {/* Nodes */}
        {GNODES.map(n => {
          const isHov = hovered === n.id;
          const isCur = n.id === currentId;
          const note = noteMap[n.id];
          return (
            <g key={n.id} style={{ cursor: note ? 'pointer' : 'default' }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => note && onSelect(note)}>
              {/* Pulse ring */}
              {(isHov || isCur) && (
                <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={.15}
                  className="pulse-ring" />
              )}
              {/* Glow */}
              <circle cx={n.x} cy={n.y} r={n.r*2.5} fill={n.color} opacity={isHov ? .08 : .03}
                style={{ transition:'opacity .3s' }} />
              {/* Node */}
              <circle cx={n.x} cy={n.y} r={n.r}
                fill={isCur ? n.color : `${n.color}22`}
                stroke={n.color}
                strokeWidth={isCur ? 2 : isHov ? 1.5 : 1}
                opacity={isHov || isCur ? 1 : .7}
                style={{ transition:'all .2s' }} />
              {/* Center dot */}
              <circle cx={n.x} cy={n.y} r={3} fill={isCur ? P.bg : n.color}
                opacity={isCur ? 1 : .6} />
              {/* Label */}
              <text x={n.x} y={n.y + n.r + 14} textAnchor="middle"
                fontSize="11" fontWeight="500" fill={isHov || isCur ? P.text : P.muted}
                fontFamily="'DM Sans', system-ui" style={{ transition:'fill .2s' }}>
                {n.label}
              </text>
              {/* Strength indicators on hover */}
              {isHov && GEDGES.filter(e => e.from===n.id||e.to===n.id).map((e,ei) => {
                const other = nodeMap[e.from===n.id ? e.to : e.from];
                const mx = (n.x+other.x)/2 - 8, my = (n.y+other.y)/2 - 6;
                return (
                  <text key={ei} x={mx} y={my} fontSize="9" fill={n.color}
                    fontFamily="'DM Sans', system-ui" opacity=".8" fontWeight="500">
                    {Math.round(e.s*100)}%
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{ position:'absolute', bottom:20, left:20, fontSize:11, color:P.muted,
        background:P.elevated, border:`1px solid ${P.border}`, borderRadius:8, padding:'8px 12px' }}>
        <div style={{ marginBottom:4, fontWeight:500, color:P.text }}>Brain Map</div>
        <div>Line opacity = semantic similarity</div>
        <div>Click a node to open note</div>
      </div>
    </div>
  );
}

function AIPanel({ note, onClose }) {
  const [messages, setMessages] = useState([
    { role:'assistant', content:`I can see "${note.title}". What would you like to think through? I've read the whole note — ask me anything, or I can push back on your assumptions.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const prevNoteId = useRef(note.id);

  useEffect(() => {
    if (note.id !== prevNoteId.current) {
      prevNoteId.current = note.id;
      setMessages([{ role:'assistant', content:`Switched to "${note.title}". I've read the content. What are you working through?` }]);
    }
  }, [note.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:'user', content:input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:`You are a sharp, concise thinking partner inside Cortex, a second-brain app. The user is currently working on a note titled "${note.title}". Here is the note content:\n\n${note.content}\n\nBe a genuine intellectual sparring partner. Reference specific parts of the note. Ask probing questions. Push back on weak ideas. Make unexpected connections. Keep responses under 120 words. Be direct and incisive, not generic.`,
          messages: next.map(m => ({ role:m.role, content:m.content })),
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Something went wrong.';
      setMessages(p => [...p, { role:'assistant', content:reply }]);
    } catch {
      setMessages(p => [...p, { role:'assistant', content:'Error connecting. Check console.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ width:300, background:P.sidebar, borderLeft:`1px solid ${P.border}`,
      display:'flex', flexDirection:'column', flexShrink:0 }}>
      {/* Header */}
      <div style={{ padding:'14px 16px', borderBottom:`1px solid ${P.border}`,
        display:'flex', alignItems:'center', gap:8 }}>
        <div className="glow" style={{ width:8, height:8, borderRadius:'50%', background:P.amber, flexShrink:0 }} />
        <span style={{ flex:1, fontSize:13, fontWeight:500, color:P.text }}>AI Thinking Partner</span>
        <button onClick={onClose} style={{ color:P.muted, fontSize:16, lineHeight:1 }}>×</button>
      </div>
      {/* Context pill */}
      <div style={{ margin:'10px 14px 0', padding:'6px 10px',
        background:P.amberGlow, border:`1px solid ${P.amberBorder}`, borderRadius:8 }}>
        <div style={{ fontSize:10, color:P.amber, letterSpacing:.5, fontWeight:500, marginBottom:2 }}>CURRENT CONTEXT</div>
        <div style={{ fontSize:11, color:'#c5b899', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{note.title}</div>
      </div>
      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px', display:'flex', flexDirection:'column', gap:10 }}>
        {messages.map((m, i) => (
          <div key={i} className="msg-in" style={{ maxWidth:'90%',
            alignSelf: m.role==='user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              padding:'9px 12px', borderRadius: m.role==='user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: m.role==='user' ? `${P.amber}20` : P.elevated,
              border: `1px solid ${m.role==='user' ? P.amberBorder : P.border}`,
              fontSize:12, color: m.role==='user' ? '#d4b884' : '#c0bdd8',
              lineHeight:1.65
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf:'flex-start', padding:'10px 14px',
            background:P.elevated, border:`1px solid ${P.border}`,
            borderRadius:'12px 12px 12px 2px', display:'flex', gap:5, alignItems:'center' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:P.amber,
                animation:`glow-pulse 1s ease-in-out ${i*.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div style={{ padding:'12px 14px', borderTop:`1px solid ${P.border}` }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:8,
          background:P.elevated, border:`1px solid ${P.border}`, borderRadius:10, padding:'8px 10px',
          transition:'border-color .2s' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if(e.key==='Enter' && !e.shiftKey){e.preventDefault();send();} }}
            placeholder="Ask or think out loud…"
            rows={2}
            style={{ flex:1, color:P.text, fontSize:12, lineHeight:1.5,
              placeholder:P.muted, resize:'none', background:'none', border:'none', outline:'none' }}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            width:28, height:28, borderRadius:7, display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:12, flexShrink:0,
            background: (loading||!input.trim()) ? P.surface : P.amber,
            color: (loading||!input.trim()) ? P.muted : P.bg,
            border:`1px solid ${(loading||!input.trim()) ? P.border : P.amber}`,
            transition:'all .2s', cursor: input.trim() ? 'pointer' : 'default'
          }}>↑</button>
        </div>
        <div style={{ fontSize:10, color:P.muted, marginTop:6, textAlign:'center' }}>
          Shift+Enter for new line · Enter to send
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentNote, setCurrentNote] = useState(NOTES[0]);
  const [view, setView] = useState('canvas');
  const [mode, setMode] = useState('text');
  const [aiOpen, setAiOpen] = useState(true);

  // pages state: { [noteId]: Page[] }
  const [pagesMap, setPagesMap] = useState(() => {
    const map = {};
    NOTES.forEach(n => { if (n.pages) map[n.id] = n.pages; });
    return map;
  });
  // current page index per note
  const [pageIdxMap, setPageIdxMap] = useState({});

  const getPages = (note) => note.mode === 'text' || note.mode === 'whiteboard'
    ? (pagesMap[note.id] || [{ id: 1, content: note.content }])
    : null;

  const getCurrentPageIdx = (note) => pageIdxMap[note.id] ?? 0;

  const handleAddPage = (note) => {
    const existing = pagesMap[note.id] || [{ id: 1, content: note.content }];
    const newPage = { id: Date.now(), content: '' };
    const updated = [...existing, newPage];
    setPagesMap(prev => ({ ...prev, [note.id]: updated }));
    setPageIdxMap(prev => ({ ...prev, [note.id]: updated.length - 1 }));
  };

  const handleSelectPage = (note, idx) => {
    setPageIdxMap(prev => ({ ...prev, [note.id]: idx }));
  };

  const selectNote = (note) => {
    setCurrentNote(note);
    setMode(note.mode);
    setView('canvas');
  };

  const canvasContent = () => {
    const pages = getPages(currentNote);
    const currentPageIdx = getCurrentPageIdx(currentNote);
    if (mode === 'code') return <CodeCanvas note={currentNote} />;
    if (mode === 'whiteboard') return (
      <WhiteboardCanvas
        pages={pages}
        currentPageIdx={currentPageIdx}
        onAddPage={() => handleAddPage(currentNote)}
        onSelectPage={(i) => handleSelectPage(currentNote, i)}
      />
    );
    return (
      <TextCanvas
        note={currentNote}
        pages={pages}
        currentPageIdx={currentPageIdx}
        onAddPage={() => handleAddPage(currentNote)}
        onSelectPage={(i) => handleSelectPage(currentNote, i)}
      />
    );
  };

  return (
    <div style={{ display:'flex', height:'100vh', background:P.bg, color:P.text,
      fontFamily:"'DM Sans', system-ui, sans-serif", minWidth:880, overflow:'hidden' }}>
      <style>{CSS}</style>
      <Sidebar notes={NOTES} current={currentNote} onSelect={selectNote}
        view={view} setView={setView} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <TopBar note={currentNote} mode={mode} setMode={setMode}
          aiOpen={aiOpen} setAiOpen={setAiOpen} view={view} setView={setView} />
        {view === 'canvas' ? canvasContent() : (
          <GraphView onSelect={selectNote} currentId={currentNote.id} />
        )}
      </div>
      {aiOpen && <AIPanel note={currentNote} onClose={() => setAiOpen(false)} />}
    </div>
  );
}
