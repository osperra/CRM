// src/app/api/grok-chat/route.ts
import { NextResponse } from "next/server";

const XAI_API_URL = "https://api.x.ai/v1/chat/completions";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try { 
    const body = await req.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing 'messages' array in request body" },
        { status: 400 }
      );
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error("XAI_API_KEY is not set");
      return NextResponse.json(
        { error: "Server misconfigured: missing XAI_API_KEY env var" },
        { status: 500 }
      );
    }

    const res = await fetch(XAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4",
        stream: false,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      // Try to get detailed error from xAI
      let errorBody: unknown;
      try {
        errorBody = await res.json();
      } catch {
        errorBody = await res.text();
      }

      console.error("xAI error:", res.status, errorBody);

      return NextResponse.json(
        {
          error: `Grok API error ${res.status}: ${
            typeof errorBody === "string"
              ? errorBody
              : JSON.stringify(errorBody)
          }`,
        },
        { status: res.status }
      );
    }

    const json = await res.json();

    const reply =
      json?.choices?.[0]?.message?.content ??
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Grok chat route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error in grok-chat route" },
      { status: 500 }
    );
  }
}
