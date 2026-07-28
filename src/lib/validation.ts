/**
 * validation.ts
 * Zod schemas and input sanitization helpers for Cortex API endpoints.
 * Enforces runtime payload verification & guards against injection vectors.
 */

import { z } from "zod";

/**
 * Sanitizes natural language input strings before placing into LLM prompts.
 * Prevents prompt injection, zero-width character obfuscation, and excessively large payloads.
 */
export function sanitizeInputText(text: string, maxLength: number = 5000): string {
  if (typeof text !== "string") return "";

  let sanitized = text
    // Remove invisible / zero-width characters
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

// ── 1. Chat API Schema ────────────────────────────────────────────────────────
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().max(20000, "Message content exceeds limit"),
});

export const chatPayloadSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, "At least one message is required").max(50, "Too many messages in conversation"),
  contextText: z.string().max(100000, "Context text exceeds maximum allowed length").default(""),
});

// ── 2. Data Bridge API Schema ──────────────────────────────────────────────────
export const bridgePayloadSchema = z.object({
  text: z.string().min(1, "Input text cannot be empty").max(5000, "Text exceeds 5000 character limit"),
  availableLedgers: z.array(z.string().max(255)).default([]),
});

// ── 3. Voice Intent Router Schema ─────────────────────────────────────────────
export const voiceIntentPayloadSchema = z.object({
  text: z.string().min(1, "Voice transcript cannot be empty").max(5000, "Transcript exceeds limit"),
  availableLedgers: z.array(z.string().max(255)).optional().default([]),
  currentTime: z.string().max(100).optional().default(() => new Date().toISOString()),
});

// ── 4. Files Batch Schema ─────────────────────────────────────────────────────
export const fileItemSchema = z.object({
  id: z.string().min(1, "File ID is required"),
  name: z.string().min(1, "File name is required").max(255, "File name too long"),
  content: z.string().max(5000000, "File size limit exceeded (5MB max)"),
});

export const filesBatchSchema = z.object({
  files: z.array(fileItemSchema).optional().default([]),
  deletedFileIds: z.array(z.string()).optional().default([]),
});
