"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { WorkspaceFile } from "@/types";
import { User } from "lucide-react";
import DynamicCanvas, { getFileType } from "@/components/DynamicCanvas";
import ConsciousnessView from "@/components/ConsciousnessView";
import AICopilot from "@/components/AICopilot";
import VaultUI from "@/components/VaultUI";
import TemplateGallery from "@/components/TemplateGallery";
import CyberTooltip from "@/components/CyberTooltip";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { getRelatedFiles } from "@/lib/similarity";
import { exportToZip, syncToLocalDirectory } from "@/lib/exporter";

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

// Removed DEFAULT_FILES array as we now use TemplateGallery.

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [files, setFiles]           = useState<WorkspaceFile[]>([]);
  const [pagesMap, setPagesMap]     = useState<PagesMap>({});
  const [pageIdxMap, setPageIdxMap] = useState<Record<string, number>>({});

  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [section, setSection]           = useState<'files' | 'consciousness'>('files');
  const [vaultOpen, setVaultOpen]       = useState(false);
  const [showAuthModal, setShowAuthModal]     = useState(false);
  const { user }                              = useAuth();
  const [focusMode, setFocusMode]       = useState(false);
  const [saveFlash, setSaveFlash]       = useState(false);
  const [bridgeResolver, setBridgeResolver] = useState<{ filename: string, amount: string, category: string } | null>(null);
  const [showSyncDropdown, setShowSyncDropdown] = useState(false);

  // ── Reminders & Alarm Scheduler States ──
  type Reminder = {
    id: string;
    task: string;
    dateTime: string;
    formattedDate: string;
    rawText: string;
    fileId: string;
    fileName: string;
    triggered: boolean;
    completed: boolean;
  };
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeAlert, setActiveAlert] = useState<Reminder | null>(null);


  // ── Portability Hub States & Handlers ──
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing]     = useState(false);
  const [localDirHandle, setLocalDirHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [syncTime, setSyncTime]       = useState<string | null>(null);
  const [syncStatus, setSyncStatus]   = useState<'idle' | 'success' | 'error'>('idle');

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      const blob = await exportToZip(files, pagesMap);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Cortex_Workspace_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP Export failed:", err);
      alert("ZIP Export failed. Check developer console.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleMountDirectory = async () => {
    try {
      if (typeof window === "undefined" || !('showDirectoryPicker' in window)) {
        alert("Your browser does not support local directory mounting. Try Chrome, Edge, or Opera.");
        return;
      }
      const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      setLocalDirHandle(handle);
      
      setIsSyncing(true);
      await syncToLocalDirectory(handle, files, pagesMap);
      setSyncTime(new Date().toLocaleTimeString());
      setSyncStatus('success');
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Failed to mount directory:", err);
        alert(`Mount failed: ${err.message}`);
        setSyncStatus('error');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncManual = async () => {
    if (!localDirHandle) return;
    try {
      setIsSyncing(true);
      await syncToLocalDirectory(localDirHandle, files, pagesMap);
      setSyncTime(new Date().toLocaleTimeString());
      setSyncStatus('success');
    } catch (err: any) {
      console.error("Manual sync failed:", err);
      alert(`Sync failed: ${err.message}`);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUnmountDirectory = () => {
    setLocalDirHandle(null);
    setSyncTime(null);
    setSyncStatus('idle');
  };

  // Real-time automatic background directory sync (debounced)
  useEffect(() => {
    if (!localDirHandle) return;
    
    const timer = setTimeout(async () => {
      try {
        await syncToLocalDirectory(localDirHandle, files, pagesMap);
        setSyncTime(new Date().toLocaleTimeString());
        setSyncStatus('success');
      } catch (err) {
        console.error("Background sync failed:", err);
        setSyncStatus('error');
      }
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [files, pagesMap, localDirHandle]);


  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

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
        // Nuke local storage if we detect the legacy Start_Here.md (to fix corrupted state for the user)
        if (rawFiles.includes('Start_Here.md')) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(PAGES_KEY);
          return;
        }

        let stored = JSON.parse(rawFiles) as WorkspaceFile[];
        
        // Sanitize: remove duplicate files with the same ID or name (to clean up old duplicated template bugs)
        const seenId = new Set<string>();
        const seenName = new Set<string>();
        stored = stored.filter(f => {
          if (seenId.has(f.id) || seenName.has(f.name)) return false;
          seenId.add(f.id);
          seenName.add(f.name);
          return true;
        });

        if (stored.length > 0) {
          setFiles(stored);
        }
      }
      
      if (rawPages) {
        setPagesMap(JSON.parse(rawPages) as PagesMap);
      }
    } catch {}
    hasLoaded.current = true;
  }, []);

  const handleTemplateSelect = (selectedFiles: WorkspaceFile[]) => {
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    setActiveFileId(selectedFiles[0].id);
    setFocusMode(false);
    saveToStorage(newFiles, pagesMap);
  };

  // Request notifications permission on start
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  // Hydrate reminders from localStorage
  useEffect(() => {
    try {
      const rawReminders = localStorage.getItem("cortex_reminders");
      if (rawReminders) {
        setReminders(JSON.parse(rawReminders) as Reminder[]);
      }
    } catch {}
  }, []);

  // Audio synthesizer chime using pure Web Audio API (highly cybernetic and local)
  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.15); // A6
      osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.4); // E6
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(440, now); // A4
      osc2.frequency.linearRampToValueAtTime(660, now + 0.2); // E5
      
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.85);
      osc2.stop(now + 0.65);
    } catch (e) {}
  };

  // Listen for created reminders
  useEffect(() => {
    const handleReminderCreated = (e: CustomEvent) => {
      const { id, task, dateTime, formattedDate, rawText } = e.detail;
      const file = filesRef.current.find(f => f.id === activeFileId);
      const fileName = file ? file.name : "Untitled.txt";

      const newReminder: Reminder = {
        id,
        task,
        dateTime,
        formattedDate,
        rawText,
        fileId: activeFileId || '',
        fileName: fileName,
        triggered: false,
        completed: false,
      };

      setReminders(prev => {
        const updated = [...prev.filter(r => r.id !== id), newReminder];
        localStorage.setItem("cortex_reminders", JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('cortex-reminder-created', handleReminderCreated as EventListener);
    return () => window.removeEventListener('cortex-reminder-created', handleReminderCreated as EventListener);
  }, [activeFileId]);

  // Alarms check loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setReminders(prev => {
        let changed = false;
        const next = prev.map(rem => {
          if (!rem.triggered && !rem.completed && rem.dateTime) {
            const remTime = new Date(rem.dateTime);
            if (now >= remTime) {
              changed = true;
              // Trigger Visual & Audio alert
              setActiveAlert(rem);
              playChime();

              // Send system OS notification
              if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                new Notification(`Cortex Alert: ${rem.task}`, {
                  body: `Active reminder: "${rem.task}" in note "${rem.fileName}"`,
                });
              }

              // Notify the Tiptap node view component to show the 'triggered' styling
              window.dispatchEvent(new CustomEvent('cortex-reminder-triggered', { detail: { id: rem.id } }));

              return { ...rem, triggered: true };
            }
          }
          return rem;
        });

        if (changed) {
          localStorage.setItem("cortex_reminders", JSON.stringify(next));
        }
        return next;
      });
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Teleportation Logic
  const handleTeleport = (alert: Reminder) => {
    setActiveFileId(alert.fileId);
    setSection('files');
    
    // Find matching page index
    const pages = pagesMap[alert.fileId];
    if (pages && pages.length > 0) {
      const idx = pages.findIndex(p => p.content.includes(alert.id));
      if (idx !== -1) {
        setPageIdxMap(prev => ({ ...prev, [alert.fileId]: idx }));
      }
    }
    
    // Smooth scroll and visual flash glow effect
    setTimeout(() => {
      const nodes = document.querySelectorAll('.cortex-editor span');
      let foundNode: HTMLElement | null = null;
      nodes.forEach((node: any) => {
        if (node.textContent?.includes(alert.task)) {
          foundNode = node;
        }
      });
      if (foundNode) {
        (foundNode as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        (foundNode as HTMLElement).style.boxShadow = '0 0 20px #00f0ff';
        (foundNode as HTMLElement).style.borderRadius = '12px';
        setTimeout(() => {
          if (foundNode) (foundNode as HTMLElement).style.boxShadow = '';
        }, 3000);
      }
    }, 500);

    // Dismiss active visual alert banner
    setActiveAlert(null);
  };

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

  const activeFile = activeFileId ? files.find(f => f.id === activeFileId) : null;

  const getFileContentForAI = (file: WorkspaceFile) => {
    if (!file) return "";
    const type = getFileType(file.name);
    const pages = pagesMap[file.id];
    if (pages && pages.length > 0) {
      if (type === 'text') {
        return pages.map((p, idx) => `[PAGE ${idx + 1}]\n${p.content}`).join("\n\n");
      }
      if (type === 'whiteboard') {
        return `[Whiteboard file containing ${pages.length} pages of drawing strokes]`;
      }
    }
    return file.content;
  };

  const resolvedFilesForAI = useMemo(() => {
    return files.map(f => {
      const type = getFileType(f.name);
      const pages = pagesMap[f.id];
      if (pages && pages.length > 0) {
        if (type === 'text') {
          return { ...f, content: pages.map((p, idx) => `[PAGE ${idx + 1}]\n${p.content}`).join("\n\n") };
        }
        if (type === 'whiteboard') {
          return { ...f, content: `[Whiteboard file containing ${pages.length} pages of drawing strokes]` };
        }
      }
      return f;
    });
  }, [files, pagesMap]);

  const relatedFiles = useMemo(() =>
    getRelatedFiles(activeFileId || '', resolvedFilesForAI, getFileType, 4),
    [activeFileId, resolvedFilesForAI]
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
    if (!existing) {
      const fallbackContent = files.find(f => f.id === fileId)?.content || '';
      setPagesMap(prev => ({ ...prev, [fileId]: [{ id: 1, content: fallbackContent, bgType }] }));
      return;
    }
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

  // Removed duplicate activeFile definition
  const fileType = activeFile ? getFileType(activeFile.name) : 'text';
  const supportsPages = fileType === 'text' || fileType === 'whiteboard';
  const pages = activeFile && supportsPages ? getPages(activeFile.id, activeFile.content) : null;
  const currentPageIdx = activeFile ? getCurrentPageIdx(activeFile.id) : 0;

  if (!activeFile) {
    return (
      <div style={{ display: 'flex', height: '100vh', background: B.bg, color: B.text, fontFamily: "var(--font-dm-sans), system-ui, sans-serif", overflow: 'hidden', position: 'relative' }}>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        {vaultOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"><VaultUI onClose={() => setVaultOpen(false)} /></div>}
        <TemplateGallery onSelect={handleTemplateSelect} />
      </div>
    );
  }

  // Sidebar width logic
  let sidebarWidth = 260;
  if (focusMode && !isMobile) sidebarWidth = 0;
  if (isMobile && !mobileMenuOpen) sidebarWidth = 0;

  return (
    <div style={{
      display: 'flex', height: '100vh', background: B.bg, color: B.text,
      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      overflow: 'hidden', position: 'relative'
    }}>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <AnimatePresence>
        {/* Removed old showOnboarding render */}
      </AnimatePresence>

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
          <div 
            onClick={() => { setActiveFileId(null); if (isMobile) setMobileMenuOpen(false); }} 
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
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
                className="group"
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
                  className="del-btn opacity-0 group-hover:opacity-100"
                  onClick={e => { e.stopPropagation(); handleDeleteFile(f.id); }}
                  style={{
                    opacity: isMobile ? 1 : undefined, transition: 'opacity .15s',
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
            cursor: 'pointer', marginBottom: '12px'
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New File
          </button>
          
          {/* Progressive Auth / Profile Button */}
          <button onClick={() => setShowAuthModal(true)} style={{
            width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13,
            color: user ? B.amber : B.muted, border: 'none', background: user ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
            display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { if(!user) { e.currentTarget.style.background = B.surface; e.currentTarget.style.color = B.text; } }}
          onMouseLeave={(e) => { if(!user) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = B.muted; } }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: user ? 'rgba(245, 158, 11, 0.2)' : B.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${user ? 'rgba(245, 158, 11, 0.3)' : B.border}`
            }}>
              <User size={14} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
              <span style={{ fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '140px' }}>
                {user ? user.email : 'Sign In'}
              </span>
              <span style={{ fontSize: 10, opacity: 0.7 }}>
                {user ? 'Cloud Sync Active' : 'Enable Cloud Sync'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
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
          
          {section === 'files' ? (
            <>
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
              <CyberTooltip title="Save manually" position="bottom">
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
              </CyberTooltip>

              {/* ── Sync / Portability Button & Dropdown ── */}
              <div style={{ position: 'relative' }}>
                <CyberTooltip title={localDirHandle ? 'Sync options' : 'Sync to disk'} position="bottom">
                  <button
                    onClick={() => setShowSyncDropdown(v => !v)}
                    style={{
                      padding: isMobile ? '6px 10px' : '4px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                      cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                      background: localDirHandle ? 'rgba(77, 186, 132, 0.12)' : showSyncDropdown ? B.amberGlow : 'transparent',
                      color: localDirHandle ? '#4dba84' : showSyncDropdown ? B.amber : B.muted,
                      border: localDirHandle ? '1px solid rgba(77, 186, 132, 0.3)' : showSyncDropdown ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                    }}
                  >
                    <span>⇱</span>
                    <span>{!isMobile && (localDirHandle ? 'Synced' : 'Sync')}</span>
                  </button>
                </CyberTooltip>

                {showSyncDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: 30,
                    right: 0,
                    width: 250,
                    background: 'rgba(11, 11, 22, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${B.border}`,
                    borderRadius: 10,
                    padding: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}>
                    <div style={{ fontSize: 10, color: B.muted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', borderBottom: `1px solid ${B.border}`, paddingBottom: 6 }}>
                      Portability & Sync Hub
                    </div>

                    {/* ZIP Exporter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: B.text }}>📦 Archive Backup</div>
                      <div style={{ fontSize: 9, color: B.muted, lineHeight: 1.3 }}>Export your workspace as standard Markdown and vector SVGs in a ZIP.</div>
                      <button
                        onClick={() => { handleExportZip(); setShowSyncDropdown(false); }}
                        disabled={isExporting}
                        style={{
                          marginTop: 4,
                          padding: '6px 8px',
                          borderRadius: 5,
                          fontSize: 10,
                          fontWeight: 600,
                          background: B.amberGlow,
                          color: B.amber,
                          border: `1px solid ${B.amberBorder}`,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          textAlign: 'center',
                          width: '100%'
                        }}
                      >
                        {isExporting ? 'Compiling...' : 'Download ZIP'}
                      </button>
                    </div>

                    {/* Local Directory Sync */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: `1px solid ${B.border}`, paddingTop: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: B.text }}>💻 Local Directory Sync</div>
                      <div style={{ fontSize: 9, color: B.muted, lineHeight: 1.3 }}>Mount a local folder to auto-sync edits to your computer recursively in real-time.</div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '4px 6px',
                        borderRadius: 4,
                        background: B.surface,
                        border: `1px solid ${B.border}`,
                        fontSize: 9,
                        marginTop: 2
                      }}>
                        <span style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: localDirHandle ? '#4dba84' : '#faad14',
                          boxShadow: localDirHandle ? '0 0 5px #4dba84' : 'none'
                        }} />
                        <span style={{ color: localDirHandle ? B.text : B.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                          {localDirHandle ? `Syncing to: ${localDirHandle.name}` : 'Disconnected'}
                        </span>
                      </div>

                      {localDirHandle ? (
                        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                          <button
                            onClick={() => { handleSyncManual(); }}
                            disabled={isSyncing}
                            style={{
                              flex: 1,
                              padding: '5px',
                              borderRadius: 5,
                              fontSize: 9,
                              fontWeight: 600,
                              background: 'rgba(77,186,132,0.1)',
                              color: '#4dba84',
                              border: '1px solid rgba(77,186,132,0.3)',
                              cursor: 'pointer',
                            }}
                          >
                            {isSyncing ? 'Syncing...' : 'Sync Now'}
                          </button>
                          <button
                            onClick={() => { handleUnmountDirectory(); }}
                            style={{
                              padding: '5px 8px',
                              borderRadius: 5,
                              fontSize: 9,
                              fontWeight: 600,
                              background: 'transparent',
                              color: 'rgba(250,100,100,0.8)',
                              border: '1px solid rgba(250,100,100,0.3)',
                              cursor: 'pointer',
                            }}
                          >
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { handleMountDirectory(); setShowSyncDropdown(false); }}
                          style={{
                            marginTop: 4,
                            padding: '6px 8px',
                            borderRadius: 5,
                            fontSize: 10,
                            fontWeight: 600,
                            background: B.elevated,
                            color: B.text,
                            border: `1px solid ${B.border}`,
                            cursor: 'pointer',
                            width: '100%'
                          }}
                        >
                          Mount Local Folder
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: B.amber, letterSpacing: 0.5 }}>◎ CONSCIOUSNESS GRAPH</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Focus Mode toggle */}
            {!isMobile && (
              <CyberTooltip title={focusMode ? 'Exit Focus Mode' : 'Focus Mode — hide sidebar'} position="bottom">
                <button
                  onClick={() => setFocusMode(v => !v)}
                  style={{
                    padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                    cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                    background: focusMode ? B.amberGlow : 'transparent',
                    color: focusMode ? B.amber : B.muted,
                    border: focusMode ? `1px solid ${B.amberBorder}` : `1px solid transparent`,
                  }}
                  onMouseEnter={e => {
                    if (!focusMode) {
                      e.currentTarget.style.color = B.amber;
                      e.currentTarget.style.background = 'rgba(240,149,50,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!focusMode) {
                      e.currentTarget.style.color = B.muted;
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>{focusMode ? '◧' : '▣'}</span>
                  <span>Focus</span>
                </button>
              </CyberTooltip>
            )}

            {/* Vault toggle */}
            <CyberTooltip
              id="vault_btn"
              title="Open Cortex Vault"
              content="Secure local environment for sensitive data."
              position="bottom"
              align="end"
              delay={1000}
            >
              <button
                onClick={() => setVaultOpen(true)}
                style={{
                  padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                  cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                  background: vaultOpen ? B.amberGlow : 'transparent',
                  color: vaultOpen ? B.amber : B.muted,
                  border: vaultOpen ? `1px solid ${B.amberBorder}` : `1px solid transparent`,
                }}
              >
                <span>❖</span>
                {!isMobile && <span>Vault</span>}
              </button>
            </CyberTooltip>

            {/* Copilot toggle */}
            <CyberTooltip
              id="copilot_btn"
              title="Toggle Neo"
              content="Your AI assistant."
              position="bottom"
              align="end"
              delay={1000}
            >
              <button
                onClick={() => setCopilotOpen(v => !v)}
                style={{
                  padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                  cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 5,
                  background: copilotOpen ? B.amberGlow : 'transparent',
                  color: copilotOpen ? B.amber : B.muted,
                  border: copilotOpen ? `1px solid ${B.amberBorder}` : `1px solid transparent`,
                }}
              >
                NEO
              </button>
            </CyberTooltip>
          </div>
        </div>

        {/* Content Area + Copilot */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {section === 'consciousness' ? (
              <ConsciousnessView
                files={resolvedFilesForAI}
                activeFileId={activeFileId || ''}
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
          
          <AICopilot 
            isOpen={copilotOpen} 
            onClose={() => setCopilotOpen(false)}
            activeFileName={activeFile.name}
            activeFileContent={getFileContentForAI(activeFile)}
            relatedFilesData={relatedFiles.map(r => {
              const file = resolvedFilesForAI.find(f => f.id === r.id);
              return { name: r.name, content: file ? getFileContentForAI(file) : '' };
            })}
            reminders={reminders}
          />
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

      {/* ── Dynamic Glassmorphic Alarm Banner ── */}
      {activeAlert && (
        <div style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 320,
          background: 'rgba(11, 11, 22, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 12px 40px rgba(0, 240, 255, 0.25)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="pulse-ring" style={{ width: 8, height: 8, borderRadius: '50%', background: '#00f0ff', display: 'inline-block' }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#00f0ff', textTransform: 'uppercase' }}>Cortex Alert</span>
            </div>
            <button onClick={() => {
              // Dismiss: mark as completed/expired so it stops pulsing, and close the toast
              window.dispatchEvent(new CustomEvent('cortex-reminder-expired', { detail: { id: activeAlert.id } }));
              setReminders(prev => {
                const next = prev.map(r => r.id === activeAlert.id ? { ...r, completed: true } : r);
                localStorage.setItem("cortex_reminders", JSON.stringify(next));
                return next;
              });
              setActiveAlert(null);
            }} style={{ color: B.muted, fontSize: 16, cursor: 'pointer' }}>×</button>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: B.text, lineHeight: 1.4 }}>
              {activeAlert.task}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: B.surface, border: `1px solid ${B.border}`, color: B.muted }}>
                📄 {activeAlert.fileName}
              </span>
              <span style={{ fontSize: 10, color: B.muted }}>
                ⏰ {activeAlert.formattedDate}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              onClick={() => handleTeleport(activeAlert)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                background: 'rgba(0, 240, 255, 0.15)',
                color: '#00f0ff',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              Teleport & View
            </button>
            <button
              onClick={() => {
                // Snooze 5 minutes
                const minutes = 5;
                const newTime = new Date(Date.now() + minutes * 60000).toISOString();
                setReminders(prev => {
                  const next = prev.map(r => r.id === activeAlert.id ? { ...r, triggered: false, dateTime: newTime, formattedDate: 'In 5 mins' } : r);
                  localStorage.setItem("cortex_reminders", JSON.stringify(next));
                  return next;
                });
                // Re-register node as active (cancel triggered state)
                window.dispatchEvent(new CustomEvent('cortex-reminder-triggered-cancel', { detail: { id: activeAlert.id } }));
                setActiveAlert(null);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                background: B.elevated,
                color: B.text,
                border: `1px solid ${B.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Snooze
            </button>
          </div>
        </div>
      )}
      {/* Vault Modal Overlay */}
      {vaultOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"><VaultUI onClose={() => setVaultOpen(false)} /></div>}
    </div>
  );
}
