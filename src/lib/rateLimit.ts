/**
 * rateLimit.ts
 * In-memory sliding window rate limiter for Next.js API routes.
 * Throttles requests per IP / User ID to prevent DDoS & API quota depletion.
 */

import { securityLog } from "./logger";

interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, tracker] of rateLimitMap.entries()) {
    if (now > tracker.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks rate limit for a request.
 * @param req The incoming HTTP Request
 * @param routeIdentifier Identifier for the endpoint (e.g. "api/chat")
 * @param limit Max allowed requests in window (default: 30)
 * @param windowMs Window duration in ms (default: 60,000ms / 1 min)
 * @param userId Optional authenticated user ID
 */
export function checkRateLimit(
  req: Request,
  routeIdentifier: string,
  limit: number = 30,
  windowMs: number = 60_000,
  userId?: string
): RateLimitResult {
  const ip = getClientIp(req);
  const identifier = userId ? `user:${userId}` : `ip:${ip}`;
  const key = `${routeIdentifier}:${identifier}`;

  const now = Date.now();
  const tracker = rateLimitMap.get(key);

  if (!tracker || now > tracker.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (tracker.count >= limit) {
    const resetInSeconds = Math.ceil((tracker.resetAt - now) / 1000);
    securityLog({
      event: "RATE_LIMIT_EXCEEDED",
      path: routeIdentifier,
      ip,
      userId,
      details: { limit, count: tracker.count, resetInSeconds },
      message: `Rate limit exceeded on ${routeIdentifier}`,
    });

    return {
      allowed: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  tracker.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - tracker.count,
    resetInSeconds: Math.ceil((tracker.resetAt - now) / 1000),
  };
}

export function createRateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: "Too Many Requests",
      message: `Rate limit exceeded. Please try again in ${result.resetInSeconds} seconds.`,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "Retry-After": result.resetInSeconds.toString(),
      },
    }
  );
}
