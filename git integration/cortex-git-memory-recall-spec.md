# Feature Spec: Git-Linked Memory Recall ("Repo Memory")

**Project:** Cortex (Antigravity) Workspace
**Feature area:** Consciousness Tab, NEO, Semantic Graph, GitHub Integration
**Status:** Approved for implementation (Post-Red Team Scoping)
**Author:** Product & Engineering

---

## 1. Problem Statement

Cortex already treats notes, whiteboards, and code files as nodes in a local semantic graph, linked via Jaccard similarity for Obsidian export. What's missing is the user's **history of actual work** — their GitHub repos — as a source of memory.

Today, if a user starts writing a note like "need to set up an LLM fine-tuning pipeline," Cortex has no way of knowing they already built exactly that six months ago in `llm-finetune-experiments`. The user re-derives decisions from scratch instead of recalling prior work.

**Goal:** Let users link GitHub repos to their workspace. Cortex scrapes and condenses selected repos into "bundles" (same primitive as existing consciousness-tab bundles). While the user types, NEO passively and cheaply checks the active document against the bundle corpus using a client-side similarity engine and surfaces recall nudges.

---

## 2. Non-Goals (v1)

- Not a full code-search/RAG-over-source-code tool. We summarize at the repo/commit level, not the function level.
- Not a general GitHub project manager (no issue/PR management in this feature).
- Not real-time collaborative — single-user, local-first, same trust model as the existing vault.
- No general read/write GitHub OAuth. Access is strictly read-only, limited to user-selected repositories.

---

## 3. User Story & Acceptance Criteria

> As a developer using Cortex, I want to link my GitHub account so that when I'm writing notes about a new idea, NEO can tell me "you've done something like this before in `<repo>`" and let me jump straight to that context — instead of starting from a blank page.

**Acceptance criteria:**
1. **GitHub App Connection:** User connects their GitHub account using a dedicated Cortex GitHub App. The app enforces **read-only access** and permits the user to authorize only specific repositories.
2. **Local-first Degradation Toggle:** In Settings, a user can toggle **Stage 2 LLM verification**. 
   - *Default (Opt-in):* High-precision matching using Groq to verify relevance and write a one-sentence matching reason.
   - *Local-only (Opt-out):* Degrades gracefully to Stage 1 matching only (TF-IDF keyword matches computed entirely inside a Web Worker), meaning zero note snippets or repository metadata ever leave the local machine.
3. **Visual Bundles:** Each indexed repo produces one bundle node in the Consciousness Tab, using the same visual treatment as existing notes and whiteboards.
4. **Non-Intrusive Gutter/Sidebar Nudges:** While typing in any editor, if the current paragraph is semantically close to an indexed repo bundle, NEO surfaces a passive, non-blocking nudge badge. To prevent layout shifts, nudges are rendered either in the editor's gutter or directly in the NEO Sidebar—**never** inline.
5. **Teleportation:** Clicking the nudge teleports the user to the repo bundle detail view (reusing the existing alarm-teleport pattern: scroll + cyan pulse).
6. **Encrypted Credentials:** GitHub installation tokens are encrypted using the vault’s AES-GCM model and are wiped from memory on auto-lock, idle timeout, or tab close.
7. **GraphQL Indexing:** Repository syncing uses batched GraphQL queries to respect rate limits. Syncing is manual by default.

---

## 4. Architecture Overview

Five stages, mapping onto Cortex's local-first architecture and incorporating the red-team safeguards:

```
GitHub App Installation
        │  Selects specific repos with read-only scopes
        ▼
Scraper & Scrubbing     → Batched GraphQL query pulls README, manifests, tree, and last 20 commits
        │  Local regex pre-filter scrubs API keys and secrets
        ▼
Summarization pass       → Groq Llama 3.3 70B condenses into a Repo Bundle
        │  (Skipped if the user has opted out of cloud inference)
        ▼
Consciousness Bundle     → Saved as "repo_bundle" nodeType, stored in IndexedDB/localStorage
        │
        ▼
Live recall loop (while typing)
  1. Active document changes are debounced (1200ms).
  2. Web Worker runs a local TF-IDF matching pass against repo keywords.
  3. If score > threshold:
     ├─ If Stage 2 enabled: Groq verifies relevance and generates a one-sentence reason.
     └─ If Stage 2 disabled: Graceful degradation directly to Stage 1.
  4. NEO renders a nudge badge in the sidebar or editor gutter (no layout shifts).
  5. Click → teleport to repo bundle view.
```

---

## 5. Data Schema

### 5.1 `RepoConnection` (stored in encrypted vault settings)

```ts
interface RepoConnection {
  id: string;                     // uuid
  provider: "github";
  accountLogin: string;           // GitHub username/org
  installationId: string;         // GitHub App installation ID
  encryptedToken: string;         // AES-GCM encrypted temporary installation token
  tokenExpiresAt: string;         // ISO timestamp
  connectedAt: string;            // ISO timestamp
  selectedRepoIds: string[];      // Repos the user opted into indexing
  autoSync: boolean;              // default false
}
```

### 5.2 `RepoBundle` (the consciousness-tab node)

```ts
interface RepoBundle {
  id: string;                     // uuid, stable across re-syncs
  source: "github";
  repoFullName: string;           // e.g. "user/llm-finetune-experiments"
  repoUrl: string;
  visibility: "public" | "private";
  defaultBranch: string;

  // LLM-condensed content — matched against active notes
  summary: string;                // ~150-250 words, plain language description
  keywords: string[];             // Extracted stack/domain terms for Web Worker TF-IDF
  techStack: string[];            // Inferred from manifests (e.g. ["python", "pytorch", "lora"])

  // Raw references for expansion/citations
  readmeExcerpt: string;          // Truncated README
  notableCommits: {
    sha: string;
    message: string;
    date: string;
  }[];                            // Curated last 20 commit messages (scrubbed)
  manifestSnippets: Record<string, string>; // e.g. { "package.json": "..." }

  lastCommitDate: string;
  lastIndexedAt: string;
  fileCount: number;
  primaryLanguage: string;

  // Graph integration
  graphNodeId: string;            // Matches node id in graph.json
  relatedNodeIds: string[];       // Notes/whiteboards linked to this bundle
}
```

---

## 6. Component-Level Plan

### 6.1 `GitHubConnector.ts` (New)
- Interacts with the GitHub App installation flow.
- Lists authorized repos via `/installations/{installation_id}/repositories`.
- Automatically requests installation access tokens using JWT auth on the backend.
- Wipes tokens from React state on auto-lock, visibility hidden, or `beforeunload` events.

### 6.2 `RepoScraper.ts` (New)
Per selected repo, on manual sync:
1. **GraphQL Ingestion:** Queries the GitHub GraphQL API to fetch the README content, the last 20 commits (message and date), the top-level tree hierarchy (depth <= 2, filtering out `node_modules`, `.git`, etc.), and root manifest files (`package.json`, `Cargo.toml`, etc.) in a single network round-trip.
2. **Secret Scrubbing:** Runs a local, client-side regex check on all scraped content to search for API keys, passwords, or authentication tokens. Any matched strings are replaced with `[REDACTED]` prior to storage or API transmission.

### 6.3 `BundleSummarizer.ts` (New)
- If Stage 2 is enabled, packages the scrubbed scraper payload and sends a single Groq Llama 3.3 70B call (30s timeout) to generate the `summary`, `keywords`, and `techStack`.
- If Stage 2 is disabled, falls back to a **local keyword compiler** that extracts keywords from manifests and files using local parsing, skipping the Groq summarization stage.

### 6.4 `RepoBundleStore.ts` (New)
- Saves `RepoBundle[]` to IndexedDB or the synced Supabase tables depending on session auth.
- Injects bundles as nodes in the Consciousness Graph with the custom type `repo_bundle`.

### 6.5 `RecallEngine.worker.ts` (New — Background Similarity Engine)
- To prevent main-thread editor lag (blocking typing interactions), the similarity logic runs entirely inside a Web Worker.
- On active document debounce ticks (1200ms):
  1. Computes local **TF-IDF / BM25** weights for keywords in the document.
  2. Compares them against all `RepoBundle.keywords`.
  3. If the score exceeds the dynamic sensitivity threshold:
     - **Stage 2 Active:** Queries `/api/chat` to have Groq verify the relevance of the note against the candidate's repository summary and generate a one-sentence reason.
     - **Stage 2 Inactive:** Gracefully bypasses Groq and immediately posts a Stage-1-only match back to the main thread.

### 6.6 NEO Sidebar & Gutter Nudge UI
- Nudges are **never** rendered inline within the editor's text area to prevent layout jumps.
- Instead, nudges appear as:
  - An entry in a new "Recall Alerts" panel inside the **NEO Sidebar** ([AICopilot.tsx](file:///Users/arnavsinghal/BRAIN/antigravity/src/components/AICopilot.tsx)).
  - A subtle gutter marker next to the triggering line in the editor (reusing the CyberTooltip component for hover information).
- Clicking the nudge teleports the user to the repo bundle detail view in the Consciousness Tab.

### 6.7 Consciousness Tab Updates
- Renders `repo_bundle` nodes in the force-directed SVG/Canvas graph using a dedicated styling treatment (GitHub icon, red/cyan accent link lines).
- Implements a repository bundle detail screen showing the summary, notable commits, tech stack, and reciprocal notes links.

---

## 7. Security & Privacy Safeguards

- **Scope Reduction:** We request read-only access to selected repositories. The application has no ability to write commits, delete files, or access unselected repositories.
- **Credential Lifecycle:** Encrypted tokens are stored using the same PBKDF2/AES-GCM pipeline as the existing vault. Decrypted tokens are never written to disk and are automatically wiped from RAM upon session timeout.
- **Local Secret Filter:** A regex-based pre-filter runs client-side to strip secrets from scraped READMEs, manifests, and commit logs before sending them to the Groq API.
- **Privacy Disclosures:** Users are presented with a clear warning explaining what data goes to Groq for summaries and verification, with a clear one-click toggle to remain 100% local (Stage-1-only matching).

---

## 8. Rollout Plan

- **Phase 1 (MVP):** GitHub App installation + single repo manual sync. Scrubbing, GraphQL querying, and Groq-based bundle summarization. Visible in the Consciousness graph.
- **Phase 2 (Recall Worker):** Implement the Web Worker for background TF-IDF matching. Wire up the local-only degradation toggle. Render non-intrusive gutter and NEO sidebar alerts.
- **Phase 3 (Precision & Polish):** Enable Stage 2 LLM confirmation for opt-in users. Add nudge suppression, rate-limiting queues, and telemetry controls.
- **Phase 4 (Stretch):** Integrate local Ollama endpoints as a private Stage 2 alternative.
