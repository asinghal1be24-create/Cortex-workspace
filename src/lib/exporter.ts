import JSZip from "jszip";
import { WorkspaceFile, FileType } from "@/types";
import { extractKeywords, jaccard, getRelatedFiles } from "@/lib/similarity";
import { getFileType } from "@/components/DynamicCanvas";

// Helper to sanitize filenames for local filesystems
export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-\.]/g, "_");
}

// Helper to map files to their workspace relative directory paths
export function getRelativePath(name: string): string {
  const type = getFileType(name);
  const safeName = sanitizeFileName(name);
  
  if (type === "finance") {
    return `data/${safeName}`;
  }
  if (type === "whiteboard") {
    // Whiteboards export as both SVG snapshot and raw coordinates JSON
    return `whiteboards/${safeName.replace(/\.(canvas|board)$/i, "")}.svg`;
  }
  if (type === "code") {
    return `code/${safeName}`;
  }
  // Default text files export as clean Markdown files
  const mdName = safeName.endsWith(".txt") ? safeName.slice(0, -4) + ".md" : safeName + ".md";
  return `notes/${mdName}`;
}

// Step 1: The Transformation Pipeline

// 1. Tiptap HTML string parser to clean Markdown
export function htmlToMarkdown(html: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return html; // Fallback
  }
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  function parseNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }
    
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    
    // Process children first
    const childrenMarkdown = Array.from(el.childNodes)
      .map(child => parseNode(child))
      .join("");
      
    switch (tag) {
      case "h1": return `\n# ${childrenMarkdown.trim()}\n`;
      case "h2": return `\n## ${childrenMarkdown.trim()}\n`;
      case "h3": return `\n### ${childrenMarkdown.trim()}\n`;
      case "h4": return `\n#### ${childrenMarkdown.trim()}\n`;
      case "h5": return `\n##### ${childrenMarkdown.trim()}\n`;
      case "h6": return `\n###### ${childrenMarkdown.trim()}\n`;
      case "p": return `\n${childrenMarkdown.trim()}\n`;
      case "strong": case "b": return `**${childrenMarkdown}**`;
      case "em": case "i": return `*${childrenMarkdown}*`;
      case "code": return ` \`${childrenMarkdown}\` `;
      case "pre": return `\n\`\`\`\n${childrenMarkdown.trim()}\n\`\`\`\n`;
      case "ul": return `\n${childrenMarkdown}\n`;
      case "ol": {
        let count = 1;
        const items = Array.from(el.children).map(li => {
          const content = Array.from(li.childNodes).map(c => parseNode(c)).join("").trim();
          return `${count++}. ${content}`;
        }).join("\n");
        return `\n${items}\n`;
      }
      case "li": return `* ${childrenMarkdown.trim()}\n`;
      case "table": {
        const rows = Array.from(el.querySelectorAll("tr"));
        if (rows.length === 0) return "";
        let mdTable = "";
        
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll("th, td"));
          const cellTexts = cells.map(cell => {
            return Array.from(cell.childNodes).map(c => parseNode(c)).join("").trim().replace(/\|/g, "\\|");
          });
          
          mdTable += `| ${cellTexts.join(" | ")} |\n`;
          
          if (rowIndex === 0) {
            const separators = cells.map(() => "---");
            mdTable += `| ${separators.join(" | ")} |\n`;
          }
        });
        return `\n${mdTable}\n`;
      }
      case "span": {
        if (el.getAttribute("data-type") === "data-spark") {
          const rawText = el.getAttribute("data-raw-text") || el.getAttribute("rawtext") || "";
          return ` $$ ${rawText} $$ `;
        }
        return childrenMarkdown;
      }
      case "br": return "\n";
      default: return childrenMarkdown;
    }
  }
  
  return parseNode(doc.body).replace(/\n{3,}/g, "\n\n").trim();
}

// 2. Whiteboard JSON content to scalable vector graphics (SVG)
interface Point { x: number; y: number; }
interface Stroke { color: string; points: Point[]; }

export function whiteboardToSvg(strokesJson: string): string {
  let strokes: Stroke[] = [];
  try {
    strokes = JSON.parse(strokesJson);
  } catch (e) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" style="background:#080810;"></svg>`;
  }
  
  if (!Array.isArray(strokes) || strokes.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" style="background:#080810;"></svg>`;
  }
  
  // Calculate bounding box to fit the svg automatically
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;
  
  strokes.forEach(stroke => {
    stroke.points.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    });
  });
  
  // Padding around bounding box
  const pad = 40;
  if (minX === Infinity) { minX = 0; minY = 0; maxX = 800; maxY = 600; }
  else {
    minX -= pad;
    minY -= pad;
    maxX += pad;
    maxY += pad;
  }
  
  const width = maxX - minX;
  const height = maxY - minY;
  
  // Generate paths
  let paths = "";
  strokes.forEach(stroke => {
    if (stroke.points.length === 0) return;
    let d = `M ${stroke.points[0].x} ${stroke.points[0].y}`;
    for (let i = 1; i < stroke.points.length; i++) {
      d += ` L ${stroke.points[i].x} ${stroke.points[i].y}`;
    }
    paths += `  <path d="${d}" stroke="${stroke.color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />\n`;
  });
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="100%" height="100%" style="background:#080810;">
${paths}</svg>`;
}

// Step 2: Relational Manifest (graph.json)
export function generateGraphJson(files: WorkspaceFile[]): string {
  const nodes = files.map(f => ({
    id: f.id,
    name: f.name,
    type: getFileType(f.name),
    path: `/${getRelativePath(f.name)}`
  }));
  
  const edges: Array<{ source: string; target: string; type: string; score: number }> = [];
  
  // Evaluate similarity edges for all file pairs using Jaccard algorithm
  for (let i = 0; i < files.length; i++) {
    const fileA = files[i];
    const kwA = extractKeywords(fileA.content);
    
    for (let j = i + 1; j < files.length; j++) {
      const fileB = files[j];
      const kwB = extractKeywords(fileB.content);
      const score = jaccard(kwA, kwB);
      
      // If there is a meaningful correlation, establish a relation node in graph
      if (score > 0.05) {
        edges.push({
          source: fileA.id,
          target: fileB.id,
          type: "jaccard_link",
          score: parseFloat(score.toFixed(2))
        });
      }
    }
  }
  
  return JSON.stringify({
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    nodes,
    edges
  }, null, 2);
}

// Variation 2: Obsidian-Native Front-Matter and Link Footer Injection
export function injectObsidianFrontMatter(file: WorkspaceFile, filesList: WorkspaceFile[]): string {
  const activeId = file.id;
  const related = getRelatedFiles(activeId, filesList, getFileType, 4);
  const relatedLinks = related.map(r => {
    const isMd = getFileType(r.name) === "text";
    const nameWithoutExt = isMd ? r.name.replace(/\.txt$/i, "") : r.name;
    return `[[${nameWithoutExt}]]`;
  });
  
  const yaml = `---
id: "${file.id}"
name: "${file.name}"
tags: [cortex-export, autonomy-sync]
related_nodes: [${relatedLinks.map(l => `"${l}"`).join(", ")}]
exported_at: "${new Date().toISOString()}"
---
`;
  return yaml;
}

export function generateObsidianFooter(file: WorkspaceFile, filesList: WorkspaceFile[]): string {
  const activeId = file.id;
  const related = getRelatedFiles(activeId, filesList, getFileType, 4);
  if (related.length === 0) return "";
  
  let footer = "\n\n---\n\n### 🧠 Consciousness Graph Relations\n";
  related.forEach(r => {
    const isMd = getFileType(r.name) === "text";
    const nameWithoutExt = isMd ? r.name.replace(/\.txt$/i, "") : r.name;
    footer += `- [[${nameWithoutExt}]] — Jaccard Score: **${(r.score * 100).toFixed(0)}%** (Reason: *${r.reason}*)\n`;
  });
  return footer;
}

// Step 3: JSZip Client-Side Compiler and Bundler
export async function exportToZip(files: WorkspaceFile[], pagesMap: Record<string, any[]>): Promise<Blob> {
  const zip = new JSZip();
  
  for (const file of files) {
    const type = getFileType(file.name);
    const safeName = sanitizeFileName(file.name);
    
    // Resolve content (merging page strips for text/whiteboard modalities)
    let finalContent = file.content;
    const pages = pagesMap[file.id];
    
    if (pages && pages.length > 0) {
      if (type === "text") {
        // Merge multiple rich text pages into sections separated by Horizontal Rules
        const parsedPages = pages.map((p, idx) => {
          const pageMarkdown = htmlToMarkdown(p.content);
          return `### Page ${idx + 1}\n\n${pageMarkdown}`;
        });
        finalContent = parsedPages.join("\n\n---\n\n");
      } else if (type === "whiteboard") {
        // Whiteboard page list remains as coordinate JSON list
        finalContent = JSON.stringify(pages);
      }
    }
    
    if (type === "text") {
      // Notes get converted to Markdown with front-matter and wiki relations
      const frontMatter = injectObsidianFrontMatter(file, files);
      const mdBody = htmlToMarkdown(finalContent);
      const footer = generateObsidianFooter(file, files);
      
      const fullMarkdown = `${frontMatter}\n${mdBody}${footer}`;
      const mdName = safeName.endsWith(".txt") ? safeName.slice(0, -4) + ".md" : safeName + ".md";
      
      zip.folder("notes")?.file(mdName, fullMarkdown);
    }
    else if (type === "code") {
      // Code files remain as native raw scripts
      zip.folder("code")?.file(safeName, finalContent);
    }
    else if (type === "finance") {
      // Ledger sheets export as standard CSV
      zip.folder("data")?.file(safeName, finalContent);
    }
    else if (type === "whiteboard") {
      // Whiteboard drawing gets double-exported:
      // 1. Interactive visual Vector SVG snapshot
      const svgContent = whiteboardToSvg(finalContent);
      const svgName = safeName.replace(/\.(canvas|board)$/i, "") + ".svg";
      zip.folder("whiteboards")?.file(svgName, svgContent);
      
      // 2. Raw stroke coordinate JSON for potential app re-import
      const jsonName = safeName.replace(/\.(canvas|board)$/i, "") + ".json";
      zip.folder("whiteboards")?.file(jsonName, finalContent);
    }
  }
  
  // Write root graph.json manifest
  const graphJson = generateGraphJson(files);
  zip.file("graph.json", graphJson);
  
  // Compile zip blob
  return await zip.generateAsync({ type: "blob" });
}

// ── Variation 3: File System Access API Real-time Mounting ────────────────────

// Request directory mount permission
export async function verifyDirectoryPermission(
  dirHandle: any, 
  readWrite: boolean
): Promise<boolean> {
  const options = {
    mode: (readWrite ? "readwrite" : "read") as "readwrite" | "read"
  };
  
  try {
    if (typeof dirHandle.queryPermission === "function") {
      if ((await dirHandle.queryPermission(options)) === "granted") {
        return true;
      }
    }
    if (typeof dirHandle.requestPermission === "function") {
      if ((await dirHandle.requestPermission(options)) === "granted") {
        return true;
      }
    }
  } catch (e) {
    console.error("Permission check failed:", e);
  }
  return false;
}

// Helper to write files recursively to local mount picker
async function writeLocalFile(
  dirHandle: FileSystemDirectoryHandle, 
  path: string, 
  content: string | Blob
): Promise<void> {
  const parts = path.split("/");
  let currentDir = dirHandle;
  
  for (let i = 0; i < parts.length - 1; i++) {
    currentDir = await currentDir.getDirectoryHandle(parts[i], { create: true });
  }
  
  const fileName = parts[parts.length - 1];
  const fileHandle = await currentDir.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

// Recursive sync pipeline to mirror entire Cortex database to mounted folder
export async function syncToLocalDirectory(
  dirHandle: FileSystemDirectoryHandle, 
  files: WorkspaceFile[], 
  pagesMap: Record<string, any[]>
): Promise<void> {
  // Verify permissions
  const hasPermission = await verifyDirectoryPermission(dirHandle, true);
  if (!hasPermission) {
    throw new Error("Local directory write permission was denied.");
  }
  
  for (const file of files) {
    const type = getFileType(file.name);
    const safeName = sanitizeFileName(file.name);
    
    let finalContent = file.content;
    const pages = pagesMap[file.id];
    
    if (pages && pages.length > 0) {
      if (type === "text") {
        const parsedPages = pages.map((p, idx) => {
          const pageMarkdown = htmlToMarkdown(p.content);
          return `### Page ${idx + 1}\n\n${pageMarkdown}`;
        });
        finalContent = parsedPages.join("\n\n---\n\n");
      } else if (type === "whiteboard") {
        finalContent = JSON.stringify(pages);
      }
    }
    
    if (type === "text") {
      const frontMatter = injectObsidianFrontMatter(file, files);
      const mdBody = htmlToMarkdown(finalContent);
      const footer = generateObsidianFooter(file, files);
      
      const fullMarkdown = `${frontMatter}\n${mdBody}${footer}`;
      const mdName = safeName.endsWith(".txt") ? safeName.slice(0, -4) + ".md" : safeName + ".md";
      
      await writeLocalFile(dirHandle, `notes/${mdName}`, fullMarkdown);
    }
    else if (type === "code") {
      await writeLocalFile(dirHandle, `code/${safeName}`, finalContent);
    }
    else if (type === "finance") {
      await writeLocalFile(dirHandle, `data/${safeName}`, finalContent);
    }
    else if (type === "whiteboard") {
      // 1. Vector graphics representation
      const svgContent = whiteboardToSvg(finalContent);
      const svgName = safeName.replace(/\.(canvas|board)$/i, "") + ".svg";
      await writeLocalFile(dirHandle, `whiteboards/${svgName}`, svgContent);
      
      // 2. Structured JSON vectors
      const jsonName = safeName.replace(/\.(canvas|board)$/i, "") + ".json";
      await writeLocalFile(dirHandle, `whiteboards/${jsonName}`, finalContent);
    }
  }
  
  // Sync manifest.json
  const graphJson = generateGraphJson(files);
  await writeLocalFile(dirHandle, "graph.json", graphJson);
}
