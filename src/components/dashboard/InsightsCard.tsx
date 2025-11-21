// src/components/dashboard/InsightsCard.tsx
"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type InsightItem = {
  title: string;
  description: string;
  cta?: string;
};

type InsightsCardProps = {
  title?: string;
  subtitle?: string;
  items?: InsightItem[];
};

export default function InsightsCard({
  title = "AI-Generated Insights",
  subtitle = "Smart suggestions to optimize your Osperra ecosystem",
  items,
}: InsightsCardProps) {
  const data: InsightItem[] =
    items ??
    [
      {
        title: "Connect HireX to Website Builder",
        description:
          "Add hiring forms directly to your website for seamless recruitment",
        cta: "Set up integration",
      },
      {
        title: "QR Generator trial ending soon",
        description: "Your trial ends in 5 days. Subscribe now to maintain access",
        cta: "Subscribe now",
      },
      {
        title: "Team productivity up 23%",
        description:
          "Your team is crushing it! Consider expanding to more modules",
        cta: "View analytics",
      },
    ];

  return (
    <div className="rounded-[32px] border border-violet-100 bg-[#F5EDFF] px-6 py-5 shadow-soft transition-colors dark:border-violet-700/60 dark:bg-[radial-gradient(circle_at_top,_#4C1D95,_#020617)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-violet-900 dark:text-violet-100">
          {title}
        </h2>
        <p className="mt-1 text-xs text-violet-700/90 dark:text-violet-200/80">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {data.map(item => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-xs text-slate-700 shadow-sm dark:bg-slate-900/60 dark:text-slate-100"
          >
            <div>
              <div className="font-medium">{item.title}</div>
              <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {item.description}
              </div>
            </div>
            {item.cta && (
              <button className="ml-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#7C3AED] hover:text-[#9F67FF] dark:text-violet-300 dark:hover:text-violet-200">
                {item.cta}
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
