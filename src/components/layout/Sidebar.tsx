"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2x2,
  CreditCard,
  Users,
  BarChart3,
  Bell,
  MessageCircle,
  ShoppingBag,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Grid2x2, href: "/" },
  { label: "Subscriptions", icon: CreditCard, href: "/subscriptions" },
  { label: "Roles & Access", icon: Users, href: "/roles-access" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Notifications", icon: Bell, href: "/notifications " },
  { label: "Social Hub", icon: MessageCircle, href: "#" },
  { label: "Osperra Store", icon: ShoppingBag, href: "#" },
  // 🔧 FIXED: point Developer Chat to the real route
  { label: "Developer Chat", icon: MessageCircle, href: "/developer-chat" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex min-h-screen w-64 flex-shrink-0 flex-col border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B7CFF] to-[#6A5CFF] text-white shadow-[0_8px_20px_rgba(59,124,255,0.35)]">
          <span className="text-xl font-bold">S</span>
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            Osperra
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            SaaS Ecosystem
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="px-4 pt-5">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-gradient-to-r from-[#3A7BFF] to-[#6B59FF] text-white shadow-[0_8px_24px_rgba(59,124,255,0.30)]"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-lg border",
                    active
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom button */}
      <div className="mt-auto px-4 pb-4 pt-2">
        <button className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 hover:bg-slate-100 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">
          Manage cookies or opt out
        </button>
      </div>
    </aside>
  );
}
