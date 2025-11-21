// src/app/roles-access/page.tsx
"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Users,
  Activity,
  Plus,
  Shield,
  Pencil,
  Trash2,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/roles/Statcard";

type TabId = "roles" | "team" | "permissions";

type Role = {
  name: string;
  users: number;
  accessPercent: number;
  iconBg: string;
  iconColor: string;
};

const roles: Role[] = [
  {
    name: "Super Admin",
    users: 2,
    accessPercent: 100,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    name: "Admin",
    users: 5,
    accessPercent: 85,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-700",
  },
  {
    name: "Manager",
    users: 12,
    accessPercent: 60,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    name: "Developer",
    users: 8,
    accessPercent: 75,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    name: "User",
    users: 20,
    accessPercent: 40,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

export default function RolesAccessPage() {
  const [activeTab, setActiveTab] = useState<TabId>("roles");

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* topbar */}
        <TopBar />

        {/* main */}
        <main className="flex-1 overflow-y-auto px-8 py-6 bg-gradient-to-b from-[#f4f7ff] to-[#e5edff] dark:from-[#050814] dark:to-[#020617]">
          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Roles &amp; Access Management
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Define roles and assign granular permissions across all Osperra
                applications.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.5)] hover:brightness-110">
              <Plus className="h-4 w-4" />
              Create Role
            </button>
          </div>

          {/* stat cards */}
          <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
              label="Total Roles"
              value="5"
            />
            <StatCard
              icon={<Users className="h-5 w-5 text-purple-600" />}
              label="Team Members"
              value="47"
            />
            <StatCard
              icon={<Activity className="h-5 w-5 text-emerald-600" />}
              label="Active Sessions"
              value="34"
            />
          </section>

          {/* tabs */}
          <section className="mt-10">
            <div className="flex gap-2 rounded-t-2xl border-b border-slate-200 bg-white/70 px-4 pt-3 dark:border-slate-800 dark:bg-slate-900/70">
              {[
                { id: "roles", label: "Roles" },
                { id: "team", label: "Team Members" },
                { id: "permissions", label: "Permissions" },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={[
                    "rounded-t-xl px-4 py-2 text-xs font-semibold transition-colors",
                    activeTab === tab.id
                      ? "bg-white text-slate-900 shadow-[0_6px_14px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:text-slate-50"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* tab content container */}
            <div className="rounded-b-2xl rounded-tr-2xl bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:bg-slate-900/80 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
              {activeTab === "roles" && <RolesOverview />}
              {activeTab === "team" && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Team members view coming soon…
                </div>
              )}
              {activeTab === "permissions" && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Permissions matrix coming soon…
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ================= ROLES OVERVIEW ================= */

function RolesOverview() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Roles Overview
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Manage and configure user roles
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {roles.map(role => (
          <RoleCard key={role.name} role={role} />
        ))}
      </div>
    </div>
  );
}

type RoleCardProps = {
  role: Role;
};

function RoleCard({ role }: RoleCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* top row */}
      <div className="flex items-start justify-between gap-3">
        {/* left: icon + name */}
        <div className="flex items-center gap-3">
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-xl",
              role.iconBg,
            ].join(" ")}
          >
            <Shield className={["h-5 w-5", role.iconColor].join(" ")} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {role.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {role.users} {role.users === 1 ? "user" : "users"}
            </p>
          </div>
        </div>

        {/* right: edit / delete + access pill */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md p-1 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-[2px] text-[11px] font-semibold text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
            {role.accessPercent}% access
          </span>
        </div>
      </div>

      {/* bottom: configure button */}
      <div className="mt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Configure
        </button>
      </div>
    </div>
  );
}
