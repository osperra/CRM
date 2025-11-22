"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isAnnual, setIsAnnual] = useState(false);

  // when user is already signed in, just send them to /admin
  const goToAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#f5f7ff] text-slate-900">
      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-0">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#a855f7] text-white shadow-lg">
            <span className="text-lg font-bold">O</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Osperra</span>
            <span className="text-xs text-slate-500">SaaS Ecosystem</span>
          </div>
        </div>

        {/* Sign in button */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            // already signed in → go straight to admin
            <button
              onClick={goToAdmin}
              className="rounded-full bg-gradient-to-r from-[#5b21ff] to-[#7c3aed] px-6 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110"
            >
              Sign In
            </button>
          ) : (
            // not signed in → open Clerk modal, then redirect to /admin
            <SignInButton mode="modal" fallbackRedirectUrl="/admin">
              <button className="rounded-full bg-gradient-to-r from-[#5b21ff] to-[#7c3aed] px-6 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* Hero section */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-6 text-center md:px-0">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-medium text-[#5b21ff] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5b21ff]" />
          <span>The Complete SaaS Ecosystem</span>
        </div>

        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
          One Platform.
          <br />
          <span className="text-slate-800">Every Business Tool You Need.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm text-slate-500 md:text-base">
          Osperra is your all-in-one CRM and SaaS management ecosystem. Access
          QR Generator, Scraawl, HireX, and 5+ more powerful applications in one
          unified platform. Everything we build, lives here first.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {isSignedIn ? (
            <button
              onClick={goToAdmin}
              className="inline-flex items-center gap-2 rounded-full bg-[#5b21ff] px-7 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#4c1edb]"
            >
              Start Free Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <SignInButton mode="modal" fallbackRedirectUrl="/admin">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#5b21ff] px-7 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#4c1edb]">
                Start Free Demo
                <ArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>
          )}

          <button className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            Watch Video
          </button>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 pb-16 md:grid-cols-4 md:px-0">
        <StatCard label="Live Apps" value="8+" />
        <StatCard label="Apps Coming Soon" value="15+" />
        <StatCard label="Active Users" value="10K+" />
        <StatCard label="Uptime" value="99.9%" />
      </section>

      {/* Powerful Apps section */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-0">
        <div className="text-center">
          <p className="text-xs font-medium text-emerald-600">⚡ 8 Apps Live Now</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Powerful Apps, All in One Place
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Access production-ready applications designed to streamline every
            aspect of your business.
          </p>
        </div>

        {/* Apps grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AppCard
            iconBg="bg-[#E0F2FE]"
            iconEmoji="🔳"
            title="QR Generator"
            description="Create and manage dynamic QR codes with analytics"
          />
          <AppCard
            iconBg="bg-[#EDE9FE]"
            iconEmoji="📄"
            title="Scraawl"
            description="Collaborative workspace management platform"
          />
          <AppCard
            iconBg="bg-[#FCE7F3]"
            iconEmoji="💬"
            title="Chat App"
            description="Real-time team communication and collaboration"
          />
          <AppCard
            iconBg="bg-[#DCFCE7]"
            iconEmoji="👜"
            title="HireX"
            description="Recruitment and applicant tracking system"
          />
          <AppCard
            iconBg="bg-[#FFF7ED]"
            iconEmoji="🧱"
            title="Website Builder"
            description="Drag-and-drop website creation tool"
          />
          <AppCard
            iconBg="bg-[#E0F2FE]"
            iconEmoji="💎"
            title="Jewelry Shop Management"
            description="Complete inventory and billing solution"
          />
          <AppCard
            iconBg="bg-[#ECFEFF]"
            iconEmoji="🔍"
            title="Job Portal"
            description="Full-featured job listing and application platform"
          />
          <AppCard
            iconBg="bg-[#F5F3FF]"
            iconEmoji="🧾"
            title="Live CA"
            description="Accounting and financial management system"
          />
        </div>

        {/* Coming soon stripe */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#eef0ff] to-[#f5f7ff] px-6 py-8 text-center text-sm text-slate-600 md:px-10">
          <p className="mx-auto flex max-w-xl items-center justify-center gap-2 text-[#5b21ff] font-medium">
            <span className="text-base">🔒</span>
            <span>15+ More Apps Coming Soon</span>
          </p>
          <p className="mt-3 mx-auto max-w-2xl">
            Every new application we create will be added to the Osperra
            ecosystem first. You&apos;ll get instant access to all future
            innovations as part of your subscription.
          </p>
        </div>
      </section>

      {/* Why Choose Osperra */}
      <section className="w-full bg-transparent px-4 py-20">
        <h2 className="text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          Why Choose Osperra?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
          Built for modern businesses that need flexibility, power, and simplicity
        </p>

        {/* Grid */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7EDFF] text-[#4F46E5]">
              <span className="text-lg">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              All-in-One Ecosystem
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Every application built by Osperra lives in one unified platform
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFEAFF] text-[#6C43FF]">
              <span className="text-lg">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Lightning Fast</h3>
            <p className="mt-2 text-sm text-slate-500">
              Blazing fast performance with real-time updates across all apps
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F0FF] text-[#4C6FFF]">
              <span className="text-lg">🛡️</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Enterprise Security
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Bank-grade encryption and security for all your business data
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EDFF] text-[#5A5AF7]">
              <span className="text-lg">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Team Collaboration
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Seamless collaboration across teams and departments
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E9FF] text-[#8A4FFF]">
              <span className="text-lg">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Advanced Analytics
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Comprehensive insights and reporting across all applications
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F2FF] text-[#2D8DFE]">
              <span className="text-lg">🌐</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Cloud-Native</h3>
            <p className="mt-2 text-sm text-slate-500">
              Access your entire business suite from anywhere, anytime
            </p>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="border-t border-slate-100 bg-[#f6f7ff] py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-0">
          {/* Header + toggle */}
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              Simple, Transparent Pricing
            </p>
            <p className="mt-2 text-base text-slate-600">
              Choose the plan that fits your business. All plans include free demo
              access.
            </p>

            {/* Monthly / Annual toggle with “Save up to 20%” */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 text-xs font-medium shadow-sm">
                <span
                  className={
                    !isAnnual ? "text-slate-900" : "text-slate-400 transition-colors"
                  }
                >
                  Monthly
                </span>

                <button
                  type="button"
                  onClick={() => setIsAnnual((prev) => !prev)}
                  className={`relative flex h-7 w-12 items-center rounded-full border border-black/20 p-0.5 transition ${
                    isAnnual
                      ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed]"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      isAnnual ? "translate-x-5" : ""
                    }`}
                  />
                </button>

                <span
                  className={
                    isAnnual ? "text-slate-900" : "text-slate-400 transition-colors"
                  }
                >
                  Annual
                </span>
              </div>

              {isAnnual && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Save up to 20%
                </span>
              )}
            </div>
          </div>

          {/* Pricing cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <PricingCard
              name="Starter"
              tagline="Perfect for small teams getting started"
              price={isAnnual ? "₹28,999" : "₹2,999"}
              priceNote={isAnnual ? "/year" : "/month"}
              saveLabel={isAnnual ? "Save ₹7,000" : undefined}
              features={[
                "Up to 5 team members",
                "Access to 3 live apps",
                "5GB storage per app",
                "Basic analytics",
                "Email support",
                "Mobile app access",
              ]}
              ctaLabel="Start Free Demo"
              highlight={false}
              secondary={false}
              isSignedIn={isSignedIn ?? false}
              onGoToAdmin={goToAdmin}
            />

            {/* Professional */}
            <PricingCard
              name="Professional"
              tagline="Best for growing businesses"
              price={isAnnual ? "₹79,999" : "₹7,999"}
              priceNote={isAnnual ? "/year" : "/month"}
              saveLabel={isAnnual ? "Save ₹16,000" : undefined}
              badge="Most Popular"
              features={[
                "Up to 25 team members",
                "Access to all 8 live apps",
                "50GB storage per app",
                "Advanced analytics & reporting",
                "Priority support (24/7)",
                "Custom branding",
                "API access",
                "Advanced integrations",
              ]}
              ctaLabel="Start Free Demo"
              highlight
              secondary={false}
              isSignedIn={isSignedIn ?? false}
              onGoToAdmin={goToAdmin}
            />

            {/* Enterprise */}
            <PricingCard
              name="Enterprise"
              tagline="For large organizations with custom needs"
              price="Custom"
              priceNote={undefined}
              features={[
                "Unlimited team members",
                "All apps + beta features",
                "Unlimited storage",
                "Custom analytics & BI",
                "Dedicated account manager",
                "White-label solutions",
                "Custom development",
                "SLA guarantees & on-prem options",
              ]}
              ctaLabel="Contact Sales"
              highlight={false}
              secondary
              isSignedIn={isSignedIn ?? false}
              onGoToAdmin={goToAdmin}
            />
          </div>

          <p className="mt-10 text-center text-xs text-slate-400">
            All plans include a 14-day free demo. No credit card required.
          </p>
        </div>
      </section>

      {/* Big CTA section */}
      <section className="bg-[#f5f7ff] py-16 px-4">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] px-8 py-12 text-center text-white md:px-16">
          <p className="text-sm font-medium opacity-90">
            Ready to Transform Your Business?
          </p>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Join thousands of businesses using Osperra to streamline operations,
            boost productivity, and scale faster.
          </h2>
          <p className="mt-3 text-sm opacity-90">
            Start your free demo today and explore the complete SaaS ecosystem
            built for modern teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isSignedIn ? (
              <button
                onClick={goToAdmin}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#4f46e5] shadow-md hover:bg-slate-50"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <SignInButton mode="modal" fallbackRedirectUrl="/admin">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#4f46e5] shadow-md hover:bg-slate-50">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </button>
              </SignInButton>
            )}

            <button className="rounded-full border border-white/40 bg-transparent px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/10">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-[#f5f7ff] px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
          {/* Left brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#a855f7] text-white shadow">
                <span className="text-base font-bold">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Osperra
                </span>
                <span className="text-xs text-slate-500">SaaS Ecosystem</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              The complete SaaS ecosystem for modern businesses.
            </p>
          </div>

          {/* Columns */}
          <div className="grid flex-1 grid-cols-2 gap-8 text-xs text-slate-500 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-slate-900">Product</p>
              <ul className="mt-3 space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Apps</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Company</p>
              <ul className="mt-3 space-y-2">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Legal</p>
              <ul className="mt-3 space-y-2">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-slate-400">
          © 2025 Osperra. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

/* ---------- Small components ---------- */

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-sm">
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{label}</p>
    </div>
  );
}

interface AppCardProps {
  iconBg: string;
  iconEmoji: string;
  title: string;
  description: string;
}

function AppCard({ iconBg, iconEmoji, title, description }: AppCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <span className="text-xl">{iconEmoji}</span>
        </div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-xs text-slate-500">{description}</p>
      </div>
      <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#5b21ff] hover:underline">
        Explore <span>↗</span>
      </button>
    </div>
  );
}

/* ---------- Pricing components ---------- */

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  highlight?: boolean;
  secondary?: boolean;
  badge?: string;
  saveLabel?: string;
  isSignedIn: boolean;
  onGoToAdmin: () => void;
}

function PricingCard({
  name,
  tagline,
  price,
  priceNote,
  features,
  ctaLabel,
  highlight,
  secondary,
  badge,
  saveLabel,
  isSignedIn,
  onGoToAdmin,
}: PricingCardProps) {
  const cardClasses = highlight
    ? "border-2 border-[#4f46e5] bg-white/80 shadow-lg shadow-indigo-100"
    : "border border-slate-100 bg-white/90 shadow-sm";

  return (
    <div
      className={`flex flex-col rounded-3xl px-6 py-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl ${cardClasses}`}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-3 inline-flex self-center rounded-full bg-[#4f46e5]/10 px-3 py-1 text-xs font-semibold text-[#4f46e5]">
          {badge}
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-slate-900">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">{tagline}</p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-slate-900">{price}</span>
          {priceNote && (
            <span className="text-xs font-medium text-slate-400">
              {priceNote}
            </span>
          )}
        </div>

        {saveLabel && (
          <div className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600">
            {saveLabel}
          </div>
        )}
      </div>

      {/* Feature list */}
      <ul className="mt-5 flex-1 space-y-2 text-xs text-slate-600">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-3 w-3 text-emerald-500" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <div className="mt-6">
        {isSignedIn ? (
          <button
            onClick={onGoToAdmin}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
              secondary
                ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                : "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
            }`}
          >
            {ctaLabel}
          </button>
        ) : (
          <SignInButton mode="modal" fallbackRedirectUrl="/admin">
            <button
              className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                secondary
                  ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  : "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
              }`}
            >
              {ctaLabel}
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
