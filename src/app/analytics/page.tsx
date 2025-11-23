// src/app/analytics/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import {
  DollarSign,
  Users,
  Activity,
  CheckCircle2,
  ChevronDown,
  ArrowDownToLine,
} from "lucide-react";

const RANGE_OPTIONS = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"];

const revenueData = [
  { month: "Apr", value: 12400 },
  { month: "May", value: 14200 },
  { month: "Jun", value: 15800 },
  { month: "Jul", value: 17300 },
  { month: "Aug", value: 18500 },
  { month: "Sep", value: 21500 },
  { month: "Oct", value: 23800 },
];

const userActivityData = [
  { day: "Mon", active: 142, New: 8 },
  { day: "Tue", active: 156, New: 12 },
  { day: "Wed", active: 168, New: 15 },
  { day: "Thu", active: 151, New: 9 },
  { day: "Fri", active: 174, New: 18 },
  { day: "Sat", active: 123, New: 6 },
  { day: "Sun", active: 98, New: 4 },
];

const modulePerformanceData = [
  { name: "Jewellery E-Com", revenue: 45200, usage: 88, color: "#f59e0b" },
  { name: "HireX", revenue: 38900, usage: 92, color: "#8b5cf6" },
  { name: "Website Builder", revenue: 28400, usage: 65, color: "#06b6d4" },
  { name: "Scraawl", revenue: 24100, usage: 78, color: "#3b82f6" },
  { name: "Job Portal", revenue: 15600, usage: 45, color: "#6366f1" },
  { name: "QR Generator", revenue: 8900, usage: 34, color: "#10b981" },
];

const subscriptionPlansData = [
  { name: "Enterprise", percentage: 45, color: "#8b5cf6" },
  { name: "Professional", percentage: 30, color: "#3b82f6" },
  { name: "Business", percentage: 20, color: "#06b6d4" },
  { name: "Basic", percentage: 5, color: "#10b981" },
];

// Task productivity data (for the weekly line chart)
const taskProductivityData = [
  { week: "Week 1", completed: 89, pending: 26 },
  { week: "Week 2", completed: 94, pending: 18 },
  { week: "Week 3", completed: 101, pending: 15 },
  { week: "Week 4", completed: 110, pending: 12 },
];

const REVENUE_MAX = 24000;
const ACTIVE_MAX = 180;
const TASK_MAX = 120;

// Y-axis tick labels
const REVENUE_TICKS = [0, 6000, 12000, 18000, 24000];
const TASK_TICKS = [0, 30, 60, 90, 120];

export default function AnalyticsPage() {
  const [range, setRange] = useState<string>("Last 30 days");
  const [showRangeMenu, setShowRangeMenu] = useState(false);

  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredActivityIndex, setHoveredActivityIndex] = useState<number | null>(
    null
  );

  // hovered week index for task productivity line chart
  const [hoveredWeekIndex, setHoveredWeekIndex] = useState<number | null>(null);

  // ----- simple SVG layout math for revenue chart -----
  const svgWidth = 420;
  const svgHeight = 260;
  const padding = { top: 24, right: 24, bottom: 40, left: 48 };
  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const revenuePoints = revenueData.map((point, index) => {
    const x = padding.left + (index / (revenueData.length - 1 || 1)) * innerWidth;
    const y =
      padding.top +
      innerHeight -
      (point.value / REVENUE_MAX) * innerHeight;

    return { x, y };
  });

  const revenueLinePath =
    "M " +
    revenuePoints
      .map((p) => `${p.x} ${p.y}`)
      .join(" L ");

  const revenueAreaPath = `
    M ${revenuePoints[0].x} ${padding.top + innerHeight}
    L ${revenuePoints
      .map((p) => `${p.x} ${p.y}`)
      .join(" L ")}
    L ${revenuePoints[revenuePoints.length - 1].x} ${
    padding.top + innerHeight
  }
    Z
  `;

  const hoveredRevenuePoint =
    hoveredMonthIndex != null ? revenuePoints[hoveredMonthIndex] : null;

  const hoveredRevenue =
    hoveredMonthIndex != null ? revenueData[hoveredMonthIndex] : null;

  const xPercent =
    hoveredRevenuePoint != null ? (hoveredRevenuePoint.x / svgWidth) * 100 : 0;

  const hoveredActivity =
    hoveredActivityIndex != null ? userActivityData[hoveredActivityIndex] : null;

  const [hoveredSlice, setHoveredSlice] = useState<any>(null);

  // ----- Task productivity line chart layout -----
  const taskSvgWidth = 900; // wider viewbox to mimic full-width feel
  const taskSvgHeight = 260;
  const taskPadding = { top: 32, right: 40, bottom: 56, left: 60 };
  const taskInnerWidth = taskSvgWidth - taskPadding.left - taskPadding.right;
  const taskInnerHeight = taskSvgHeight - taskPadding.top - taskPadding.bottom;

  const taskPointsCompleted = taskProductivityData.map((point, index) => {
    const x =
      taskPadding.left +
      (index / (taskProductivityData.length - 1 || 1)) * taskInnerWidth;
    const y =
      taskPadding.top +
      taskInnerHeight -
      (point.completed / TASK_MAX) * taskInnerHeight;
    return { x, y };
  });

  const taskPointsPending = taskProductivityData.map((point, index) => {
    const x =
      taskPadding.left +
      (index / (taskProductivityData.length - 1 || 1)) * taskInnerWidth;
    const y =
      taskPadding.top +
      taskInnerHeight -
      (point.pending / TASK_MAX) * taskInnerHeight;
    return { x, y };
  });

  const taskLineCompleted =
    "M " + taskPointsCompleted.map((p) => `${p.x} ${p.y}`).join(" L ");
  const taskLinePending =
    "M " + taskPointsPending.map((p) => `${p.x} ${p.y}`).join(" L ");

  const hoveredWeek =
    hoveredWeekIndex != null ? taskProductivityData[hoveredWeekIndex] : null;
  const hoveredTaskPoint =
    hoveredWeekIndex != null ? taskPointsCompleted[hoveredWeekIndex] : null;
  const taskTooltipXPercent =
    hoveredTaskPoint != null ? (hoveredTaskPoint.x / taskSvgWidth) * 100 : 0;

  // Calculate pie chart slices
  const getPieChartSlices = () => {
    let currentAngle = -90; // start at top
    return subscriptionPlansData.map((plan) => {
      const sliceAngle = (plan.percentage / 100) * 360;
      const gap = 2; // small gap between slices
      const startAngle = currentAngle + gap / 2;
      const endAngle = currentAngle + sliceAngle - gap / 2;
      currentAngle += sliceAngle;
      return { ...plan, startAngle, endAngle };
    });
  };

  const pieSlices = getPieChartSlices();

  const createPieSlice = (
    startAngle: number,
    endAngle: number,
    radius: number,
    innerRadius: number
  ) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;

    const x1 = 50 + radius * Math.cos(start);
    const y1 = 50 + radius * Math.sin(start);
    const x2 = 50 + radius * Math.cos(end);
    const y2 = 50 + radius * Math.sin(end);

    const ix1 = 50 + innerRadius * Math.cos(start);
    const iy1 = 50 + innerRadius * Math.sin(start);
    const ix2 = 50 + innerRadius * Math.cos(end);
    const iy2 = 50 + innerRadius * Math.sin(end);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${ix1} ${iy1} 
            L ${x1} ${y1} 
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} 
            L ${ix2} ${iy2} 
            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7ff]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f5f7ff] to-[#e5edff] px-6 py-6">
          {/* Header row */}
          <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Analytics &amp; Reports
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Comprehensive insights into your Osperra ecosystem performance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Range dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRangeMenu((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 border border-slate-200"
                >
                  <span>{range}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {showRangeMenu && (
                  <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white text-xs shadow-lg">
                    {RANGE_OPTIONS.map((option) => {
                      const selected = option === range;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setRange(option);
                            setShowRangeMenu(false);
                          }}
                          className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50 ${
                            selected ? "text-slate-900" : "text-slate-600"
                          }`}
                        >
                          <span>{option}</span>
                          {selected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Export button */}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(15,23,42,0.45)] hover:bg-slate-800"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </section>

          {/* Top metric cards */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              iconBg="bg-[#E2F3EC] text-[#16a34a]"
              label="Total Revenue"
              value="$23,800"
              sublabel="This month"
              trend="+18.2%"
            />
            <MetricCard
              iconBg="bg-[#E5EDFF] text-[#2563eb]"
              label="Active Users"
              value="178"
              sublabel="Across all modules"
              trend="+23.1%"
            />
            <MetricCard
              iconBg="bg-[#F4E9FF] text-[#7c3aed]"
              label="Avg Usage"
              value="67%"
              sublabel="Per module"
              trend="-3.4%"
              negative
            />
            <MetricCard
              iconBg="bg-[#FEF3C7] text-[#f97316]"
              label="Task Completion"
              value="108"
              sublabel="This week"
              trend="+31.8%"
            />
          </section>

          {/* Charts row */}
          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            {/* Revenue Growth card */}
            <div className="relative rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Revenue Growth
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Monthly revenue trends
              </p>

              <div className="relative mt-5 h-72 overflow-hidden rounded-2xl border border-[#E5E7FF] bg-gradient-to-b from-[#f5f3ff] to-white px-4 pb-6 pt-4">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="h-full w-full text-[#7c3aed]"
                  onMouseLeave={() => setHoveredMonthIndex(null)}
                >
                  <defs>
                    <linearGradient
                      id="revGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Y-axis */}
                  <line
                    x1={padding.left}
                    y1={padding.top}
                    x2={padding.left}
                    y2={padding.top + innerHeight}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                  {/* X-axis */}
                  <line
                    x1={padding.left}
                    y1={padding.top + innerHeight}
                    x2={padding.left + innerWidth}
                    y2={padding.top + innerHeight}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />

                  {/* Horizontal grid lines + labels */}
                  {REVENUE_TICKS.map((tick) => {
                    const ratio = tick / REVENUE_MAX;
                    const y = padding.top + (1 - ratio) * innerHeight;
                    const isZero = tick === 0;
                    return (
                      <g key={tick}>
                        {!isZero && (
                          <line
                            x1={padding.left}
                            y1={y}
                            x2={padding.left + innerWidth}
                            y2={y}
                            stroke="#EEF2FF"
                            strokeWidth="1"
                            strokeDasharray="2 4"
                          />
                        )}
                        <text
                          x={padding.left - 8}
                          y={y + 3}
                          fontSize={10}
                          textAnchor="end"
                          fill="#9CA3AF"
                        >
                          {tick}
                        </text>
                      </g>
                    );
                  })}

                  {/* Hover guideline */}
                  {hoveredMonthIndex != null && hoveredRevenuePoint && (
                    <line
                      x1={hoveredRevenuePoint.x}
                      y1={padding.top}
                      x2={hoveredRevenuePoint.x}
                      y2={padding.top + innerHeight}
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                  )}

                  {/* Area under the line */}
                  <path
                    d={revenueAreaPath}
                    fill="url(#revGradient)"
                    stroke="none"
                  />

                  {/* Line */}
                  <path
                    d={revenueLinePath}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {revenuePoints.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredMonthIndex === idx ? 6 : 5}
                      fill="#fff"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      onMouseEnter={() => setHoveredMonthIndex(idx)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}

                  {/* Month labels on X axis */}
                  {revenuePoints.map((p, idx) => (
                    <text
                      key={`label-${idx}`}
                      x={p.x}
                      y={padding.top + innerHeight + 18}
                      fontSize={11}
                      textAnchor="middle"
                      fill="#9CA3AF"
                    >
                      {revenueData[idx].month}
                    </text>
                  ))}
                </svg>

                {/* Tooltip */}
                {hoveredRevenue && hoveredRevenuePoint && (
                  <div
                    className="pointer-events-none absolute top-10 w-44 -translate-x-1/2 rounded-2xl bg-white px-4 py-3 text-xs shadow-[0_12px_30px_rgba(148,163,184,0.55)]"
                    style={{ left: `${xPercent}%` }}
                  >
                    <p className="font-medium text-slate-900">
                      {hoveredRevenue.month}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      revenue :{" "}
                      <span className="font-semibold">
                        {hoveredRevenue.value}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* User Activity card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                User Activity
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Daily active users and new signups
              </p>

              <div className="relative mt-5 h-72 rounded-2xl border border-[#E5E7FF] bg-gradient-to-b from-[#f5f7ff] to-white p-6">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-6 h-56 flex flex-col justify-between text-[10px] text-slate-400">
                  <span>180</span>
                  <span>135</span>
                  <span>90</span>
                  <span>45</span>
                  <span>0</span>
                </div>

                {/* grey highlight column on hover */}
                {hoveredActivityIndex != null && (
                  <div
                    className="pointer-events-none absolute top-6 bottom-20 w-16 rounded-lg bg-slate-100/70 transition-all"
                    style={{
                      left: `calc(3rem + ${
                        (hoveredActivityIndex / userActivityData.length) * 100
                      }%)`,
                      transform: "translateX(-50%)",
                    }}
                  />
                )}

                {/* Chart wrapper */}
                <div className="relative z-10 ml-8 h-56 flex items-end justify-between gap-2 pr-4">
                  {userActivityData.map((item, idx) => (
                    <div
                      key={item.day}
                      className="flex flex-col items-center flex-1 h-full cursor-pointer group"
                      onMouseEnter={() => setHoveredActivityIndex(idx)}
                      onMouseLeave={() => setHoveredActivityIndex(null)}
                    >
                      {/* Bars container */}
                      <div className="flex items-end justify-center gap-2 h-full w-full">
                        {/* Active bar (blue) */}
                        <div className="flex-1 flex items-end justify-center h-full">
                          <div
                            className="w-3 rounded-t-md bg-[#2563eb] transition-all duration-200 group-hover:opacity-80"
                            style={{
                              height: `${(item.active / ACTIVE_MAX) * 100}%`,
                            }}
                          />
                        </div>
                        {/* New bar (green) */}
                        <div className="flex-1 flex items-end justify-center h-full">
                          <div
                            className="w-3 rounded-t-md bg-[#16a34a] transition-all duration-200 group-hover:opacity-80"
                            style={{
                              height: `${(item.New / ACTIVE_MAX) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Day label */}
                      <span className="text-[11px] text-slate-500 font-medium mt-3 whitespace-nowrap">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-8 text-[11px] text-slate-500 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-5 rounded-sm bg-[#2563eb]" />
                    <span>active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-5 rounded-sm bg-[#16a34a]" />
                    <span>new</span>
                  </div>
                </div>

                {/* Tooltip */}
                {hoveredActivity && hoveredActivityIndex != null && (
                  <div
                    className="pointer-events-none absolute top-2 w-48 -translate-x-1/2 rounded-2xl bg-white px-4 py-3 text-xs shadow-[0_12px_30px_rgba(148,163,184,0.55)] z-20"
                    style={{
                      left: `calc(3rem + ${
                        ((hoveredActivityIndex + 0.5) /
                          userActivityData.length) *
                        100
                      }%)`,
                    }}
                  >
                    <p className="font-semibold text-slate-900">
                      {hoveredActivity.day}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-600">
                      <span className="text-slate-500">active:</span>{" "}
                      <span className="font-semibold text-[#2563eb]">
                        {hoveredActivity.active}
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      <span className="text-slate-500">new:</span>{" "}
                      <span className="font-semibold text-[#16a34a]">
                        {hoveredActivity.New}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Module Performance & Subscription Plans section */}
          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            {/* Module Performance card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Module Performance
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Usage and revenue by application
              </p>

              <div className="mt-6 space-y-5">
                {modulePerformanceData.map((module) => (
                  <div key={module.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">
                        {module.name}
                      </p>
                      <span className="text-sm font-semibold text-slate-900">
                        ${module.revenue.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* track */}
                      <div className="flex-1 h-1.5 rounded-full bg-[#E5E7F3] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${module.usage}%`,
                            backgroundColor: module.color,
                          }}
                        />
                      </div>
                      {/* usage pill */}
                      <span className="inline-flex min-w-[3rem] justify-center rounded-full bg-[#E5EDFF] px-2 py-0.5 text-xs font-semibold text-[#2563eb]">
                        {module.usage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Plans card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Subscription Plans
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Distribution by tier
              </p>

              <div className="mt-6 flex flex-col items-center gap-8">
                {/* Donut Chart */}
                <div className="relative flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-48 h-48 cursor-pointer"
                  >
                    {/* Soft background ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#EEF2FF"
                      strokeWidth="12"
                    />

                    {pieSlices.map((slice) => (
                      <path
                        key={slice.name}
                        d={createPieSlice(
                          slice.startAngle,
                          slice.endAngle,
                          42,
                          28 // inner radius smaller → bigger donut
                        )}
                        fill={slice.color}
                        onMouseEnter={() => setHoveredSlice(slice)}
                        onMouseLeave={() => setHoveredSlice(null)}
                        className="transition-all duration-200"
                        style={{
                          transformOrigin: "50% 50%",
                          transform:
                            hoveredSlice?.name === slice.name
                              ? "scale(1.06)"
                              : "scale(1)",
                        }}
                      />
                    ))}

                    {/* White inner cutout */}
                    <circle cx="50" cy="50" r="26" fill="#ffffff" />
                  </svg>

                  {/* Hover Tooltip inside the donut */}
                  {hoveredSlice && (
                    <div className="absolute text-center pointer-events-none">
                      <p className="text-[11px] text-slate-500">
                        {hoveredSlice.name}
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {hoveredSlice.percentage}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="w-full space-y-3">
                  {subscriptionPlansData.map((plan) => (
                    <div
                      key={plan.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: plan.color }}
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {plan.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {plan.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Task Productivity line chart (full-width) */}
          <section className="mt-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Task Productivity
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Weekly completion trends
              </p>

              <div className="relative mt-5 h-72 overflow-hidden rounded-2xl border border-[#E5E7FF] bg-gradient-to-b from-white to-[#f5f7ff] px-4 pb-6 pt-4">
                <svg
                  viewBox={`0 0 ${taskSvgWidth} ${taskSvgHeight}`}
                  className="h-full w-full"
                  onMouseLeave={() => setHoveredWeekIndex(null)}
                >
                  {/* Axes */}
                  <line
                    x1={taskPadding.left}
                    y1={taskPadding.top}
                    x2={taskPadding.left}
                    y2={taskPadding.top + taskInnerHeight}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                  <line
                    x1={taskPadding.left}
                    y1={taskPadding.top + taskInnerHeight}
                    x2={taskPadding.left + taskInnerWidth}
                    y2={taskPadding.top + taskInnerHeight}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />

                  {/* Horizontal grid lines + labels */}
                  {TASK_TICKS.map((tick) => {
                    const ratio = tick / TASK_MAX;
                    const y =
                      taskPadding.top + (1 - ratio) * taskInnerHeight;
                    const isZero = tick === 0;
                    return (
                      <g key={tick}>
                        {!isZero && (
                          <line
                            x1={taskPadding.left}
                            y1={y}
                            x2={taskPadding.left + taskInnerWidth}
                            y2={y}
                            stroke="#EEF2FF"
                            strokeWidth="1"
                            strokeDasharray="2 4"
                          />
                        )}
                        <text
                          x={taskPadding.left - 10}
                          y={y + 3}
                          fontSize={10}
                          textAnchor="end"
                          fill="#9CA3AF"
                        >
                          {tick}
                        </text>
                      </g>
                    );
                  })}

                  {/* Hover guideline */}
                  {hoveredWeekIndex != null && hoveredTaskPoint && (
                    <line
                      x1={hoveredTaskPoint.x}
                      y1={taskPadding.top}
                      x2={hoveredTaskPoint.x}
                      y2={taskPadding.top + taskInnerHeight}
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                  )}

                  {/* Completed line (green) */}
                  <path
                    d={taskLineCompleted}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Pending line (orange) */}
                  <path
                    d={taskLinePending}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points + labels */}
                  {taskPointsCompleted.map((p, idx) => (
                    <g key={`week-${idx}`}>
                      {/* completed point */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={hoveredWeekIndex === idx ? 6 : 5}
                        fill="#ffffff"
                        stroke="#10b981"
                        strokeWidth={2}
                        onMouseEnter={() => setHoveredWeekIndex(idx)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* pending point */}
                      <circle
                        cx={taskPointsPending[idx].x}
                        cy={taskPointsPending[idx].y}
                        r={hoveredWeekIndex === idx ? 6 : 5}
                        fill="#ffffff"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        onMouseEnter={() => setHoveredWeekIndex(idx)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* week label */}
                      <text
                        x={p.x}
                        y={taskPadding.top + taskInnerHeight + 22}
                        fontSize={11}
                        textAnchor="middle"
                        fill="#9CA3AF"
                      >
                        {taskProductivityData[idx].week}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Tooltip */}
                {hoveredWeek && hoveredTaskPoint && (
                  <div
                    className="pointer-events-none absolute top-10 w-48 -translate-x-1/2 rounded-2xl bg-white px-4 py-3 text-xs shadow-[0_12px_30px_rgba(148,163,184,0.55)]"
                    style={{ left: `${taskTooltipXPercent}%` }}
                  >
                    <p className="font-semibold text-slate-900">
                      {hoveredWeek.week}
                    </p>
                    <p className="mt-2 text-[11px] text-emerald-600">
                      <span className="text-slate-500">completed : </span>
                      <span className="font-semibold">
                        {hoveredWeek.completed}
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-amber-500">
                      <span className="text-slate-500">pending : </span>
                      <span className="font-semibold">
                        {hoveredWeek.pending}
                      </span>
                    </p>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-10 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="h-[3px] w-6 rounded-full bg-[#10b981]" />
                      <span className="h-2 w-2 rounded-full border border-[#10b981] bg-white" />
                    </span>
                    <span>completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="h-[3px] w-6 rounded-full bg-[#f59e0b]" />
                      <span className="h-2 w-2 rounded-full border border-[#f59e0b] bg-white" />
                    </span>
                    <span>pending</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Small metric card component ---------------- */

interface MetricCardProps {
  iconBg: string;
  label: string;
  value: string;
  sublabel: string;
  trend: string;
  negative?: boolean;
}

function MetricCard({
  iconBg,
  label,
  value,
  sublabel,
  trend,
  negative,
}: MetricCardProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
        <p className="mt-1 text-[11px] text-slate-400">{sublabel}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${
            negative
              ? "bg-rose-50 text-rose-500"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {trend}
        </span>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {label === "Total Revenue" && <DollarSign className="h-4 w-4" />}
          {label === "Active Users" && <Users className="h-4 w-4" />}
          {label === "Avg Usage" && <Activity className="h-4 w-4" />}
          {label === "Task Completion" && (
            <CheckCircle2 className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
}
