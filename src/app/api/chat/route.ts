import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { auth } from '@clerk/nextjs/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';
import { chatPayloadSchema, sanitizeInputText } from '@/lib/validation';
import { securityLog } from '@/lib/logger';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Authentication Check
    const { userId } = await auth();
    if (!userId) {
      securityLog({
        event: 'UNAUTHORIZED_ACCESS',
        path: '/api/chat',
        message: 'Unauthenticated attempt to access chat API',
      });
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Rate Limiting Check (20 requests per minute)
    const rateLimit = checkRateLimit(req, '/api/chat', 20, 60_000, userId || undefined);
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit);
    }

    // 3. Payload & Schema Validation
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = chatPayloadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      securityLog({
        event: 'INVALID_INPUT',
        path: '/api/chat',
        userId: userId || undefined,
        details: { errors: parseResult.error.format() },
        message: 'Invalid payload structure sent to chat API',
      });
      return new Response(
        JSON.stringify({
          error: 'Invalid Request Payload',
          details: parseResult.error.issues.map((i) => i.message),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages, contextText } = parseResult.data;
    const sanitizedContext = sanitizeInputText(contextText, 50000);

    // 4. Execute AI Generation
    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are Neo, a brilliant, context-aware Socratic brainstorming partner. 
Your goal is to help the user ideate, debug, and expand their thoughts. 
DO NOT simply write their notes or code for them. Act as a sounding board, asking guiding questions, offering architectural critiques, and presenting alternative ideas.
You have been provided with the user's current workspace context below. Reference it to be highly relevant, but do not hallucinate file contents that aren't provided.

=== WORKSPACE CONTEXT ===
${sanitizedContext}
=========================`,
      messages,
    });

    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    securityLog({
      event: 'SYSTEM_ERROR',
      path: '/api/chat',
      details: { errorMessage: error?.message },
      message: 'Unexpected error in chat route handler',
    });

    return new Response(JSON.stringify({ error: 'Failed to process chat request.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
