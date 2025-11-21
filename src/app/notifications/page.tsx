"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Activity,
  Clock,
  Trash2,
  Check,
} from "lucide-react";

export default function NotificationsPage() {
  // Managing state for the active tab
  const [activeTab, setActiveTab] = useState("notifications");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FB] dark:bg-slate-950">
      {/* Left navigation */}
      <Sidebar />

      {/* Right content area */}
      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f5f7ff] to-[#edf3ff] px-6 py-6 dark:from-slate-900 dark:to-slate-950 md:px-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Notifications Center
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Stay updated with all your system activities and alerts.
              </p>
            </div>

            {/* Mark all / clear all buttons */}
            <div className="hidden gap-3 md:flex">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Check className="h-4 w-4 text-emerald-500" />
                Mark All Read
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="h-4 w-4 text-rose-500" />
                Clear All
              </button>
            </div>
          </div>

          {/* Stat cards row */}
          <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Bell className="h-5 w-5 text-[#2563EB]" />}
              iconBg="bg-[#E0ECFF]"
              title="Unread"
              value="3"
            />
            <StatCard
              icon={<AlertTriangle className="h-5 w-5 text-[#F97316]" />}
              iconBg="bg-[#FFE7C7]"
              title="Alerts"
              value="2"
            />
            <StatCard
              icon={<CheckCircle className="h-5 w-5 text-[#22C55E]" />}
              iconBg="bg-[#CCFBE5]"
              title="System Health"
              value="Good"
            />
            <StatCard
              icon={<Activity className="h-5 w-5 text-[#A855F7]" />}
              iconBg="bg-[#E9D5FF]"
              title="Today&apos;s Activity"
              value="23"
            />
          </section>

          {/* Tabs + actions row */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            {/* Tab group */}
            <div className="inline-flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => handleTabClick("notifications")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${
                  activeTab === "notifications"
                    ? "bg-white text-[#5B21FF] shadow-sm dark:bg-slate-900"
                    : "text-slate-500 dark:text-slate-300"
                }`}
              >
                <span>Notifications</span>
                <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#F97373] text-[10px] font-semibold text-white">
                  3
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleTabClick("activityLog")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                  activeTab === "activityLog"
                    ? "bg-white text-[#5B21FF] shadow-sm dark:bg-slate-900"
                    : "text-slate-500 dark:text-slate-300"
                }`}
              >
                Activity Log
              </button>
              <button
                type="button"
                onClick={() => handleTabClick("systemAlerts")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                  activeTab === "systemAlerts"
                    ? "bg-white text-[#5B21FF] shadow-sm dark:bg-slate-900"
                    : "text-slate-500 dark:text-slate-300"
                }`}
              >
                System Alerts
              </button>
            </div>

            {/* Buttons on small screens */}
            <div className="flex gap-3 md:hidden">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Check className="h-4 w-4 text-emerald-500" />
                Mark All Read
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="h-4 w-4 text-rose-500" />
                Clear All
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "notifications" && (
            <section className="mt-6 rounded-2xl border border-slate-100 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
              <div className="border-b border-slate-100 px-6 pt-5 pb-3 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  All Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Recent updates and alerts from your ecosystem
                </p>
              </div>

              {/* Rows */}
              <div className="space-y-3 px-3 pb-5 pt-3">
                <NotificationRow
                  color="bg-orange-100"
                  iconColor="text-orange-500"
                  title="Trial Ending Soon"
                  description="Your QR Generator trial expires in 5 days"
                  time="10 minutes ago"
                />
                <NotificationRow
                  color="bg-green-100"
                  iconColor="text-green-600"
                  title="New Team Member Added"
                  description="Sarah Johnson joined your team as Admin"
                  time="1 hour ago"
                />
                <NotificationRow
                  color="bg-indigo-100"
                  iconColor="text-indigo-600"
                  title="Usage Report Available"
                  description="Your monthly usage report for October is ready"
                  time="2 hours ago"
                />
                <NotificationRow
                  color="bg-emerald-100"
                  iconColor="text-emerald-600"
                  title="Payment Successful"
                  description="Invoice INV-2025-10 paid successfully ($1,046)"
                  time="3 hours ago"
                  showStatus={false}
                />
                <NotificationRow
                  color="bg-purple-100"
                  iconColor="text-purple-600"
                  title="System Update"
                  description="New features added to HireX module"
                  time="5 hours ago"
                  showStatus={false}
                />
                <NotificationRow
                  color="bg-sky-100"
                  iconColor="text-sky-600"
                  title="Integration Suggestion"
                  description="Connect HireX to your Website Builder"
                  time="1 day ago"
                  showStatus={false}
                />
                <NotificationRow
                  color="bg-pink-100"
                  iconColor="text-pink-600"
                  title="Milestone Achieved"
                  description="Your team reached 100 job postings!"
                  time="2 days ago"
                  showStatus={false}
                />
              </div>
            </section>
          )}

          {activeTab === "activityLog" && (
            <section className="mt-6 rounded-2xl border border-slate-100 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
              <div className="border-b border-slate-100 px-6 pt-5 pb-3 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Activity Log
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Recent actions performed by team members
                </p>
              </div>

              <div className="space-y-3 px-3 pb-5 pt-3">
                <ActivityLogRow
                  color="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Mike Chen"
                  description="Updated permissions for Manager role"
                  time="30 minutes ago"
                />
                <ActivityLogRow
                  color="bg-green-100"
                  iconColor="text-green-600"
                  title="Emma Davis"
                  description="Created new job posting"
                  time="1 hour ago"
                />
                <ActivityLogRow
                  color="bg-indigo-100"
                  iconColor="text-indigo-600"
                  title="James Wilson"
                  description="Exported analytics report"
                  time="2 hours ago"
                />
                 <ActivityLogRow
                  color="bg-indigo-100"
                  iconColor="text-indigo-600"
                  title="Admin User"
                  description="Added payment method"
                  time="3 hours ago"
                />
                   <ActivityLogRow
                  color="bg-indigo-100"
                  iconColor="text-indigo-600"
                  title="Lisa Anderson"
                  description="Updated product inventory"
                  time="4 hours ago"
                />
              </div>
            </section>
          )}

          {activeTab === "systemAlerts" && (
            <section className="mt-6 rounded-2xl border border-slate-100 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
              <div className="border-b border-slate-100 px-6 pt-5 pb-3 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  System Alerts
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  System status and maintenance notifications
                </p>
              </div>

              <div className="space-y-3 px-3 pb-5 pt-3">
                <AlertRow
                  color="bg-blue-100"
                  iconColor="text-blue-600"
                  status="Normal"
                  description="All systems operational"
                  time="Just now"
                />
                <AlertRow
                  color="bg-green-100"
                  iconColor="text-green-600"
                  status="Completed"
                  description="Backup completed successfully"
                  time="2 hours ago"
                />
                <AlertRow
                  color="bg-orange-100"
                  iconColor="text-orange-600"
                  status="Scheduled"
                  description="Scheduled maintenance on Nov 5"
                  time="1 day ago"
                />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

interface StatCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  value: string;
}

const StatCard = ({ icon, iconBg, title, value }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full flex-col items-start justify-between">
        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
          {value}
        </p>
      </div>
    </div>
  );
};

/* ---------- Activity Log Row ---------- */

interface ActivityLogRowProps {
  color: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

// helper to decide the pill label based on the title,
// so you don't have to change your existing ActivityLogRow calls
const getActivityTag = (title: string): string | null => {
  switch (title) {
    case "Mike Chen":
      return "Role Management";
    case "Emma Davis":
      return "Job Portal";
    case "James Wilson":
      return "Analytics";
    case "Admin User":
      return "Billing";
    case "Lisa Anderson":
      return "Jewellery E-Com";
    default:
      return null;
  }
};

const ActivityLogRow = ({
  color, // currently unused but kept so the props don't change
  iconColor, // same here
  title,
  description,
  time,
}: ActivityLogRowProps) => {
  const tag = getActivityTag(title);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </span>
          {tag && (
            <span className="rounded-full bg-[#EEF2FF] px-3 py-0.5 text-xs font-medium text-[#4F46E5]">
              {tag}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock size={12} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- System Alerts Row ---------- */

interface AlertRowProps {
  color: string;
  iconColor: string;
  status: string;
  description: string;
  time: string;
}

const AlertRow = ({
  color,
  iconColor,
  status,
  description,
  time,
}: AlertRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
        >
          <CheckCircle className={iconColor} size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {status}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Notification Row ---------- */

interface NotificationRowProps {
  color: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  showStatus?: boolean;
}

const NotificationRow = ({
  color,
  iconColor,
  title,
  description,
  time,
  showStatus = true,
}: NotificationRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
        >
          <AlertTriangle className={iconColor} size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showStatus ? (
          <>
            <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100">
              <Check size={14} />
              <span>Mark Read</span>
            </button>
            <button className="text-rose-500 hover:text-rose-600">
              <Trash2 size={16} />
            </button>
            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
          </>
        ) : (
          <button className="text-rose-500 hover:text-rose-600">
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
