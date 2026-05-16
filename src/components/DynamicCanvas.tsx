"use client";

import { WorkspaceFile, FileType } from "@/types";
import TextEditor from "./TextEditor";
import CodeEditor from "./CodeEditor";
import FinanceEditor from "./FinanceEditor";
import WhiteboardEditor from "./WhiteboardEditor";

export function getFileType(name: string): FileType {
  const lower = name.toLowerCase();
  
  if (lower.includes("finance") || lower.endsWith(".csv") || lower.endsWith(".xlsx")) {
    return "finance";
  }
  
  if (lower.endsWith(".canvas") || lower.endsWith(".board")) {
    return "whiteboard";
  }
  
  if (
    lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".ts") || lower.endsWith(".tsx") ||
    lower.endsWith(".py") || lower.endsWith(".m") || lower.endsWith(".sql") || lower.endsWith(".html") || lower.endsWith(".css") ||
    lower.endsWith(".cpp") || lower.endsWith(".c") || lower.endsWith(".h") || lower.endsWith(".hpp")
  ) {
    return "code";
  }

  return "text";
}

interface Page { id: number; content: string; }

interface DynamicCanvasProps {
  file: WorkspaceFile;
  onChange: (id: string, content: string) => void;
  pages?: Page[] | null;
  currentPageIdx?: number;
  onAddPage?: () => void;
  onSelectPage?: (idx: number) => void;
  currentBgType?: 'dotted' | 'lined' | 'plain' | 'white';
  onChangeBgType?: (t: 'dotted' | 'lined' | 'plain' | 'white') => void;
}

export default function DynamicCanvas({ 
  file, 
  onChange,
  pages,
  currentPageIdx = 0,
  onAddPage,
  onSelectPage,
  currentBgType,
  onChangeBgType,
}: DynamicCanvasProps) {
  const fileType = getFileType(file.name);

  const handleUpdate = (newContent: string) => {
    onChange(file.id, newContent);
  };

  if (fileType === "finance") {
    return <FinanceEditor content={file.content} onChange={handleUpdate} />;
  }

  if (fileType === "whiteboard") {
    return (
      <WhiteboardEditor
        content={file.content}
        onChange={handleUpdate}
        pages={pages}
        currentPageIdx={currentPageIdx}
        onAddPage={onAddPage}
        onSelectPage={onSelectPage}
        currentBgType={currentBgType}
        onChangeBgType={onChangeBgType}
      />
    );
  }

  if (fileType === "code") {
    return <CodeEditor content={file.content} fileName={file.name} onChange={handleUpdate} />;
  }

  return (
    <TextEditor
      content={file.content}
      onChange={handleUpdate}
      pages={pages}
      currentPageIdx={currentPageIdx}
      onAddPage={onAddPage}
      onSelectPage={onSelectPage}
    />
  );
}
