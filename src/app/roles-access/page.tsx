// src/app/roles-access/page.tsx
"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Users,
  Activity,
  Plus,
  Shield,
  Trash2,
  Eye,
  Edit3,
  Search,
  FilePenLine,
  X,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/roles/Statcard";

type TabKey = "roles" | "team" | "permissions";

interface RoleCard {
  id: string;
  name: string;
  users: number;
  access: string;
  tone: "red" | "blue" | "indigo" | "purple" | "green";
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  avatarBg: string;
}

interface PermissionModule {
  app: string;
  modules: string[];
}

const roleCards: RoleCard[] = [
  { id: "super-admin", name: "Super Admin", users: 2, access: "100% access", tone: "red" },
  { id: "admin", name: "Admin", users: 5, access: "85% access", tone: "blue" },
  { id: "manager", name: "Manager", users: 12, access: "60% access", tone: "indigo" },
  { id: "developer", name: "Developer", users: 8, access: "75% access", tone: "purple" },
  { id: "user", name: "User", users: 20, access: "40% access", tone: "green" },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@osperra.com",
    role: "Super Admin",
    status: "Active",
    avatarBg: "bg-indigo-500",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@osperra.com",
    role: "Admin",
    status: "Active",
    avatarBg: "bg-sky-500",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@osperra.com",
    role: "Manager",
    status: "Active",
    avatarBg: "bg-pink-500",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james@osperra.com",
    role: "Developer",
    status: "Active",
    avatarBg: "bg-amber-500",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa@osperra.com",
    role: "Manager",
    status: "Active",
    avatarBg: "bg-emerald-500",
  },
  {
    id: 6,
    name: "Tom Martinez",
    email: "tom@osperra.com",
    role: "User",
    status: "Inactive",
    avatarBg: "bg-slate-400",
  },
];

const permissionApps: PermissionModule[] = [
  { app: "Scraawl", modules: ["Documents", "Analytics", "Reports"] },
  { app: "HireX", modules: ["Candidates", "Interviews", "Offers"] },
  { app: "QR Generator", modules: ["Generate", "Analytics"] },
  { app: "Website Builder", modules: ["Editor", "Templates", "Publish"] },
  { app: "Jewellery E-Com", modules: ["Products", "Orders", "Inventory"] },
  { app: "Job Portal", modules: ["Listings", "Applications", "Analytics"] },
];

export default function RolesAccessPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("roles");
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  const handleCreateRole = () => {
    // For now just close modal; hook your API / logic here
    // console.log({ roleName, roleDescription });
    setShowCreateRole(false);
    setRoleName("");
    setRoleDescription("");
  };

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* topbar */}
        <TopBar />

        {/* main */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f4f7ff] to-[#e5edff] px-8 py-6 dark:from-[#050814] dark:to-[#020617]">
          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Roles &amp; Access Management
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Define roles and assign granular permissions across all Osperra applications.
              </p>
            </div>

            <button
              onClick={() => setShowCreateRole(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.5)] hover:brightness-110"
            >
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

          {/* Tabs */}
          <section className="mt-6">
            <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900/80 dark:text-slate-400">
              <TabButton
                label="Roles"
                active={activeTab === "roles"}
                onClick={() => setActiveTab("roles")}
              />
              <TabButton
                label="Team Members"
                active={activeTab === "team"}
                onClick={() => setActiveTab("team")}
              />
              <TabButton
                label="Permissions"
                active={activeTab === "permissions"}
                onClick={() => setActiveTab("permissions")}
              />
            </div>
          </section>

          {/* Tab Content */}
          <section className="mt-6 space-y-6">
            {activeTab === "roles" && <RolesOverview />}
            {activeTab === "team" && <TeamMembersSection />}
            {activeTab === "permissions" && <PermissionsSection />}
          </section>
        </main>

        {/* CREATE ROLE MODAL */}
        {showCreateRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
              {/* Close button */}
              <button
                onClick={() => setShowCreateRole(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Create New Role
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Define a new role with custom permissions
                </p>
              </div>

              <div className="space-y-4">
                {/* Role Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-100">
                    Role Name
                  </label>
                  <input
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g., Content Manager"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/30"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-100">
                    Description
                  </label>
                  <textarea
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    placeholder="Brief description of this role"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleCreateRole}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.5)] hover:brightness-110"
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------- Small components ------------- */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 transition ${
        active
          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-50"
          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ================= ROLES OVERVIEW ================= */

function RolesOverview() {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white px-5 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Roles Overview
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Manage and configure user roles
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleCards.map((role) => (
          <RoleCardItem key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}

function RoleCardItem({ role }: { role: RoleCard }) {
  const toneMap: Record<string, string> = {
    red: "bg-rose-50 text-rose-500",
    blue: "bg-sky-50 text-sky-500",
    indigo: "bg-indigo-50 text-indigo-500",
    purple: "bg-violet-50 text-violet-500",
    green: "bg-emerald-50 text-emerald-500",
  };

  const tone = toneMap[role.tone] || toneMap.indigo;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-indigo-500/40">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-2xl ${tone}`}
        >
          <Shield className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button type="button" className="hover:text-indigo-500">
            <Edit3 className="h-4 w-4" />
          </button>
          <button type="button" className="hover:text-rose-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {role.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {role.users} users
        </p>
        <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          {role.access}
        </span>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-500"
      >
        Configure
      </button>
    </div>
  );
}

/* ================= TEAM MEMBERS ================= */

function TeamMembersSection() {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white px-5 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Team Members
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage team members and their role assignments
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-4 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 shadow-inner dark:border-slate-700 dark:bg-slate-900/80">
        <Search className="mr-2 h-4 w-4" />
        <input
          placeholder="Search team members..."
          className="flex-1 bg-transparent text-xs text-slate-700 outline-none dark:text-slate-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white text-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.7fr)] border-b border-slate-100 bg-slate-50 px-4 py-2 font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400">
          <span>Member</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {teamMembers.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.7fr)] items-center border-b border-slate-50 px-4 py-3 last:border-0 dark:border-slate-800"
          >
            {/* Member */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ${m.avatarBg}`}
              >
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  {m.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {m.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                {m.role}
              </span>
            </div>

            {/* Status */}
            <div>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  m.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-200"
                }`}
              >
                {m.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 text-slate-400">
              <button type="button" className="hover:text-indigo-500">
                <Edit3 className="h-4 w-4" />
              </button>
              <button type="button" className="hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= PERMISSIONS ================= */

function PermissionsSection() {
  const [selectedRole, setSelectedRole] = useState("Admin");

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white px-5 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Permission Matrix
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Configure granular permissions for each role
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option>Admin</option>
            <option>Super Admin</option>
            <option>Manager</option>
            <option>Developer</option>
            <option>User</option>
          </select>
        </div>
      </div>

      <div className="space-y-5">
        {permissionApps.map((group) => (
          <div
            key={group.app}
            className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              {group.app}
            </p>

            <div className="space-y-2">
              {group.modules.map((mod) => (
                <PermissionRow key={group.app + mod} label={mod} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Reset
        </button>
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-1.5 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.45)] hover:opacity-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function PermissionRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-sm dark:bg-slate-900/90">
      <span className="text-slate-700 dark:text-slate-100">{label}</span>

      <div className="flex items-center gap-6 text-[11px] text-slate-500 dark:text-slate-400">
        <PermissionToggle label="View" icon={Eye} defaultOn />
        <PermissionToggle label="Edit" icon={FilePenLine} />
        <PermissionToggle label="Delete" icon={Trash2} />
      </div>
    </div>
  );
}

function PermissionToggle({
  label,
  icon: Icon,
  defaultOn = false,
}: {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="inline-flex items-center gap-2"
    >
      <Icon className="h-3.5 w-3.5 text-slate-400" />
      <span>{label}</span>
      <span
        className={`relative inline-flex h-4.5 w-8 items-center rounded-full border text-[0] ${
          on
            ? "border-indigo-400 bg-indigo-500/80"
            : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
