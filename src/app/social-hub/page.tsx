// src/app/social-hub/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  Eye,
  TrendingUp,
  Users,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  Plus,
  MessageCircle,
  Share2,
} from "lucide-react";

type TabKey = "recent" | "scheduled" | "analytics";

const recentPosts = [
  {
    id: 1,
    platform: "Instagram",
    iconBg: "bg-[#FEE7F3]",
    iconColor: "text-[#EC4899]",
    Icon: Instagram,
    time: "2 hours ago",
    title: "New collection launch! Check out our latest jewellery designs ✨",
    likes: 342,
    comments: 28,
    shares: 15,
  },
  {
    id: 2,
    platform: "LinkedIn",
    iconBg: "bg-[#E0ECFF]",
    iconColor: "text-[#2563EB]",
    Icon: Linkedin,
    time: "5 hours ago",
    title: "We're hiring! Join our amazing team as a Senior Developer",
    likes: 89,
    comments: 12,
    shares: 34,
  },
  {
    id: 3,
    platform: "Facebook",
    iconBg: "bg-[#E3EBFF]",
    iconColor: "text-[#2563EB]",
    Icon: Facebook,
    time: "1 day ago",
    title:
      "Thank you for 12K followers! Special discount code: OSPERRA23",
    likes: 567,
    comments: 94,
    shares: 123,
  },
];

const platformAnalytics = [
  {
    platform: "Facebook",
    followers: "12.5K",
    posts: 156,
    avgLikes: 230,
    avgShares: 55,
    engagement: "4.2% engagement",
    iconBg: "bg-[#E3EBFF]",
    iconColor: "text-[#2563EB]",
    Icon: Facebook,
  },
  {
    platform: "Instagram",
    followers: "8.3K",
    posts: 203,
    avgLikes: 57,
    avgShares: 12,
    engagement: "6.8% engagement",
    iconBg: "bg-[#FEE7F3]",
    iconColor: "text-[#EC4899]",
    Icon: Instagram,
  },
  {
    platform: "LinkedIn",
    followers: "5.1K",
    posts: 89,
    avgLikes: 98,
    avgShares: 10,
    engagement: "3.1% engagement",
    iconBg: "bg-[#E0ECFF]",
    iconColor: "text-[#2563EB]",
    Icon: Linkedin,
  },
  {
    platform: "YouTube",
    followers: "2.8K",
    posts: 47,
    avgLikes: 194,
    avgShares: 41,
    engagement: "5.4% engagement",
    iconBg: "bg-[#FFE7E7]",
    iconColor: "text-[#EF4444]",
    Icon: Youtube,
  },
];

export default function SocialHubPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("recent");

  return (
    <div className="flex min-h-screen bg-[#f5f7ff] text-slate-900 dark:bg-[#050816] dark:text-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f5f7ff] to-[#e5edff] px-6 py-6 dark:bg-gradient-to-b dark:from-[#050816] dark:via-[#020617] dark:to-[#020617]">
          {/* Header */}
          <section className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Social Integration Hub
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage all your social media accounts from one unified dashboard.
            </p>
          </section>

          {/* Top stat cards */}
          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Reach"
              value="45.2K"
              helper="+12% this week"
              Icon={Eye}
              iconBg="bg-[#E0EAFF]"
              iconColor="text-[#2563EB]"
            />
            <StatCard
              label="Engagement Rate"
              value="5.2%"
              helper="+0.8% this week"
              Icon={TrendingUp}
              iconBg="bg-[#F4E9FF]"
              iconColor="text-[#7C3AED]"
            />
            <StatCard
              label="New Followers"
              value="+1.2K"
              helper="This month"
              Icon={Users}
              iconBg="bg-[#DCFCE7]"
              iconColor="text-[#16A34A]"
            />
            <StatCard
              label="Top Platform"
              value="Instagram"
              helper="Highest engagement"
              Icon={Heart}
              iconBg="bg-[#FFE4EF]"
              iconColor="text-[#EC4899]"
            />
          </section>

          {/* Connected Platforms */}
          <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Connected Platforms
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Manage your social media integrations
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <PlatformCard
                name="Facebook"
                status="Connected"
                followers="12.5K"
                engagement="4.2%"
                Icon={Facebook}
                iconBg="bg-[#E3EBFF]"
                iconColor="text-[#2563EB]"
              />
              <PlatformCard
                name="Instagram"
                status="Connected"
                followers="8.3K"
                engagement="6.8%"
                Icon={Instagram}
                iconBg="bg-[#FEE7F3]"
                iconColor="text-[#EC4899]"
              />
              <PlatformCard
                name="LinkedIn"
                status="Connected"
                followers="5.1K"
                engagement="3.1%"
                Icon={Linkedin}
                iconBg="bg-[#E0ECFF]"
                iconColor="text-[#2563EB]"
              />
              <PlatformCard
                name="Twitter"
                status="Disconnected"
                followers="—"
                engagement="—"
                Icon={Twitter}
                iconBg="bg-[#E5F4FF]"
                iconColor="text-[#0EA5E9]"
                isDisconnected
              />
              <PlatformCard
                name="YouTube"
                status="Connected"
                followers="2.8K"
                engagement="5.4%"
                Icon={Youtube}
                iconBg="bg-[#FFE7E7]"
                iconColor="text-[#EF4444]"
              />
            </div>
          </section>

          {/* Tabs */}
          <section className="mt-4">
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
              <TabButton
                label="Recent Posts"
                active={activeTab === "recent"}
                onClick={() => setActiveTab("recent")}
              />
              <TabButton
                label="Scheduled"
                active={activeTab === "scheduled"}
                onClick={() => setActiveTab("scheduled")}
              />
              <TabButton
                label="Analytics"
                active={activeTab === "analytics"}
                onClick={() => setActiveTab("analytics")}
              />
            </div>

            <div className="mt-4">
              {activeTab === "recent" && <RecentPostsSection />}
              {activeTab === "scheduled" && <ScheduledSection />}
              {activeTab === "analytics" && (
                <AnalyticsSection platforms={platformAnalytics} />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- small components ---------------- */

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
}

function StatCard({
  label,
  value,
  helper,
  Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
          {helper}
        </p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

interface PlatformCardProps {
  name: string;
  status: string;
  followers: string;
  engagement: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
  isDisconnected?: boolean;
}

function PlatformCard({
  name,
  status,
  followers,
  engagement,
  Icon,
  iconBg,
  iconColor,
  isDisconnected,
}: PlatformCardProps) {
  const statusColor = isDisconnected
    ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";

  return (
    <div className="flex flex-col rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Followers{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {followers}
              </span>
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Engagement</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-300">
          {engagement}
        </span>
      </div>

      <button className="mt-3 w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 text-center text-xs font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-800">
        {isDisconnected ? "Connect" : "Manage"}
      </button>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-2 text-xs font-medium transition ${
        active
          ? "text-slate-900 dark:text-slate-50"
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      }`}
    >
      {label}
      {active && (
        <span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" />
      )}
    </button>
  );
}

/* ---------------- sections ---------------- */

function RecentPostsSection() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        Recent Posts
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Your latest social media activity
      </p>

      <div className="mt-5 space-y-4">
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${post.iconBg}`}
              >
                <post.Icon
                  className={`h-4 w-4 ${post.iconColor}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {post.platform}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>{post.time}</span>
                </div>

                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {post.title}
                </p>

                {/* grey post preview bar */}
                <div className="mt-3 h-24 w-full rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900/60" />

                <div className="mt-3 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.comments}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    {post.shares}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduledSection() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
            <Send className="h-5 w-5 text-slate-400 dark:text-slate-300" />
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
          No Scheduled Posts
        </p>
        <p className="mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400">
          Schedule posts to publish across multiple platforms and keep
          your audience engaged consistently.
        </p>

        <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)]">
          <Plus className="h-3.5 w-3.5" />
          <span>Schedule Post</span>
        </button>
      </div>
    </div>
  );
}

interface AnalyticsSectionProps {
  platforms: typeof platformAnalytics;
}

function AnalyticsSection({ platforms }: AnalyticsSectionProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#020617] dark:ring-slate-800">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        Platform Analytics
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Detailed performance metrics for each platform
      </p>

      <div className="mt-5 space-y-3">
        {platforms.map((p) => (
          <div
            key={p.platform}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="min-w-[180px] flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${p.iconBg}`}
              >
                <p.Icon className={`h-4 w-4 ${p.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {p.platform}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {p.followers} followers
                </p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-3 gap-6 text-center text-[11px] text-slate-500 dark:text-slate-400">
              <div>
                <p className="uppercase tracking-wide">Posts</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.posts}
                </p>
              </div>
              <div>
                <p className="uppercase tracking-wide">Avg. Likes</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.avgLikes}
                </p>
              </div>
              <div>
                <p className="uppercase tracking-wide">Avg. Shares</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.avgShares}
                </p>
              </div>
            </div>

            <div className="flex min-w-[130px] items-center justify-end">
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                {p.engagement}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
