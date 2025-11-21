// src/components/subscriptions/SubStatCard.tsx
"use client";

import { ReactNode } from "react";

type SubStatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  note?: string;
  noteClassName?: string;
};

export default function SubStatCard({
  icon,
  label,
  value,
  note,
  noteClassName,
}: SubStatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-soft transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
          {value}
        </div>
        {note && (
          <div
            className={[
              "mt-1 text-xs",
              noteClassName ?? "text-slate-500 dark:text-slate-400",
            ].join(" ")}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
