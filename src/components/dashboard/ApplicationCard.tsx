import type { ReactNode } from "react";
import { Lock } from "lucide-react";

type Status = "active" | "trial" | "locked";

type ApplicationCardProps = {
  name: string;
  icon: ReactNode;
  status: Status;
  usagePercent?: number;
  activeUsers?: number;
  actionLabel?: string;
  description?: string;
  priceLabel?: string;
  iconBgClassName?: string;
  onClick?: () => void;
};

export default function ApplicationCard({
  name,
  icon,
  status,
  usagePercent = 0,
  activeUsers = 0,
  actionLabel = "Open",
  description,
  priceLabel,
  iconBgClassName = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200",
  onClick,
}: ApplicationCardProps) {
  const isLocked = status === "locked";

  const statusLabel =
    status === "active" ? "Active" : status === "trial" ? "Trial" : "Locked";

  const statusClasses =
    status === "active"
      ? "border-[#B4EEDC] bg-[#E9FFF7] text-[#0A8F64] dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
      : status === "trial"
      ? "border-[#FFD8A8] bg-[#FFF4E5] text-[#C87629] dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
      : "border-slate-400/60 bg-slate-500/20 text-slate-100";

  // 🔒 LOCKED CARD
  if (isLocked) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          relative flex min-h-[200px] w-full flex-col 
          rounded-[24px] 
          bg-gradient-to-br from-[#9aa0ab] via-[#808793] to-[#6b7482]
          px-5 py-4 
          text-left
          shadow-[0_18px_45px_rgba(15,23,42,0.25)]
          overflow-hidden
          backdrop-blur-[3px]
        "
      >
        {/* blurred background content */}
        <div className="pointer-events-none opacity-40 blur-[1px]">
          <div className="text-sm font-semibold text-white">{name}</div>

          {description && (
            <p className="mt-2 max-w-[200px] text-[11px] leading-snug text-white">
              {description}
            </p>
          )}

          {priceLabel && (
            <div className="mt-3 text-xs font-semibold text-white">
              {priceLabel}
            </div>
          )}
        </div>

        {/* center lock icon */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
            <Lock className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>

          <div className="mt-3 text-xs font-semibold text-white">
            Click to Unlock
          </div>
        </div>

        <span className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/10" />
      </button>
    );
  }

  // ✅ NORMAL ACTIVE / TRIAL CARD
  return (
    <div className="flex min-h-[180px] flex-col rounded-[24px] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconBgClassName}`}
          >
            {icon}
          </div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-50">
            {name}
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-[2px] text-[11px] font-semibold ${statusClasses}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Usage</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-100">
            {usagePercent}%
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-slate-900 dark:bg-slate-100"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{activeUsers} active users</span>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-100">
          <span>{actionLabel}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
