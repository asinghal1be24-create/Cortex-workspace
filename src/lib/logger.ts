/**
 * logger.ts
 * Centralized Security Audit & Event Logger for Cortex
 * Logs security-relevant events (rate limits, auth failures, validation errors, system errors).
 */

export type SecurityEventType =
  | "AUTH_FAILURE"
  | "RATE_LIMIT_EXCEEDED"
  | "INVALID_INPUT"
  | "PROMPT_INJECTION_ATTEMPT"
  | "UNAUTHORIZED_ACCESS"
  | "SYSTEM_ERROR";

export interface SecurityLogPayload {
  event: SecurityEventType;
  path: string;
  ip?: string;
  userId?: string;
  details?: Record<string, any>;
  message: string;
}

export function securityLog(payload: SecurityLogPayload): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: payload.event === "SYSTEM_ERROR" ? "ERROR" : "WARN",
    ...payload,
  };

  // Structured JSON logging for production monitoring (Vercel/Datadog/CloudWatch)
  console.log(JSON.stringify(logEntry));
}
