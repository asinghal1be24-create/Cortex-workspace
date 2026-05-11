const STOPWORDS = new Set([
  'the','and','for','are','but','not','you','all','can','had','was','one','our',
  'out','day','get','has','him','his','how','now','see','say','she','too','use',
  'that','this','with','have','from','they','will','been','into','more','also',
  'than','then','when','your','each','like','make','many','over','time','very',
  'what','which','would','about','after','could','first','other','right','think',
  'those','where','while','data','file','note',
]);

export function extractKeywords(content: string): Set<string> {
  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/[{}[\]",:=+\-*/<>!();@#$%^&|]/g, ' ');
  const words = text.toLowerCase().split(/\s+/)
    .map(w => w.replace(/[^a-z]/g, ''))
    .filter(w => w.length > 4 && !STOPWORDS.has(w));
  return new Set(words);
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

export function getProject(name: string): string {
  return name.replace(/\.[^.]+$/, '').split(/[_\-\s]/)[0].toLowerCase();
}

export interface RelatedFile {
  id: string;
  name: string;
  score: number;       // 0–1
  reason: string;      // human readable
  sharedTopics: string[];
}

export function getRelatedFiles(
  activeId: string,
  files: Array<{ id: string; name: string; content: string }>,
  fileType: (name: string) => string,
  limit = 4
): RelatedFile[] {
  const active = files.find(f => f.id === activeId);
  if (!active) return [];

  const activeKw = extractKeywords(active.content);
  const activeProject = getProject(active.name);
  const activeType = fileType(active.name);

  const scored = files
    .filter(f => f.id !== activeId)
    .map(f => {
      const fKw = extractKeywords(f.content);
      const fProject = getProject(f.name);
      const fType = fileType(f.name);
      const sim = jaccard(activeKw, fKw);
      const sharedTopics = [...activeKw].filter(w => fKw.has(w)).slice(0, 3);

      let score = sim * 4; // keyword similarity (scaled)
      let reason = sharedTopics.length > 0 ? `Topics: ${sharedTopics.join(', ')}` : '';

      // Project match bonus
      if (fProject === activeProject && fProject.length > 1) {
        score = Math.max(score, 0.9);
        reason = `Project: ${fProject}`;
      }

      // Type bridge
      if (!reason) {
        if ((activeType === 'finance' && fType === 'text') || (activeType === 'text' && fType === 'finance')) {
          score = Math.max(score, 0.25);
          reason = 'Finance ↔ Notes';
        }
        if ((activeType === 'code' && fType === 'whiteboard') || (activeType === 'whiteboard' && fType === 'code')) {
          score = Math.max(score, 0.3);
          reason = 'Code ↔ Diagram';
        }
      }

      return { id: f.id, name: f.name, score: Math.min(score, 1), reason, sharedTopics };
    })
    .filter(r => r.score > 0.15)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}
