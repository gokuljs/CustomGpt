import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Stream chat completion using AI SDK 6
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  });

  // Return the stream as a text response
  return result.toTextStreamResponse();
}
