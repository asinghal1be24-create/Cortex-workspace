import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { text, availableLedgers } = await req.json();

    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'), 
      prompt: `You are Cortex's Data Bridge router. 
The user is typing natural language to log an expense or data point.
Your job is to extract the target filename, the amount (as a raw number string without currency symbols), and the category.
Available ledgers: ${availableLedgers.join(', ')}.

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

Parse this log entry: "${text}"`,
    });

    // Strip out markdown code blocks if the AI includes them
    let jsonString = result.text.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const payload = JSON.parse(jsonString);
    return Response.json(payload);
  } catch (error: any) {
    console.error("[Cortex AI Bridge Error]", error);
    return Response.json({ error: error.message || "Failed to parse bridge command." }, { status: 500 });
  }
}
