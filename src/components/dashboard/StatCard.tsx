// src/components/dashboard/StatCard.tsx
"use client";

import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  badge?: string;
  iconClassName?: string;
};

export default function StatCard({
  icon,
  label,
  value,
  badge,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-soft transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      <div className="flex items-start justify-between">
        <div
          className={[
            "flex h-9 w-9 items-center justify-center rounded-xl text-sm",
            iconClassName ?? "bg-slate-100 text-slate-700",
          ].join(" ")}
        >
          {icon}
        </div>

        {badge && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
          {value}
        </div>
      </div>
    </div>
  );
}
