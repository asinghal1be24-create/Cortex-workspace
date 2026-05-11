export type NoteMode = 'text' | 'code' | 'whiteboard';

export interface Note {
  id: string | number;
  title: string;
  tags: string[];
  icon: string;
  mode: NoteMode;
  content: string;
}

export interface GraphNode {
  id: string | number;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
}

export interface GraphEdge {
  from: string | number;
  to: string | number;
  s: number; // strength/similarity
}
