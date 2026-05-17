import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, contextText } = await req.json();

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are Cortex AI, a brilliant, context-aware Socratic brainstorming partner. 
Your goal is to help the user ideate, debug, and expand their thoughts. 
DO NOT simply write their notes or code for them. Act as a sounding board, asking guiding questions, offering architectural critiques, and presenting alternative ideas.
You have been provided with the user's current workspace context below. Reference it to be highly relevant, but do not hallucinate file contents that aren't provided.

=== WORKSPACE CONTEXT ===
${contextText}
=========================`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("[Cortex Chat Error]", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
