import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { text, availableLedgers } = await req.json();

    const result = await generateObject({
      model: google('gemini-2.5-flash'), // Fast and very capable
      system: `You are Cortex's Data Bridge router. 
The user is typing natural language to log an expense or data point.
Your job is to extract the target filename, the amount (as a number string), and the category.
Available ledgers: ${availableLedgers.join(', ')}.
If the user implies a ledger that exists (e.g., "Q2" -> "Q2_Finance"), use the exact existing filename.
If they imply a new one (e.g., "May expenses"), infer a clean filename like "May_Expenses".
If the text doesn't look like an expense or log entry, set isLogEvent to false.`,
      prompt: `Parse this log entry: "${text}"`,
      schema: z.object({
        isLogEvent: z.boolean().describe('True if this text represents an expense or data log.'),
        filename: z.string().describe('The target CSV filename (without .csv extension).'),
        amount: z.string().describe('The numerical amount to log.'),
        category: z.string().describe('A short, 1-2 word category for this log (e.g., Food, Travel).')
      }),
    });

    return Response.json(result.object);
  } catch (error: any) {
    console.error("[Cortex AI Bridge Error]", error);
    return Response.json({ error: "Failed to parse bridge command." }, { status: 500 });
  }
}
