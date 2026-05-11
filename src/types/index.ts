export type FileType = "text" | "code" | "finance" | "whiteboard";

export interface WorkspaceFile {
  id: string;
  name: string;
  content: string;
}
