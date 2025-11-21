"use client";

import {
  CheckCircle2,
  Users,
  Zap,
  Star,
  X,
  Video,
} from "lucide-react";

type LiveCAModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LiveCAModal({ open, onClose }: LiveCAModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* card */}
      <div className="relative w-full max-w-2xl rounded-[26px] bg-white shadow-[0_28px_70px_rgba(15,23,42,0.55)]">
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-8 pb-7 pt-7">
          {/* header */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB8CF] via-[#FF9FBC] to-[#FF8AC3] text-white shadow-[0_10px_26px_rgba(248,113,165,0.45)]">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">LiveCA</h2>
              <p className="mt-1 text-xs text-slate-500">
                Live streaming and video conferencing solution
              </p>
            </div>
          </div>

          {/* plan card */}
          <div className="mt-6 rounded-[22px] border border-[#E4D5FF] bg-gradient-to-r from-[#E8ECFF] via-[#F5E6FF] to-[#FFE9F4] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-600">
                  Professional Plan
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-slate-900">
                    $249
                  </span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-600">
                  <PlanItem icon={<Users className="h-3.5 w-3.5" />}>
                    Up to 50 users
                  </PlanItem>
                  <PlanItem icon={<Zap className="h-3.5 w-3.5" />}>
                    Premium features
                  </PlanItem>
                  <PlanItem icon={<Star className="h-3.5 w-3.5" />}>
                    Priority support
                  </PlanItem>
                </div>
              </div>
              <span className="mt-1 rounded-full bg-[#00C26A] px-4 py-[5px] text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.55)]">
                15-day Free Trial
              </span>
            </div>
          </div>

          {/* divider */}
          <div className="my-6 h-px w-full bg-slate-200" />

          {/* what's included */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 text-xs font-semibold text-slate-800">
                What&apos;s Included
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <Feature text="HD video streaming" />
                <Feature text="Recording capabilities" />
                <Feature text="Breakout rooms" />
              </ul>
            </div>
            <div className="md:mt-6">
              <ul className="space-y-2 text-xs text-slate-600">
                <Feature text="Screen sharing" />
                <Feature text="Up to 500 participants" />
                <Feature text="Analytics & insights" />
              </ul>
            </div>
          </div>

          {/* metrics */}
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <MetricCard label="Active Users" value="12K+" />
            <MetricCard label="Rating" value="4.8" />
            <MetricCard label="Uptime" value="99.9%" />
          </div>

          {/* buttons */}
          <div className="mt-7 flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 md:flex-none md:min-w-[130px]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-10 flex-1 rounded-lg bg-gradient-to-r from-[#325DFF] to-[#7B3CFF] px-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(58,104,255,0.65)] hover:brightness-110 md:flex-none md:min-w-[210px]"
            >
              Start 15-day Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-slate-500">{icon}</span>
      <span>{children}</span>
    </span>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-[#00C26A]" />
      <span>{text}</span>
    </li>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-6 py-4 text-center shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
      <div className="text-lg font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-[11px] text-slate-500">{label}</div>
    </div>
  );
}
