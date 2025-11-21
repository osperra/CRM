"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

const data = [
  { month: "May", value: 750 },
  { month: "Jun", value: 850 },
  { month: "Jul", value: 900 },
  { month: "Aug", value: 900 },
  { month: "Sep", value: 1050 },
  { month: "Oct", value: 1050 },
];

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const v = payload[0].value as number;

  return (
    <div className="rounded-2xl bg-white px-4 py-3 text-xs shadow-[0_10px_30px_rgba(15,23,42,0.18)] dark:bg-slate-900 dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
      <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
        {label}
      </div>
      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-300">
        spend :{" "}
        <span className="font-semibold text-[#8A3CFF]">
          {v}
        </span>
      </div>
    </div>
  );
}

export default function MonthlySpendingChart() {
  return (
    <div className="flex flex-col rounded-[24px] border border-slate-100 bg-white px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        Monthly Spending Trend
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Your subscription costs over time
      </p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 10, right: 20, top: 20 }}>
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#CBD5F5" }}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
            />
            <YAxis
              domain={[0, 1200]}
              tickLine={false}
              axisLine={{ stroke: "#CBD5F5" }}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8A3CFF"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#8A3CFF" }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "#fff",
                fill: "#8A3CFF",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
