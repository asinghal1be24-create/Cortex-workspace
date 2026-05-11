"use client";

import { useState, useMemo } from "react";
import { WorkspaceFile } from "@/types";
import DynamicCanvas, { getFileType } from "@/components/DynamicCanvas";
import ConsciousnessView from "@/components/ConsciousnessView";
import { getRelatedFiles } from "@/lib/similarity";

const INITIAL_FILES: WorkspaceFile[] = [
  { id: '1', name: 'Ideas.txt', content: '<p> </p>' },
  { id: '2', name: 'script.m', content: '% MATLAB script\nx = linspace(0, 2*pi, 100);\ny = sin(x);\nplot(x, y);' },
  { id: '3', name: 'Q2_Finance.csv', content: '[{"id":1,"category":"Rent","amount":12000},{"id":2,"category":"Food","amount":5000},{"id":3,"category":"Software","amount":800}]' },
];

export default function Home() {
  const [files, setFiles] = useState<WorkspaceFile[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [section, setSection] = useState<'files' | 'consciousness'>('files');
  const [focusMode, setFocusMode] = useState(false);

  // Pages state: { [fileId]: Page[] }
  const [pagesMap, setPagesMap] = useState<Record<string, { id: number; content: string; bgType?: 'dotted' | 'lined' | 'plain' | 'white' }[]>>({});
  const [pageIdxMap, setPageIdxMap] = useState<Record<string, number>>({});

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const relatedFiles = useMemo(() =>
    getRelatedFiles(activeFileId, files, getFileType, 4),
    [activeFileId, files]
  );

  // Pages helpers
  const getPages = (fileId: string, fallbackContent: string) =>
    pagesMap[fileId] ?? [{ id: 1, content: fallbackContent }];

  const getCurrentPageIdx = (fileId: string) => pageIdxMap[fileId] ?? 0;

  const handleAddPage = (fileId: string, fallbackContent: string) => {
    const existing = getPages(fileId, fallbackContent);
    const updated = [...existing, { id: Date.now(), content: '', bgType: 'dotted' as const }];
    setPagesMap(prev => ({ ...prev, [fileId]: updated }));
    setPageIdxMap(prev => ({ ...prev, [fileId]: updated.length - 1 }));
  };

  const handleSelectPage = (fileId: string, idx: number) => {
    setPageIdxMap(prev => ({ ...prev, [fileId]: idx }));
  };

  const handleChangeBgType = (fileId: string, idx: number, bgType: 'dotted' | 'lined' | 'plain' | 'white') => {
    const existing = pagesMap[fileId];
    if (!existing) return;
    const updated = existing.map((p, i) => i === idx ? { ...p, bgType } : p);
    setPagesMap(prev => ({ ...prev, [fileId]: updated }));
  };

  const handleCreateFile = () => {
    const newFile: WorkspaceFile = {
      id: Date.now().toString(),
      name: 'Untitled.txt',
      content: ''
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
    setSection('files');
  };

  const handleUpdateFileName = (id: string, newName: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, name: newName } : f));
  };

  const handleUpdateFileContent = (id: string, newContent: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, content: newContent } : f));
  };

  const handleDeleteFile = (id: string) => {
    const remaining = files.filter(f => f.id !== id);
    setFiles(remaining);
    if (activeFileId === id) {
      setActiveFileId(remaining[0]?.id || '');
    }
  };

  const getFileIcon = (name: string) => {
    const type = getFileType(name);
    if (type === 'code') return '⟨⟩';
    if (type === 'finance') return '⊞';
    if (type === 'whiteboard') return '⬡';
    return '☰';
  };

  const handleSelectFromGraph = (id: string) => {
    setActiveFileId(id);
    setSection('files');
  };

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

  const fileType = getFileType(activeFile.name);
  const supportsPages = fileType === 'text' || fileType === 'whiteboard';
  const pages = supportsPages ? getPages(activeFile.id, activeFile.content) : null;
  const currentPageIdx = getCurrentPageIdx(activeFile.id);

  return (
    <div style={{
      display: 'flex', height: '100vh', background: B.bg, color: B.text,
      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      minWidth: 880, overflow: 'hidden'
    }}>
      {/* ── SIDEBAR ── */}
      <div style={{
        width: focusMode ? 0 : 260,
        overflow: 'hidden',
        background: B.sidebar, borderRight: focusMode ? 'none' : `1px solid ${B.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        transition: 'width 0.25s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 18px 14px', borderBottom: `1px solid ${B.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8, background: B.amber,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: B.bg
            }}>✦</div>
            <span style={{ fontSize: 16, fontWeight: 500, color: B.text, letterSpacing: -.3 }}>CORTEX</span>
          </div>
        </div>

        {/* Section toggle */}
        <div style={{ padding: '10px 10px 0', borderBottom: `1px solid ${B.border}`, paddingBottom: 10 }}>
          <div style={{
            display: 'flex', gap: 3, background: B.surface, borderRadius: 8,
            padding: 3, border: `1px solid ${B.border}`
          }}>
            {([['files', '☰ Files'], ['consciousness', '◎ Consciousness']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setSection(key)} style={{
                flex: 1, padding: '5px 0', borderRadius: 6, fontSize: 11, fontWeight: 500,
                letterSpacing: .3, textTransform: 'uppercase',
                background: section === key ? B.elevated : 'transparent',
                color: section === key ? B.amber : B.muted,
                border: section === key ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                transition: 'all .2s', cursor: 'pointer'
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Files list */}
        {section === 'files' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
            <div style={{
              fontSize: 10, color: B.muted, letterSpacing: 1, textTransform: 'uppercase',
              padding: '0 10px 8px', fontWeight: 500
            }}>
              Workspace Files
            </div>
            {files.map(f => (
              <div
                key={f.id}
                onClick={() => setActiveFileId(f.id)}
                style={{
                  padding: '9px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                  background: activeFileId === f.id ? B.amberGlow : 'transparent',
                  border: activeFileId === f.id ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                  transition: 'all .15s',
                  display: 'flex', alignItems: 'center', gap: 8,
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  const btn = (e.currentTarget as HTMLElement).querySelector('.del-btn') as HTMLElement;
                  if (btn) btn.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  const btn = (e.currentTarget as HTMLElement).querySelector('.del-btn') as HTMLElement;
                  if (btn) btn.style.opacity = '0';
                }}
              >
                <span style={{ fontSize: 12, color: activeFileId === f.id ? B.amber : B.muted }}>
                  {getFileIcon(f.name)}
                </span>
                <span style={{
                  fontSize: 13, fontWeight: 500, flex: 1,
                  color: activeFileId === f.id ? B.text : '#b8b5cc',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {f.name}
                </span>
                <button
                  className="del-btn"
                  onClick={e => { e.stopPropagation(); handleDeleteFile(f.id); }}
                  style={{
                    opacity: 0, transition: 'opacity .15s',
                    fontSize: 14, lineHeight: 1, color: B.muted,
                    flexShrink: 0, padding: '0 2px',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {/* Related files */}
            {relatedFiles.length > 0 && (
              <div style={{ marginTop: 12, borderTop: `1px solid ${B.border}`, paddingTop: 12 }}>
                <div style={{
                  fontSize: 10, color: B.muted, letterSpacing: 1, textTransform: 'uppercase',
                  padding: '0 10px 8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4dba84', display: 'inline-block' }} />
                  Related
                </div>
                {relatedFiles.map(r => (
                  <div key={r.id} onClick={() => setActiveFileId(r.id)} style={{
                    padding: '8px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                    border: '1px solid transparent', transition: 'all .15s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = B.surface; (e.currentTarget as HTMLElement).style.border = `1px solid ${B.border}`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.border = '1px solid transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 11, color: B.muted }}>{getFileIcon(r.name)}</span>
                      <span style={{
                        fontSize: 12, fontWeight: 500, color: '#b8b5cc',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {r.name}
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#4dba84', fontWeight: 600, flexShrink: 0 }}>
                        {Math.round(r.score * 100)}%
                      </span>
                    </div>
                    {r.reason && (
                      <div style={{
                        fontSize: 10, color: B.muted, paddingLeft: 18,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {r.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {section === 'consciousness' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
            <div style={{
              fontSize: 10, color: B.muted, letterSpacing: 1, textTransform: 'uppercase',
              padding: '0 0 10px', fontWeight: 500
            }}>
              Consciousness
            </div>
            <div style={{ fontSize: 12, color: B.muted, lineHeight: 1.7 }}>
              Nodes are your files. Edges show semantic connections based on type and naming.
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: B.muted }}>
              <div style={{ marginBottom: 8, fontWeight: 500, color: B.text }}>Legend</div>
              {[['☰', '#6199f5', 'Text / Notes'], ['⟨⟩', '#9b7ff0', 'Code'], ['⊞', '#4dba84', 'Finance'], ['⬡', '#f09532', 'Whiteboard']].map(([icon, color, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: color as string, fontSize: 13 }}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20, padding: '10px 12px', borderRadius: 8,
              background: B.surface, border: `1px solid ${B.border}`,
              fontSize: 11, color: B.muted, lineHeight: 1.6
            }}>
              💡 Click any node in the graph to open that file.
            </div>
          </div>
        )}

        {/* New file button */}
        <div style={{ padding: '12px', borderTop: `1px solid ${B.border}` }}>
          <button onClick={handleCreateFile} style={{
            width: '100%', padding: '8px', borderRadius: 8, fontSize: 12,
            color: B.muted, border: `1px dashed ${B.border}`, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> New File
          </button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {section === 'files' && (
          <div style={{
            height: 56, borderBottom: `1px solid ${B.border}`, display: 'flex',
            alignItems: 'center', padding: '0 20px', gap: 16, flexShrink: 0, background: B.sidebar
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: B.muted, fontSize: 13 }}>{getFileIcon(activeFile.name)}</span>
              <input
                value={activeFile.name}
                onChange={(e) => handleUpdateFileName(activeFile.id, e.target.value)}
                className="bg-transparent border-none outline-none font-medium text-sm min-w-[200px]"
                style={{ color: B.text }}
                placeholder="Filename..."
              />
              <span style={{
                fontSize: 11, color: B.muted, background: B.surface,
                padding: '2px 8px', borderRadius: 12, border: `1px solid ${B.border}`
              }}>
                {getFileType(activeFile.name)}
              </span>
            </div>
            {/* Focus Mode toggle */}
            <button
              onClick={() => setFocusMode(v => !v)}
              title={focusMode ? 'Exit Focus Mode' : 'Focus Mode — hide sidebar'}
              style={{
                padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                background: focusMode ? B.amberGlow : 'transparent',
                color: focusMode ? B.amber : B.muted,
                border: focusMode ? `1px solid ${B.amberBorder}` : `1px solid transparent`,
              }}
            >
              {focusMode ? '◧ Exit Focus' : '▣ Focus'}
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {section === 'consciousness' ? (
            <ConsciousnessView
              files={files}
              activeFileId={activeFileId}
              onSelectFile={handleSelectFromGraph}
            />
          ) : (
            <DynamicCanvas
              key={`${activeFile.id}-${currentPageIdx}`}
              file={{ ...activeFile, content: pages ? (pages[currentPageIdx]?.content ?? '') : activeFile.content }}
              onChange={(id, content) => {
                if (pages) {
                  const updated = pages.map((p, i) => i === currentPageIdx ? { ...p, content } : p);
                  setPagesMap(prev => ({ ...prev, [id]: updated }));
                } else {
                  handleUpdateFileContent(id, content);
                }
              }}
              pages={pages}
              currentPageIdx={currentPageIdx}
              onAddPage={() => handleAddPage(activeFile.id, activeFile.content)}
              onSelectPage={(idx) => handleSelectPage(activeFile.id, idx)}
              currentBgType={pages?.[currentPageIdx]?.bgType ?? 'dotted'}
              onChangeBgType={(t) => handleChangeBgType(activeFile.id, currentPageIdx, t)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
