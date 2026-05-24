import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  try {
    const { text, availableLedgers, currentTime } = await req.json();

    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: `You are Cortex's unified Speech and Intent Router.
The user has dictated voice or typed natural language. Your job is to classify their intent, correct any speech-to-text typos semantically, and parse the data.

Client's current local time is: ${currentTime}.

Classify the input into one of these three intents:
1. "log_expense": If the user is trying to record financial transactions, expenditures, or budget logs (e.g. "spent 40 on food", "log 500 dollars for rent in Q2").
2. "schedule_reminder": If the user wants to set a temporal reminder, alert, or task event at a specific time/date (e.g. "remind me to review API response logs tomorrow at 4 PM", "alert me on June 15th to check backups").
3. "general_text": If the input is standard text, dictation, or notes and does not explicitly log a financial expense or schedule a future reminder.

---

RULES FOR "log_expense":
- Available ledgers: ${availableLedgers?.join(', ') || 'None'}.
- Extract "filename" (e.g. "Q2_Finance.csv" or "UNKNOWN" if no file is mentioned. Do not guess filenames!).
- Extract "amount" as a raw number string.
- Extract "category" (e.g., "Food", "Rent").
- Set isLogEvent to true.

RULES FOR "schedule_reminder":
- Extract "task" (e.g., "Review API response logs" or "Call John"). Clean out "remind me to" or alert prefixes.
- Resolve "dateTime" into a strict ISO 8601 string (e.g., "2026-05-28T16:00:00").
- Use the client's current local time (${currentTime}) to calculate relative times precisely (e.g. "tomorrow morning" -> 9:00 AM next day, "in 2 hours" -> add 2 hours to current time).
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

Parse this input: "${text}"`,
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error: any) {
    console.error("[Cortex Voice Intent Router Error]", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process voice input." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}
