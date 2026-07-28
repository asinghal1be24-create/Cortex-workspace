export type FileType = "text" | "code" | "finance" | "whiteboard";

export interface WorkspaceFile {
  id: string;
  name: string;
  content: string;
  /**
   * Reserved for multi-user auth — currently null for all rows.
   * When authentication is added, populate this with the authenticated user's UID
   * and add .eq('user_id', uid) to all Supabase queries in useSupabaseFiles.ts.
   */
  user_id?: string | null;
}
