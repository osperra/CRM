// src/app/developer-support/page.tsx
"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  MessageSquare,
  Clock3,
  CheckCircle2,
  Info,
  Paperclip,
  Image,
  Send,
  MessageCircleMore,
} from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved";

interface Ticket {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  product: string;
  status: TicketStatus;
  timeAgo: string;
  comments: number;
}

interface ChatMessage {
  id: number;
  from: "support" | "you";
  name: string;
  time: string;
  text: string;
}

const tickets: Ticket[] = [
  {
    id: "TKT-2025-001",
    title: "Integration issue with HireX API",
    priority: "High",
    product: "HireX",
    status: "Open",
    timeAgo: "2 hours ago",
    comments: 3,
  },
  {
    id: "TKT-2025-002",
    title: "Feature request: Bulk QR code generation",
    priority: "Medium",
    product: "QR Generator",
    status: "In Progress",
    timeAgo: "1 day ago",
    comments: 8,
  },
  {
    id: "TKT-2025-003",
    title: "Bug: Product images not loading",
    priority: "High",
    product: "Jewellery E-Com",
    status: "Resolved",
    timeAgo: "3 days ago",
    comments: 12,
  },
];

const messages: ChatMessage[] = [
  {
    id: 1,
    from: "support",
    name: "Support Team",
    time: "2:30 PM",
    text: "Hello! I've received your ticket regarding the HireX API integration. I'm looking into this now.",
  },
  {
    id: 2,
    from: "you",
    name: "You",
    time: "2:32 PM",
    text: "Thanks! The issue is that candidate data is not syncing properly with our dashboard.",
  },
  {
    id: 3,
    from: "support",
    name: "Support Team",
    time: "2:35 PM",
    text: "I see. Could you share a screenshot of the error you're seeing? Also, which API endpoint are you using?",
  },
  {
    id: 4,
    from: "you",
    name: "You",
    time: "2:38 PM",
    text: "Sure, let me attach that now. We're using /api/v1/candidates/sync.",
  },
  {
    id: 5,
    from: "support",
    name: "Support Team",
    time: "2:45 PM",
    text: "Perfect! I found the issue. There was a recent update that changed the authentication flow. I'll send you updated documentation and a fix.",
  },
];

export default function DeveloperSupportPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Header */}
          <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Developer Support
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Get instant help from our development team with live chat and
                ticket support.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(79,70,229,0.45)] hover:opacity-95"
            >
              <MessageSquare className="h-4 w-4" />
              <span>New Ticket</span>
            </button>
          </section>

          {/* Top stats row */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={MessageSquare}
              iconBg="bg-indigo-500/10 text-indigo-400"
              label="Open Tickets"
              value="1"
              sublabel="Waiting for response"
            />
            <StatCard
              icon={Clock3}
              iconBg="bg-amber-500/10 text-amber-400"
              label="In Progress"
              value="1"
              sublabel="Being investigated"
            />
            <StatCard
              icon={CheckCircle2}
              iconBg="bg-emerald-500/10 text-emerald-400"
              label="Resolved"
              value="1"
              sublabel="Last 7 days"
            />
            <StatCard
              icon={Info}
              iconBg="bg-sky-500/10 text-sky-400"
              label="Avg Response"
              value="2.5 hrs"
              sublabel="Based on last 20 tickets"
            />
          </section>

          {/* Tickets + Chat */}
          <section className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Left: tickets list */}
            <div className="lg:w-[360px] flex-none">
              <div className="rounded-3xl border border-slate-200/70 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/70 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Your Tickets
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                      Recent support requests
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-200/60 dark:divide-slate-800">
                  {tickets.map((ticket) => (
                    <TicketRow key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: chat panel */}
            <div className="flex-1">
              <div className="flex h-[540px] flex-col rounded-3xl border border-slate-200/70 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                {/* Chat header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200/70 px-6 py-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {tickets[0].id}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Integration issue with HireX API
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                      Live chat with support team
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Support Online
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-500">
                      Last message 2:45 PM
                    </span>
                  </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
                  {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                  ))}
                </div>

                {/* Input area */}
                <div className="border-t border-slate-200/70 px-4 py-3 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        <span>Attach</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <Image className="h-3.5 w-3.5" />
                        <span>Screenshot</span>
                      </button>
                    </div>

                    <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs text-slate-700 shadow-inner dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100">
                      <input
                        className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                        placeholder="Type your message..."
                      />
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-md hover:opacity-95"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  label: string;
  value: string;
  sublabel: string;
}

function StatCard({ icon: Icon, iconBg, label, value, sublabel }: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/80 px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-xl font-semibold">{value}</p>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          {sublabel}
        </p>
      </div>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  const statusColors: Record<TicketStatus, string> = {
    Open: "bg-rose-500/10 text-rose-400",
    "In Progress": "bg-amber-500/10 text-amber-400",
    Resolved: "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <button
      type="button"
      className="w-full px-5 py-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/60"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {ticket.id}
          </p>
          <p className="mt-1 text-sm font-medium">{ticket.title}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400">
              {ticket.priority}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {ticket.product}
            </span>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[ticket.status]}`}
            >
              {ticket.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>{ticket.timeAgo}</span>
        <span className="inline-flex items-center gap-1">
          <MessageCircleMore className="h-3 w-3" />
          {ticket.comments}
        </span>
      </div>
    </button>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isYou = message.from === "you";

  return (
    <div className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs shadow-sm ${
          isYou
            ? "rounded-br-md bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
            : "rounded-bl-md bg-slate-900/80 text-slate-50 dark:bg-slate-800/80 dark:text-slate-50 bg-slate-800/90"
        }`}
      >
        <div className="mb-1 flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold opacity-80">
            {message.name}
          </span>
          <span className="text-[10px] opacity-70">{message.time}</span>
        </div>
        <p className="leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
