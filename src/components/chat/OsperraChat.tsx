"use client";

import { useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { useChatUI } from "@/context/ChatUIContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Show subscription analytics",
  "Which apps need renewal?",
  "Team performance summary",
  "Suggest integrations",
];

export default function OsperraChat() {
  const { isChatOpen, closeChat } = useChatUI();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm Osperra AI. I can help you manage subscriptions, analyze performance, and suggest integrations. What can I do for you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isSending) return;

    const id = crypto.randomUUID();

    const newUserMessage: ChatMessage = {
      id,
      role: "user",
      content,
    };

    const nextMessages = [...messages, newUserMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const payloadMessages = [
        {
          role: "system" as const,
          content:
            "You are Osperra AI, a helpful assistant for a SaaS subscriptions dashboard. Be concise and practical.",
        },
        ...nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ];

      const res = await fetch("/api/grok-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Chat error:", errorText);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, something went wrong talking to Grok.",
          },
        ]);
        return;
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error("Chat fetch failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Network error; I couldn't reach the Grok API. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-full max-h-screen w-full max-w-sm flex-col border-l border-slate-200 bg-white/90 backdrop-blur transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-900/90
      ${isChatOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Osperra AI
            </span>
            <span className="text-[11px] text-emerald-500">● Online</span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeChat}
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-3 text-[11px] dark:border-slate-800">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSend(s)}
            className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={[
                "max-w-[85%] rounded-2xl px-3 py-2",
                m.role === "user"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
              ].join(" ")}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl bg-slate-100 px-3 py-2 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="border-t border-slate-200 px-3 py-3 dark:border-slate-800"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <input
            className="flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="Ask me anything about your subscriptions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-sm disabled:opacity-40"
          >
            <Send className="h-3 w-3" />
          </button>
        </div>
      </form>
    </div>
  );
}
