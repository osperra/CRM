"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import SubStatCard from "@/components/subscriptions/SubStatCard";
import MonthlySpendingChart from "@/components/subscriptions/MonthlySpendingChart";
import CostDistributionChart from "@/components/subscriptions/CostDistributionChart";
import ActiveSubscriptionsTable from "@/components/subscriptions/ActiveSubscriptionsTable";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import RecentInvoicesTable from "@/components/subscriptions/RecentInvoicesTable";

export default function SubscriptionsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-[#f4f7ff] dark:from-slate-900 dark:to-slate-950 px-6 py-6">
          <section>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Subscription Management
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage all your app subscriptions, billing, and usage in one
              place.
            </p>
          </section>

          {/* Stat cards */}
          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SubStatCard
              icon={<DollarSign className="h-5 w-5 text-[#2563EB]" />}
              label="Monthly Spend"
              value="$1046/mo"
              note="$203 saved with bundle"
              noteClassName="text-emerald-600"
            />
            <SubStatCard
              icon={<CheckCircle2 className="h-5 w-5 text-[#059669]" />}
              label="Active Subscriptions"
              value="4"
            />
            <SubStatCard
              icon={<AlertCircle className="h-5 w-5 text-[#F97316]" />}
              label="Trials Ending Soon"
              value="2"
            />
            <SubStatCard
              icon={<TrendingUp className="h-5 w-5 text-[#8B5CF6]" />}
              label="Avg. Cost per User"
              value="$11.25"
            />
          </section>

          {/* Charts row */}
          <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <MonthlySpendingChart />
            <CostDistributionChart />
          </section>

          <section className="mt-6">
            <ActiveSubscriptionsTable />
          </section>
          <section className="mt-6 mb-4">
            <RecentInvoicesTable />
          </section>
        </main>
      </div>
    </div>
  );
}
