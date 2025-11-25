// src/app/store/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  Box,
  Download,
  Sparkles,
  TrendingUp,
  Grid3X3,
  Zap,
  Megaphone,
  BarChart2,
  ShoppingBag,
  CreditCard,
  Users,
  Star,
  Filter,
  Search,
} from "lucide-react";

type CategoryKey =
  | "all"
  | "productivity"
  | "marketing"
  | "analytics"
  | "ecommerce"
  | "finance"
  | "hr";

const categories: {
  key: CategoryKey;
  label: string;
  count: number;
  icon: React.ReactNode;
}[] = [
  {
    key: "all",
    label: "All Apps",
    count: 48,
    icon: <Grid3X3 className="h-4 w-4" />,
  },
  {
    key: "productivity",
    label: "Productivity",
    count: 12,
    icon: <Zap className="h-4 w-4" />,
  },
  {
    key: "marketing",
    label: "Marketing",
    count: 8,
    icon: <Megaphone className="h-4 w-4" />,
  },
  {
    key: "analytics",
    label: "Analytics",
    count: 6,
    icon: <BarChart2 className="h-4 w-4" />,
  },
  {
    key: "ecommerce",
    label: "E-Commerce",
    count: 10,
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    key: "finance",
    label: "Finance",
    count: 7,
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    key: "hr",
    label: "HR",
    count: 5,
    icon: <Users className="h-4 w-4" />,
  },
];

interface AppCardData {
  id: string;
  name: string;
  category: CategoryKey;
  badge: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  label: string;
  installed?: boolean;
}

const featuredApps: AppCardData[] = [
  {
    id: "doc-scanner-pro",
    name: "Document Scanner Pro",
    category: "productivity",
    badge: "Productivity",
    rating: 4.8,
    reviews: 234,
    price: "$49/mo",
    description:
      "Advanced OCR and document scanning with AI-powered organization.",
    label: "Featured",
  },
  {
    id: "analytics-plus",
    name: "Analytics Plus",
    category: "analytics",
    badge: "Analytics",
    rating: 4.9,
    reviews: 456,
    price: "$79/mo",
    description:
      "Deep dive analytics with custom dashboards and real-time insights.",
    label: "Featured",
  },
  {
    id: "social-scheduler",
    name: "Social Scheduler",
    category: "marketing",
    badge: "Marketing",
    rating: 4.7,
    reviews: 189,
    price: "$39/mo",
    description:
      "Schedule and automate your social media posts across all platforms.",
    label: "Featured",
  },
];

const allApps: AppCardData[] = [
  ...featuredApps,
  {
    id: "email-campaign",
    name: "Email Campaign Manager",
    category: "marketing",
    badge: "Marketing",
    rating: 4.6,
    reviews: 312,
    price: "$59/mo",
    description:
      "Create, send, and track beautiful email campaigns with ease.",
    label: "Popular",
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    category: "finance",
    badge: "Finance",
    rating: 4.5,
    reviews: 167,
    price: "$29/mo",
    description:
      "Professional invoicing and payment tracking for growing teams.",
    label: "Installed",
    installed: true,
  },
  {
    id: "inventory-master",
    name: "Inventory Master",
    category: "ecommerce",
    badge: "E-Commerce",
    rating: 4.8,
    reviews: 278,
    price: "$69/mo",
    description:
      "Inventory management with stock alerts, reporting, and automations.",
    label: "Popular",
  },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = allApps.filter((app) => {
    const matchesCategory =
      activeCategory === "all" || app.category === activeCategory;
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f7ff] dark:bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f5f7ff] to-[#e5edff] dark:from-slate-950 dark:to-slate-950 px-6 py-6">
          {/* Header + search row */}
          <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Osperra Store
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Discover and add powerful micro-apps to expand your ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* search inside page (not global search) */}
              <div className="relative w-64 max-w-xs">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search apps, modules..."
                  className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </section>

          {/* Top stat cards */}
          <section className="grid gap-5 lg:grid-cols-4">
            <StoreStatCard
              icon={<Box className="h-5 w-5" />}
              label="Available Apps"
              value="48"
              sub="micro-apps"
              iconBg="bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
            />
            <StoreStatCard
              icon={<Download className="h-5 w-5" />}
              label="Installed Apps"
              value="7"
              sub="active"
              iconBg="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
            />
            <StoreStatCard
              icon={<Sparkles className="h-5 w-5" />}
              label="New This Week"
              value="3"
              sub="fresh releases"
              iconBg="bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300"
            />
            <StoreStatCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Trending"
              value="Document Scanner"
              sub="Top pick"
              iconBg="bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300"
            />
          </section>

          {/* Black Friday / promo banner */}
          <section className="mt-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-orange-400 px-6 py-5 text-white shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <span className="text-lg">🎉</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">Black Friday Sale</p>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">
                      50% OFF
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-indigo-50">
                    Get 50% off on all premium apps for the first 3 months.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/25 hover:bg-slate-100"
              >
                Browse Deals
              </button>
            </div>
          </section>

          {/* Main grid: categories + apps */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Left sidebar: categories */}
            <aside className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Categories
              </h2>

              <div className="mt-4 space-y-1.5 text-xs">
                {categories.map((cat) => {
                  const active = cat.key === activeCategory;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 transition-all ${
                        active
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-xl text-[11px] ${
                            active
                              ? "bg-white/15"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {cat.icon}
                        </span>
                        <span className="font-medium">{cat.label}</span>
                      </span>
                      <span
                        className={`ml-2 inline-flex h-5 min-w-[1.75rem] items-center justify-center rounded-full text-[10px] ${
                          active
                            ? "bg-white/20 text-indigo-50"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right side: apps */}
            <div className="space-y-6">
              {/* Featured Apps row */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    Featured Apps
                  </h2>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Curated tools to kickstart your workspace.
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {featuredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </section>

              {/* All Apps grid */}
              <section>
                <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  All Apps
                </h2>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                      No apps match your filters yet.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ------------ small components ------------ */

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  iconBg: string;
}

function StoreStatCard({ icon, label, value, sub, iconBg }: StatProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-soft transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      
      {/* Top Row */}
      <div className="flex items-start justify-between">
        {/* ICON */}
        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl text-sm",
            iconBg, // bg + text colors from props
          ].join(" ")}
        >
          {icon}
        </div>

        {/* Empty space for symmetry */}
        <span className="inline-block h-4 w-4" />
      </div>

      {/* Text Section */}
      <div className="mt-4">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {label}
        </div>

        <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
          {value}
        </div>

        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          {sub}
        </p>
      </div>
    </div>
  );
}


function AppCard({ app }: { app: AppCardData }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-4 text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* top row: icon + rating + label */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {/* simple app icon placeholder */}
            <Box className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {app.name}
            </p>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{app.rating}</span>
              </span>
              <span>({app.reviews})</span>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
          {app.label}
        </span>
      </div>

      <p className="flex-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
        {app.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {app.badge}
          </span>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {app.price}
          </p>
        </div>

        {app.installed ? (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:border-emerald-400/60 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            Installed
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-indigo-500/40 hover:from-indigo-600 hover:to-fuchsia-500"
          >
            Install
          </button>
        )}
      </div>
    </div>
  );
}
