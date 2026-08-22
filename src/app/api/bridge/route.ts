import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { auth } from '@clerk/nextjs/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';
import { bridgePayloadSchema, sanitizeInputText } from '@/lib/validation';
import { securityLog } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // 1. Authentication Check
    const { userId } = await auth();
    if (!userId) {
      securityLog({
        event: 'UNAUTHORIZED_ACCESS',
        path: '/api/bridge',
        message: 'Unauthenticated attempt to access bridge API',
      });
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Rate Limiting Check (30 requests per minute)
    const rateLimit = checkRateLimit(req, '/api/bridge', 30, 60_000, userId);
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit);
    }

    // 3. Payload & Schema Validation
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = bridgePayloadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      securityLog({
        event: 'INVALID_INPUT',
        path: '/api/bridge',
        userId,
        details: { errors: parseResult.error.format() },
        message: 'Invalid payload structure sent to bridge API',
      });
      return new Response(
        JSON.stringify({
          error: 'Invalid Request Payload',
          details: parseResult.error.issues.map((i) => i.message),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { text, availableLedgers } = parseResult.data;
    const sanitizedText = sanitizeInputText(text, 5000);
    const sanitizedLedgers = availableLedgers.map((l) => sanitizeInputText(l, 255)).filter(Boolean);

    // 4. Execute AI Generation
    const result = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `You are Cortex's Data Bridge router. 
The user is typing natural language to log an expense or data point.
Your job is to extract the target filename, the amount (as a raw number string without currency symbols), and the category.
Available ledgers: ${sanitizedLedgers.join(', ')}.

RULES:
1. If the user explicitly names a ledger (e.g., "in Q2"), use that exact existing filename.
2. If the user DOES NOT mention a file, you MUST set filename to "UNKNOWN". Do not guess!
3. If the text doesn't look like an expense or log, set isLogEvent to false.

RESPOND STRICTLY WITH ONLY VALID JSON in this exact format:
{
  "isLogEvent": true,
  "filename": "UNKNOWN",
  "amount": "40",
  "category": "Food"
}

Parse this log entry: "${sanitizedText}"`,
    });

    let jsonString = result.text.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const payload = JSON.parse(jsonString);
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    securityLog({
      event: 'SYSTEM_ERROR',
      path: '/api/bridge',
      details: { errorMessage: error?.message },
      message: 'Unexpected error in bridge route handler',
    });

    return new Response(JSON.stringify({ error: 'Failed to parse bridge command.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
