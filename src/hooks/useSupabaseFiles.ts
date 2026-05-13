"use client";

/**
 * useSupabaseFiles.ts
 *
 * Custom hook encapsulating ALL Supabase interactions for the Cortex workspace:
 *   1. Fetching files on mount.
 *   2. Creating new files in the DB.
 *   3. Deleting files from the DB.
 *   4. Debounced upsert for content changes (1500ms delay).
 *   5. Save-status state ("idle" | "saving" | "saved" | "error").
 *
 * FUTURE-PROOFING NOTE:
 *   Every query has a comment block marking WHERE a .eq('user_id', uid) filter
 *   should be inserted once authentication is added. Nothing else needs to change.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { WorkspaceFile } from "@/types";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SaveStatus = "idle" | "saving" | "saved" | "error";

// Shape of a row returned from the `files` table
interface DbFile {
  id: string;
  name: string;
  content: string;
  type: string;
  user_id: string | null;
  updated_at: string;
}

// ── Debounce helper ───────────────────────────────────────────────────────────

function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, delay]
  ) as T;

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return debounced;
}

// ── Main hook ─────────────────────────────────────────────────────────────────

export function useSupabaseFiles() {
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // ── 1. Fetch all files on mount ─────────────────────────────────────────
  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("files")
          .select("*")
          // ┌─────────────────────────────────────────────────────────┐
          // │ FUTURE AUTH FILTER — add this line once login is wired: │
          // │   .eq('user_id', currentUser.id)                        │
          // └─────────────────────────────────────────────────────────┘
          .order("updated_at", { ascending: false });

        if (error) {
          console.error("[Cortex] Failed to fetch files:", error.message);
          // Graceful fallback: leave files as empty array rather than crashing
          setFiles([]);
        } else {
          const mapped: WorkspaceFile[] = (data as DbFile[]).map((row) => ({
            id: row.id,
            name: row.name,
            content: row.content ?? "",
          }));
          setFiles(mapped);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  // ── 2. Create a new file ────────────────────────────────────────────────
  const createFile = useCallback(async (name = "Untitled.txt"): Promise<WorkspaceFile | null> => {
    const { data, error } = await supabase
      .from("files")
      .insert({
        name,
        content: "",
        type: "text",
        // ┌──────────────────────────────────────────────────────────────┐
        // │ FUTURE AUTH — replace null with the real user UID:           │
        // │   user_id: currentUser.id                                    │
        // └──────────────────────────────────────────────────────────────┘
        user_id: null,
      })
      .select()
      .single();

    if (error) {
      console.error("[Cortex] Failed to create file:", error.message);
      return null;
    }

    const newFile: WorkspaceFile = {
      id: (data as DbFile).id,
      name: (data as DbFile).name,
      content: (data as DbFile).content ?? "",
    };

    setFiles((prev) => [newFile, ...prev]);
    return newFile;
  }, []);

  // ── 3. Delete a file ────────────────────────────────────────────────────
  const deleteFile = useCallback(async (id: string) => {
    const { error } = await supabase
      .from("files")
      .delete()
      .eq("id", id);
      // ┌──────────────────────────────────────────────────────────────┐
      // │ FUTURE AUTH — also add .eq('user_id', currentUser.id) here   │
      // │ as a safety guard so users can only delete their own rows.    │
      // └──────────────────────────────────────────────────────────────┘

    if (error) {
      console.error("[Cortex] Failed to delete file:", error.message);
      return;
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // ── 4. Rename a file (name only, no debounce needed) ───────────────────
  const renameFile = useCallback(async (id: string, newName: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: newName } : f)));

    const { error } = await supabase
      .from("files")
      .update({ name: newName, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("[Cortex] Failed to rename file:", error.message);
    }
  }, []);

  // ── 5. Upsert content (debounced 1500ms) ───────────────────────────────
  const _doUpsert = useCallback(
    async (id: string, content: string, name: string) => {
      setSaveStatus("saving");
      const { error } = await supabase
        .from("files")
        .upsert(
          {
            id,
            name,
            content,
            updated_at: new Date().toISOString(),
            // ┌──────────────────────────────────────────────────────────────┐
            // │ FUTURE AUTH — replace null with the real UID:                │
            // │   user_id: currentUser.id                                    │
            // └──────────────────────────────────────────────────────────────┘
            user_id: null,
          },
          { onConflict: "id" }  // update-in-place if the row already exists
        );

      if (error) {
        console.error("[Cortex] Auto-save failed:", error.message);
        setSaveStatus("error");
      } else {
        setSaveStatus("saved");
        // Reset to idle after 2s so the indicator disappears cleanly
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    },
    []
  );

  const debouncedUpsert = useDebounce(_doUpsert, 1500);

  /**
   * Call this from any editor's onChange handler.
   * Immediately updates local state (fast UI) then debounces the DB write.
   */
  const saveContent = useCallback(
    (id: string, content: string, name: string) => {
      // Optimistic local update
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, content } : f))
      );
      // Trigger debounced DB write
      debouncedUpsert(id, content, name);
    },
    [debouncedUpsert]
  );

  return {
    files,
    setFiles,
    loading,
    saveStatus,
    createFile,
    deleteFile,
    renameFile,
    saveContent,
  };
}
