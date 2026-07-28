import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { auth } from '@clerk/nextjs/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';
import { voiceIntentPayloadSchema, sanitizeInputText } from '@/lib/validation';
import { securityLog } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // 1. Authentication Check
    const { userId } = await auth();
    if (!userId) {
      securityLog({
        event: 'UNAUTHORIZED_ACCESS',
        path: '/api/voice-intent',
        message: 'Unauthenticated attempt to access voice-intent API',
      });
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Rate Limiting Check (30 requests per minute)
    const rateLimit = checkRateLimit(req, '/api/voice-intent', 30, 60_000, userId);
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit);
    }

    // 3. Payload & Schema Validation
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = voiceIntentPayloadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      securityLog({
        event: 'INVALID_INPUT',
        path: '/api/voice-intent',
        userId,
        details: { errors: parseResult.error.format() },
        message: 'Invalid payload structure sent to voice-intent API',
      });
      return new Response(
        JSON.stringify({
          error: 'Invalid Request Payload',
          details: parseResult.error.issues.map((i) => i.message),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { text, availableLedgers, currentTime } = parseResult.data;
    const sanitizedText = sanitizeInputText(text, 5000);
    const sanitizedLedgers = (availableLedgers || []).map((l) => sanitizeInputText(l, 255)).filter(Boolean);
    const sanitizedTime = sanitizeInputText(currentTime || new Date().toISOString(), 100);

    // 4. Execute AI Generation
    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: `You are Cortex's unified Speech and Intent Router.
The user has dictated voice or typed natural language. Your job is to classify their intent, correct any speech-to-text typos semantically, and parse the data.

Client's current local time is: ${sanitizedTime}.

Classify the input into one of these three intents:
1. "log_expense": If the user is trying to record financial transactions, expenditures, or budget logs (e.g. "spent 40 on food", "log 500 dollars for rent in Q2").
2. "schedule_reminder": If the user wants to set a temporal reminder, alert, or task event at a specific time/date (e.g. "remind me to review API response logs tomorrow at 4 PM", "alert me on June 15th to check backups").
3. "general_text": If the input is standard text, dictation, or notes and does not explicitly log a financial expense or schedule a future reminder.

---

RULES FOR "log_expense":
- Available ledgers: ${sanitizedLedgers.length > 0 ? sanitizedLedgers.join(', ') : 'None'}.
- Extract "filename" (e.g. "Q2_Finance.csv" or "UNKNOWN" if no file is mentioned. Do not guess filenames!).
- Extract "amount" as a raw number string.
- Extract "category" (e.g., "Food", "Rent").
- Set isLogEvent to true.

RULES FOR "schedule_reminder":
- Extract "task" (e.g., "Review API response logs" or "Call John"). Clean out "remind me to" or alert prefixes.
- Resolve "dateTime" into a strict ISO 8601 string (e.g., "2026-05-28T16:00:00").
- Use the client's current local time (${sanitizedTime}) to calculate relative times precisely.
- Extract "formattedDate" as a clean human-readable date/time string (e.g., "May 28, 4:00 PM").
- Set isTemporalEvent to true.

RULES FOR "general_text":
- Correct any obvious spelling, grammar, or punctuation errors from the Speech-to-Text transcript.
- Return the polished dictation string in the "text" property.

---

RESPOND STRICTLY WITH ONLY VALID JSON. Do not include any reasoning, markdown formatting, or HTML.
Respond in this exact JSON format depending on the classified intent:

If intent is "log_expense":
{
  "intent": "log_expense",
  "isLogEvent": true,
  "filename": "Q2_Finance.csv",
  "amount": "40",
  "category": "Food"
}

If intent is "schedule_reminder":
{
  "intent": "schedule_reminder",
  "isTemporalEvent": true,
  "task": "Review API response logs",
  "dateTime": "2026-05-28T16:00:00",
  "formattedDate": "May 28, 4:00 PM"
}

If intent is "general_text":
{
  "intent": "general_text",
  "text": "The corrected and punctuated text goes here."
}

Parse this input: "${sanitizedText}"`,
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
      path: '/api/voice-intent',
      details: { errorMessage: error?.message },
      message: 'Unexpected error in voice intent route handler',
    });

    return new Response(JSON.stringify({ error: 'Failed to process voice input.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
