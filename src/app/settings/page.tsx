"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  User2,
  Bell,
  ShieldCheck,
  CreditCard,
  KeyRound,
  Palette,
  Mail,
  Zap,
  Globe2,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { useUserProfile, type UserProfile } from "@/context/UserProfileContext";
import { useTheme } from "next-themes";

type TabId =
  | "profile"
  | "notifications"
  | "security"
  | "billing"
  | "api"
  | "appearance";

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { id: "profile", label: "Profile", icon: User2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api", label: "API Keys", icon: KeyRound },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const { profile, updateProfile } = useUserProfile();

  const [draft, setDraft] = useState<UserProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  // keep draft in sync if profile changes elsewhere
  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const updateDraft = (patch: Partial<UserProfile>) => {
    setDraft(prev => ({ ...prev, ...patch }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 300)); // small UX delay
    updateProfile(draft);
    setIsSaving(false);
  };

  const handleCancelProfile = () => {
    setDraft(profile);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-[#f4f7ff] px-8 py-6 dark:from-slate-900 dark:to-slate-950">
          {/* Header */}
          <section>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your account settings and preferences.
            </p>
          </section>

          {/* Tabs */}
          <section className="mt-6">
            <div className="flex flex-wrap gap-2 rounded-2xl bg-white/70 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.03)] dark:bg-slate-900/70 dark:shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition",
                      active
                        ? "bg-white text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.08)] dark:bg-slate-800 dark:text-slate-50 dark:shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                        : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                    ].join(" ")}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        active
                          ? "text-[#7C3AED]"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tab content */}
          <section className="mt-6 mb-8">
            {activeTab === "profile" && (
              <ProfileSettingsPanel
                draft={draft}
                onChange={updateDraft}
                onSave={handleSaveProfile}
                onCancel={handleCancelProfile}
                isSaving={isSaving}
              />
            )}

            {activeTab === "notifications" && <NotificationsSettingsPanel />}

            {activeTab === "security" && <SecuritySettingsPanel />}

            {activeTab === "billing" && <BillingSettingsPanel />}

            {activeTab === "api" && <ApiKeysSettingsPanel />}

            {activeTab === "appearance" && <AppearanceSettingsPanel />}

            {activeTab !== "profile" &&
              activeTab !== "notifications" &&
              activeTab !== "security" &&
              activeTab !== "billing" &&
              activeTab !== "api" &&
              activeTab !== "appearance" && (
                <div className="rounded-[24px] bg-white px-8 py-10 text-sm text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
                  This section is a placeholder for now.{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Profile
                  </span>
                  ,{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Notifications
                  </span>
                  ,{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Security
                  </span>
                  ,{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Billing
                  </span>{" "}
                  ,{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    API Keys
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Appearance
                  </span>{" "}
                  tabs have full UI wired up.
                </div>
              )}
          </section>
        </main>
      </div>
    </div>
  );
}

// ================= PROFILE PANEL =================

type ProfileSettingsPanelProps = {
  draft: UserProfile;
  onChange: (update: Partial<UserProfile>) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

type FieldChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>;

function ProfileSettingsPanel({
  draft,
  onChange,
  onSave,
  onCancel,
  isSaving,
}: ProfileSettingsPanelProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleInput =
    (field: keyof UserProfile) => (event: FieldChangeEvent) => {
      if (!isEditing) return;
      onChange({ [field]: event.target.value });
    };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    onCancel();
    setIsEditing(false);
  };

  return (
    <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Profile Information
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Update your account profile and contact details
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1.5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(124,58,237,0.30)] hover:brightness-105"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form fields only – no avatar */}
      <div className="w-full">
        <div className="grid gap-5 md:grid-cols-2">
          <EditableField
            label="First Name"
            value={draft.firstName}
            onChange={handleInput("firstName")}
            disabled={!isEditing}
          />
          <EditableField
            label="Last Name"
            value={draft.lastName}
            onChange={handleInput("lastName")}
            disabled={!isEditing}
          />
        </div>

        <div className="mt-5">
          <EditableField
            label="Email Address"
            type="email"
            value={draft.email}
            onChange={handleInput("email")}
            disabled={!isEditing}
          />
        </div>

        <div className="mt-5">
          <EditableField
            label="Company Name"
            value={draft.company}
            onChange={handleInput("company")}
            disabled={!isEditing}
          />
        </div>

        <div className="mt-5 max-w-sm">
          <TimezoneField
            label="Timezone"
            value={draft.timezone}
            onChange={handleInput("timezone")}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancelClick}
          disabled={!isEditing || isSaving}
          className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={!isEditing || isSaving}
          className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2 text-xs font-medium text-white shadow-[0_10px_25px_rgba(124,58,237,0.35)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ===== SMALL FIELD COMPONENTS =====

type EditableFieldProps = {
  label: string;
  value: string;
  type?: "text" | "email";
  disabled?: boolean;
  onChange: (e: FieldChangeEvent) => void;
};

function EditableField({
  label,
  value,
  type = "text",
  disabled = false,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "mt-1 rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none ring-0",
          disabled
            ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
            : "border-slate-200 bg-white text-slate-800 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#C4B5FD] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#7C3AED] dark:focus:ring-[#7C3AED]",
        ].join(" ")}
      />
    </div>
  );
}

type TimezoneFieldProps = {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (e: FieldChangeEvent) => void;
};

const timezoneOptions = [
  "Pacific Time (PST)",
  "Mountain Time (MST)",
  "Central Time (CST)",
  "Eastern Time (EST)",
  "UTC",
];

function TimezoneField({
  label,
  value,
  disabled = false,
  onChange,
}: TimezoneFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "mt-1 rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none",
          disabled
            ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
            : "border-slate-200 bg-white text-slate-800 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#C4B5FD] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#7C3AED] dark:focus:ring-[#7C3AED]",
        ].join(" ")}
      >
        {timezoneOptions.map(tz => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
}

// ================= BILLING PANEL =================

function BillingSettingsPanel() {
  return (
    <div className="space-y-6">
      {/* Billing Information */}
      <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Billing Information
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage your billing details and payment methods
          </p>
        </div>

        {/* Current plan card */}
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-[#EEF2FF] to-[#F5E9FF] px-6 py-4 shadow-sm dark:border-indigo-900/60 dark:from-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Current Plan: Enterprise Bundle
              </p>
              <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                $1,046/month • Renews Nov 15, 2025
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-slate-50 dark:bg-slate-900 dark:text-indigo-300 dark:hover:bg-slate-800"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Payment Methods
          </p>

          <div className="mt-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-indigo-500 dark:bg-slate-800 dark:text-indigo-300">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Expires 12/2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-100 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Add payment method button */}
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= API KEYS PANEL =================

function ApiKeysSettingsPanel() {
  return (
    <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          API Keys
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Manage API keys for integrating with external services
        </p>
      </div>

      {/* Production key */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Production API Key
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-mono text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            osp_live_1234567890abcdefghij
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Created Oct 1, 2025 • Last used 2 hours ago
          </p>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Test key */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Test API Key
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-mono text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            osp_test_0987654321zyxwvutsrq
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Created Sep 15, 2025 • Last used 1 day ago
          </p>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Create new key button */}
      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7B3CFF] px-4 py-3 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(79,70,229,0.55)] hover:brightness-110"
      >
        Create New API Key
      </button>
    </div>
  );
}

// ================= APPEARANCE PANEL =================

function AppearanceSettingsPanel() {
  const { theme, setTheme } = useTheme();
  // if "system" ever appears, treat it as light for this UI
  const currentTheme = theme === "dark" ? "dark" : "light";

  const [language, setLanguage] = useState("English");

  const themeCardBase =
    "flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition";
  const themeCardInactive =
    "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800";
  const themeCardActive =
    "border-[#4F46E5] bg-[#EEF2FF] shadow-[0_0_0_1px_rgba(79,70,229,0.4)] dark:border-[#4F46E5] dark:bg-slate-900";

  return (
    <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Appearance
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Customize how Osperra looks and feels
        </p>
      </div>

      {/* Theme section */}
      <div>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          Theme
        </p>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {/* Light */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={[
              themeCardBase,
              currentTheme === "light" ? themeCardActive : themeCardInactive,
            ].join(" ")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/40 dark:text-amber-200">
              <Sun className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Light Mode
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Bright and clean
              </span>
            </div>
          </button>

          {/* Dark */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={[
              themeCardBase,
              currentTheme === "dark" ? themeCardActive : themeCardInactive,
            ].join(" ")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-indigo-300 dark:bg-slate-800 dark:text-indigo-300">
              <Moon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Dark Mode
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Easy on the eyes
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Language section */}
      <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          Language
        </p>

        <div className="mt-2 max-w-md">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#C4B5FD] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-[#7C3AED] dark:focus:ring-[#7C3AED]"
          >
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
            <option>Deutsch</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ================= NOTIFICATIONS PANEL =================

function NotificationsSettingsPanel() {
  const [email, setEmail] = useState(false);
  const [push, setPush] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // here you could persist to API / localStorage
    await new Promise((r) => setTimeout(r, 400));
    setIsSaving(false);
  };

  return (
    <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Notification Preferences
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Choose how you want to receive notifications
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <NotificationRow
          icon={Mail}
          title="Email Notifications"
          description="Receive notifications via email"
          enabled={email}
          onToggle={() => setEmail((v) => !v)}
        />
        <NotificationRow
          icon={Bell}
          title="Push Notifications"
          description="Receive push notifications in your browser"
          enabled={push}
          onToggle={() => setPush((v) => !v)}
        />
        <NotificationRow
          icon={Zap}
          title="Product Updates"
          description="Get notified about new features and updates"
          enabled={productUpdates}
          onToggle={() => setProductUpdates((v) => !v)}
        />
        <NotificationRow
          icon={Globe2}
          title="Marketing Communications"
          description="Receive tips, offers, and promotional content"
          enabled={marketing}
          onToggle={() => setMarketing((v) => !v)}
        />
      </div>

      {/* Footer button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-6 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(79,70,229,0.45)] hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}

type NotificationRowProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function NotificationRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/40 px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        className={[
          "relative inline-flex h-5 w-9 items-center rounded-full border transition",
          enabled
            ? "border-transparent bg-[#4F46E5]"
            : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition",
            enabled ? "translate-x-4" : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

// ================= SECURITY PANEL =================

function SecuritySettingsPanel() {
  // ----- password state -----
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // ----- 2FA state -----
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [isSaving2FA, setIsSaving2FA] = useState(false);

  // ----- sessions state (mock data for UI) -----
  type Session = {
    id: string;
    name: string;
    details: string;
    isCurrent: boolean;
  };

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "current",
      name: "Current Session",
      details: "Chrome on macOS · San Francisco, CA",
      isCurrent: true,
    },
    {
      id: "iphone",
      name: "Safari on iPhone",
      details: "Last active 2 hours ago · San Francisco, CA",
      isCurrent: false,
    },
  ]);

  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    setIsSavingPassword(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsSavingPassword(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle2FA = async () => {
    setIsSaving2FA(true);
    await new Promise((r) => setTimeout(r, 400));
    setTwoFAEnabled((prev) => !prev);
    setIsSaving2FA(false);
  };

  const handleRevokeSession = async (id: string) => {
    setRevokingId(id);
    await new Promise((r) => setTimeout(r, 400));
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setRevokingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Change password card */}
      <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Change Password
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="space-y-4">
          <SecurityInput
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <SecurityInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <SecurityInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleUpdatePassword}
            disabled={isSavingPassword}
            className="rounded-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899] px-6 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.45)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSavingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* 2FA card */}
      <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Two-Factor Authentication
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Two-Factor Authentication
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Secure your account with 2FA
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggle2FA}
              disabled={isSaving2FA}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving2FA
                ? "Please wait..."
                : twoFAEnabled
                ? "Disable 2FA"
                : "Enable 2FA"}
            </button>
          </div>
        </div>
      </div>

      {/* Active sessions card */}
      <div className="rounded-[24px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Active Sessions
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage your active login sessions
          </p>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionRow
              key={session.id}
              session={session}
              revoking={revokingId === session.id}
              onRevoke={handleRevokeSession}
            />
          ))}

          {sessions.length === 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              No other active sessions.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

type SecurityInputProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SecurityInput({ label, value, onChange }: SecurityInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-100 bg-slate-100/70 px-4 py-2.5 text-sm text-slate-800 outline-none ring-0 focus:border-transparent focus:ring-2 focus:ring-[#4F46E5]/70 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-[#4F46E5]"
      />
    </div>
  );
}

type SessionRowProps = {
  session: {
    id: string;
    name: string;
    details: string;
    isCurrent: boolean;
  };
  revoking: boolean;
  onRevoke: (id: string) => void;
};

function SessionRow({ session, revoking, onRevoke }: SessionRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
          {session.name}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
          {session.details}
        </p>
      </div>

      {session.isCurrent ? (
        <span className="rounded-full bg-emerald-50 px-4 py-1 text-[11px] font-semibold text-emerald-600 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-200">
          Active
        </span>
      ) : (
        <button
          type="button"
          onClick={() => onRevoke(session.id)}
          disabled={revoking}
          className="rounded-full border border-red-100 bg-red-50 px-4 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60"
        >
          {revoking ? "Revoking..." : "Revoke"}
        </button>
      )}
    </div>
  );
}
