// src/app/developer-chat/page.tsx
"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

type SupportCard = {
  label: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
};

const supportCards: SupportCard[] = [
  {
    label: "Open Tickets",
    value: "1",
    icon: <MessageSquare className="h-5 w-5 text-[#2563EB]" />,
    iconBg: "bg-[#E0ECFF]",
  },
  {
    label: "In Progress",
    value: "1",
    icon: <Clock className="h-5 w-5 text-[#D97706]" />,
    iconBg: "bg-[#FFE7C7]",
  },
  {
    label: "Resolved",
    value: "1",
    icon: <CheckCircle2 className="h-5 w-5 text-[#059669]" />,
    iconBg: "bg-[#CFF6E6]",
  },
  {
    label: "Avg Response",
    value: "2.5 hrs",
    icon: <AlertCircle className="h-5 w-5 text-[#8B5CF6]" />,
    iconBg: "bg-[#E4D9FF]",
  },
];

export default function DeveloperSupportPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f5f7ff] to-[#ecf2ff] px-6 py-6 dark:from-[#050814] dark:to-[#020617] md:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Header row */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  Developer Support
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Get instant help from our development team with live chat and
                  ticket support.
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(79,70,229,0.55)] hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                New Ticket
              </button>
            </div>

            {/* Status cards */}
            <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {supportCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-100 bg-white/95 px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_10px_22px_rgba(15,23,42,0.06)] ${card.iconBg}`}
                      >
                        {card.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {card.label}
                        </span>
                        <span className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                          {card.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
