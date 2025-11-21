// src/app/page.tsx
"use client";

import { useState } from "react";
import LiveCAModal from "@/components/dashboard/LiveCAModal";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/dashboard/StatCard";
import InsightsCard from "@/components/dashboard/InsightsCard";
import ApplicationCard from "@/components/dashboard/ApplicationCard";
import TeamAchievementsCard from "@/components/dashboard/TeamAchievementsCard";

import {
  Activity,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Users2,
  QrCode,
  Globe2,
  Video,
  Gem,
  BriefcaseBusiness,
} from "lucide-react";

export default function Page() {
  // state to control LiveCA modal
  const [showLiveCAModal, setShowLiveCAModal] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex flex-1 flex-col">
          <TopBar />

          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-[#f4f7ff] dark:from-slate-900 dark:to-slate-950 px-6 py-6">
            {/* Header */}
            <section>
     <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      Welcome back, Admin <span className="inline-block">👋</span>
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Here&apos;s what&apos;s happening with your Osperra ecosystem
                today.
              </p>
            </section>

            {/* Stat cards row */}
            <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Activity className="h-5 w-5" />}
                label="Active Modules"
                value="5"
                badge="+2"
                iconClassName="bg-[#E5EEFF] text-[#2062FF]" // blue tile
              />
              <StatCard
                icon={<Users className="h-5 w-5" />}
                label="Team Members"
                value="47"
                badge="+8"
                iconClassName="bg-[#F1E4FF] text-[#9B51FF]" // purple tile
              />
              <StatCard
                icon={<DollarSign className="h-5 w-5" />}
                label="Monthly Spend"
                value="$1,249"
                badge="+12%"
                iconClassName="bg-[#E2F6F0] text-[#1A9D63]" // green tile
              />
              <StatCard
                icon={<TrendingUp className="h-5 w-5" />}
                label="System Health"
                value="99.9%"
                badge="Stable"
                iconClassName="bg-[#F2F4F7] text-slate-800" // neutral tile
              />
            </section>

            {/* AI-Generated Insights block */}
            <section className="mt-6">
              <InsightsCard />
            </section>

            {/* Your Applications */}
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Your Applications
                </h2>
                <p className="text-xs text-slate-500">
                  Click on any app to open or unlock to purchase
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {/* Row 1 */}
                <ApplicationCard
                  name="Scraawl"
                  icon={<FileText className="h-5 w-5" />}
                  status="active"
                  usagePercent={78}
                  activeUsers={24}
                  iconBgClassName="bg-[#F2ECFF] text-[#6C4DFF]"
                />
                <ApplicationCard
                  name="HireX"
                  icon={<Users2 className="h-5 w-5" />}
                  status="active"
                  usagePercent={92}
                  activeUsers={18}
                  iconBgClassName="bg-[#F3E6FF] text-[#8A3CFF]"
                />
                <ApplicationCard
                  name="QR Generator"
                  icon={<QrCode className="h-5 w-5" />}
                  status="trial"
                  usagePercent={34}
                  activeUsers={8}
                  iconBgClassName="bg-[#FFEFD9] text-[#C97A1A]"
                />
                <ApplicationCard
                  name="Website Builder"
                  icon={<Globe2 className="h-5 w-5" />}
                  status="active"
                  usagePercent={65}
                  activeUsers={15}
                  iconBgClassName="bg-[#E6F5FF] text-[#1D8FE3]"
                />

                {/* Row 2 */}
                <ApplicationCard
                  name="LiveCA"
                  icon={<Video className="h-5 w-5" />}
                  status="locked"
                  description="Live streaming and video conferencing solution"
                  priceLabel="$249/month"
                  onClick={() => setShowLiveCAModal(true)} // open modal
                />
                <ApplicationCard
                  name="Jewellery E-Com"
                  icon={<Gem className="h-5 w-5" />}
                  status="active"
                  usagePercent={88}
                  activeUsers={32}
                  iconBgClassName="bg-[#E3F6FF] text-[#0EA5E9]"
                />
                <ApplicationCard
                  name="Job Portal"
                  icon={<BriefcaseBusiness className="h-5 w-5" />}
                  status="trial"
                  usagePercent={45}
                  activeUsers={12}
                  iconBgClassName="bg-[#FFEFE4] text-[#D97706]"
                />
              </div>
            </section>

            {/* Team achievements */}
            <TeamAchievementsCard />

          </main>
        </div>
      </div>

      {/* LiveCA modal overlay */}
      <LiveCAModal
        open={showLiveCAModal}
        onClose={() => setShowLiveCAModal(false)}
      />
    </>
  );
}
