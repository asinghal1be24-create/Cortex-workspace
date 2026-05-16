"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { WorkspaceFile } from "@/types";
import DynamicCanvas, { getFileType } from "@/components/DynamicCanvas";
import ConsciousnessView from "@/components/ConsciousnessView";
import { getRelatedFiles } from "@/lib/similarity";

// ── localStorage helpers ───────────────────────────────────────────────────────

const STORAGE_KEY   = "cortex_workspace_files";
const PAGES_KEY     = "cortex_pages_map";

type PageEntry = { id: number; content: string; bgType?: 'dotted' | 'lined' | 'plain' | 'white' };
type PagesMap  = Record<string, PageEntry[]>;

function saveToStorage(files: WorkspaceFile[], pagesMap: PagesMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    localStorage.setItem(PAGES_KEY,   JSON.stringify(pagesMap));
  } catch {}
}

// ── Default files shown on first ever load ────────────────────────────────────

const DEFAULT_FILES: WorkspaceFile[] = [
  { id: '1', name: 'Ideas.txt', content: '<p> </p>' },
  { id: '2', name: 'script.m', content: '% MATLAB script\nx = linspace(0, 2*pi, 100);\ny = sin(x);\nplot(x, y);' },
  { id: '3', name: 'Q2_Finance.csv', content: '[{"id":1,"category":"Rent","amount":12000},{"id":2,"category":"Food","amount":5000},{"id":3,"category":"Software","amount":800}]' },
];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  // Always start with DEFAULT_FILES so server + client render identically.
  // After hydration, the useEffect below overwrites with whatever is in localStorage.
  const [files, setFiles]           = useState<WorkspaceFile[]>(DEFAULT_FILES);
  const [pagesMap, setPagesMap]     = useState<PagesMap>({});
  const [pageIdxMap, setPageIdxMap] = useState<Record<string, number>>({});

  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [section, setSection]           = useState<'files' | 'consciousness'>('files');
  const [focusMode, setFocusMode]       = useState(false);
  const [saveFlash, setSaveFlash]       = useState(false);
  const [bridgeResolver, setBridgeResolver] = useState<{ filename: string, amount: string, category: string } | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tracks whether the initial localStorage load has completed.
  const hasLoaded = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load persisted data from localStorage after first render (client-only).
  useEffect(() => {
    try {
      const rawFiles = localStorage.getItem(STORAGE_KEY);
      const rawPages = localStorage.getItem(PAGES_KEY);
      if (rawFiles) {
        const stored = JSON.parse(rawFiles) as WorkspaceFile[];
        if (stored.length > 0) {
          setFiles(stored);
          setActiveFileId(stored[0].id);
        }
      }
      if (rawPages) {
        setPagesMap(JSON.parse(rawPages) as PagesMap);
      }
    } catch {}
    hasLoaded.current = true;
  }, []);

  // Auto-save the file LIST whenever it changes
  useEffect(() => {
    if (!hasLoaded.current) return; 
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    } catch {}
  }, [files]);

  // ── Data Bridge Logic ─────────────────────────────────────────────────────
  const filesRef = useRef(files);
  useEffect(() => { filesRef.current = files; }, [files]);

  const executeBridge = (fileId: string, payload: { amount: string, category: string }) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        let data = [];
        try { data = JSON.parse(f.content); } catch (e) {}
        if (!Array.isArray(data)) data = [];
        
        const amountToAdd = Number(payload.amount) || 0;
        const targetCat = payload.category.trim();
        const targetCatLower = targetCat.toLowerCase();
        
        const existingIndex = data.findIndex((row: any) => 
          row.category && String(row.category).toLowerCase().trim() === targetCatLower
        );
        
        if (existingIndex >= 0) {
          data[existingIndex].amount = (Number(data[existingIndex].amount) || 0) + amountToAdd;
          data[existingIndex].date = new Date().toISOString().split('T')[0];
        } else {
          data.push({
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            category: targetCat,
            amount: amountToAdd
          });
        }
        
        return { ...f, content: JSON.stringify(data) };
      }
      return f;
    }));
    
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1800);
    setBridgeResolver(null);
  };

  useEffect(() => {
    const handleBridge = (e: CustomEvent<{filename: string, amount: string, category: string}>) => {
      const { filename, amount, category } = e.detail;
      let targetName = filename.trim();
      if (!targetName.toLowerCase().endsWith('.csv')) targetName += '.csv';
      
      const targetFile = filesRef.current.find(f => f.name.toLowerCase() === targetName.toLowerCase());
      
      if (targetFile) {
        executeBridge(targetFile.id, { amount, category });
      } else {
        setBridgeResolver({ filename: targetName, amount, category });
      }
    };
    window.addEventListener('cortex-bridge', handleBridge as EventListener);
    return () => window.removeEventListener('cortex-bridge', handleBridge as EventListener);
  }, []);
  // ──────────────────────────────────────────────────────────────────────────

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const relatedFiles = useMemo(() =>
    getRelatedFiles(activeFileId, files, getFileType, 4),
    [activeFileId, files]
  );

  const handleSave = () => {
    saveToStorage(files, pagesMap);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1800);
  };

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
    if (isMobile) setMobileMenuOpen(false);
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
    if (isMobile) setMobileMenuOpen(false);
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

  // Sidebar width logic
  let sidebarWidth = 260;
  if (focusMode && !isMobile) sidebarWidth = 0;
  if (isMobile && !mobileMenuOpen) sidebarWidth = 0;

  return (
    <div style={{
      display: 'flex', height: '100vh', background: B.bg, color: B.text,
      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      minWidth: isMobile ? 320 : 880, overflow: 'hidden', position: 'relative'
    }}>
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 40, backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div style={{
        width: sidebarWidth,
        overflow: 'hidden',
        background: B.sidebar, 
        borderRight: sidebarWidth === 0 ? 'none' : `1px solid ${B.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: isMobile ? 'absolute' : 'relative',
        top: 0, bottom: 0, left: 0,
        zIndex: isMobile ? 50 : 1,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 18px 14px', borderBottom: `1px solid ${B.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8, background: B.amber,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: B.bg
            }}>✦</div>
            <span style={{ fontSize: 16, fontWeight: 500, color: B.text, letterSpacing: -.3 }}>CORTEX</span>
          </div>
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: B.muted, fontSize: 20, cursor: 'pointer' }}>×</button>
          )}
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
                onClick={() => {
                  setActiveFileId(f.id);
                  if (isMobile) setMobileMenuOpen(false);
                }}
                style={{
                  padding: '12px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                  background: activeFileId === f.id ? B.amberGlow : 'transparent',
                  border: activeFileId === f.id ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                  transition: 'all .15s',
                  display: 'flex', alignItems: 'center', gap: 8,
                  position: 'relative'
                }}
              >
                <span style={{ fontSize: 14, color: activeFileId === f.id ? B.amber : B.muted }}>
                  {getFileIcon(f.name)}
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 500, flex: 1,
                  color: activeFileId === f.id ? B.text : '#b8b5cc',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {f.name}
                </span>
                <button
                  className="del-btn"
                  onClick={e => { e.stopPropagation(); handleDeleteFile(f.id); }}
                  style={{
                    opacity: isMobile ? 1 : 0, transition: 'opacity .15s',
                    fontSize: 18, lineHeight: 1, color: B.muted,
                    flexShrink: 0, padding: '0 4px',
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
                  <div key={r.id} onClick={() => { setActiveFileId(r.id); if(isMobile) setMobileMenuOpen(false); }} style={{
                    padding: '10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                    border: '1px solid transparent', transition: 'all .15s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, color: B.muted }}>{getFileIcon(r.name)}</span>
                      <span style={{
                        fontSize: 13, fontWeight: 500, color: '#b8b5cc',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {r.name}
                      </span>
                    </div>
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
              Nodes are your files. Edges show semantic connections.
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
            width: '100%', padding: '12px', borderRadius: 8, fontSize: 14,
            color: B.muted, border: `1px dashed ${B.border}`, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New File
          </button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {section === 'files' && (
          <div style={{
            height: isMobile ? 64 : 56, borderBottom: `1px solid ${B.border}`, display: 'flex',
            alignItems: 'center', padding: isMobile ? '0 12px' : '0 20px', gap: isMobile ? 8 : 16, flexShrink: 0, background: B.sidebar
          }}>
            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: 'none', border: 'none', color: B.text, fontSize: 20, cursor: 'pointer',
                  padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                ☰
              </button>
            )}
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10 }}>
              {!isMobile && <span style={{ color: B.muted, fontSize: 13 }}>{getFileIcon(activeFile.name)}</span>}
              <input
                value={activeFile.name}
                onChange={(e) => handleUpdateFileName(activeFile.id, e.target.value)}
                className="bg-transparent border-none outline-none font-medium text-sm"
                style={{ color: B.text, width: isMobile ? '120px' : '200px' }}
                placeholder="Filename..."
              />
              {!isMobile && (
                <span style={{
                  fontSize: 11, color: B.muted, background: B.surface,
                  padding: '2px 8px', borderRadius: 12, border: `1px solid ${B.border}`
                }}>
                  {getFileType(activeFile.name)}
                </span>
              )}
            </div>

            {/* ── Save button ── */}
            <button
              onClick={handleSave}
              style={{
                padding: isMobile ? '6px 10px' : '4px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                background: saveFlash ? 'rgba(77,186,132,0.12)' : B.amberGlow,
                color: saveFlash ? '#4dba84' : B.amber,
                border: saveFlash ? '1px solid rgba(77,186,132,0.3)' : `1px solid ${B.amberBorder}`,
              }}
            >
              {saveFlash ? '✓' : '⬇'}{!isMobile && (saveFlash ? ' Saved' : ' Save')}
            </button>

            {/* Focus Mode toggle (Desktop only) */}
            {!isMobile && (
              <button
                onClick={() => setFocusMode(v => !v)}
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
            )}
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

      {/* ── Data Bridge Resolver Modal ── */}
      {bridgeResolver && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: B.surface, border: `1px solid ${B.border}`, color: B.text,
            padding: 24, borderRadius: 12, width: 400, boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Data Bridge: File Not Found</div>
            <div style={{ fontSize: 13, color: B.muted, marginBottom: 20 }}>
              Could not find <strong style={{ color: B.amber }}>{bridgeResolver.filename}</strong>. What would you like to do?
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto', marginBottom: 20 }}>
              {files.filter(f => getFileType(f.name) === 'finance').map(f => (
                <button key={f.id} onClick={() => executeBridge(f.id, bridgeResolver)} style={{
                  padding: '10px 14px', background: B.bg, border: `1px solid ${B.border}`,
                  borderRadius: 8, color: B.text, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = B.amber}
                onMouseLeave={e => e.currentTarget.style.borderColor = B.border}>
                  Log to <strong style={{ color: '#4dba84' }}>{f.name}</strong>
                </button>
              ))}
              {files.filter(f => getFileType(f.name) === 'finance').length === 0 && (
                <div style={{ fontSize: 12, color: B.muted, fontStyle: 'italic', padding: '4px 0' }}>No existing ledger files found.</div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => {
                const newFile: WorkspaceFile = {
                  id: Date.now().toString(),
                  name: bridgeResolver.filename,
                  content: '[]'
                };
                setFiles(prev => [...prev, newFile]);
                executeBridge(newFile.id, bridgeResolver);
              }} style={{
                flex: 1, padding: 10, background: B.amber, color: '#000', border: 'none',
                borderRadius: 8, fontWeight: 600, cursor: 'pointer'
              }}>+ Create New Ledger</button>
              <button onClick={() => setBridgeResolver(null)} style={{
                padding: 10, background: 'transparent', color: B.muted, border: `1px solid ${B.border}`,
                borderRadius: 8, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
