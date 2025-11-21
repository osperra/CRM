"use client";

import { Bell, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import { useChatUI } from "@/context/ChatUIContext";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const { toggleChat } = useChatUI();
  const { user } = useUser();

  const isDark = theme === "dark";

  const displayName =
    user?.firstName ||
    user?.username ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "User";

  const email = user?.emailAddresses?.[0]?.emailAddress || "user@example.com";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      {/* LEFT: Search bar */}
      <div className="flex-1">
        <div className="relative max-w-xl">
          <input
            className="w-full rounded-2xl border border-slate-100 bg-[#f8f9ff] px-10 py-2.5 text-sm text-slate-700 shadow-inner outline-none placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#C4B5FD] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="Search apps, modules, or commands..."
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 dark:text-slate-500" />
        </div>
      </div>

      {/* RIGHT side */}
      <div className="ml-4 flex items-center gap-4">
        {/* Osperra AI */}
        <button
          type="button"
          onClick={toggleChat}
          className="flex items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(124,58,237,0.4)] hover:brightness-110"
        >
          <span className="mr-2 rounded-full bg-white/10 px-2 py-1 text-[10px]">
            Osperra AI
          </span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)] hover:brightness-105 transition dark:bg-slate-900 dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-yellow-300" />
          ) : (
            <Moon className="h-4 w-4 text-slate-500" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
          <Bell className="h-4 w-4 text-slate-500 dark:text-slate-200" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-semibold text-white">
            5
          </span>
        </div>

        {/* Signed OUT → Show Sign In button */}
        <SignedOut>
          <SignInButton mode="redirect">
            <button className="rounded-full bg-[#3B7CFF] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Signed IN → Name + Clerk avatar dropdown */}
        <SignedIn>
          <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col mr-1">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                {displayName}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {email}
              </span>
            </div>

            {/* Clerk avatar + menu */}
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
