"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

const data = [
  { name: "Jewellery E-Com", value: 399, color: "#F59E0B", labelColor: "#F59E0B" },
  { name: "HireX", value: 299, color: "#8A3CFF", labelColor: "#8A3CFF" },
  { name: "Website Builder", value: 199, color: "#06B6D4", labelColor: "#06B6D4" },
  { name: "Scraawl", value: 149, color: "#2563EB", labelColor: "#2563EB" },
];

type DataItem = (typeof data)[number];

type CustomLabelProps = PieLabelRenderProps & {
  value?: number;
  name?: string;
  payload?: DataItem;
};

function CustomLabel(props: CustomLabelProps) {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    value,
    name,
    payload,
  } = props;

  if (!payload || value == null || !name) return null;

  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28; // push label outside the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={payload.labelColor}
      fontSize={12}
      fontWeight={500}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="middle"
    >
      {name}: ${value}
    </text>
  );
}

export default function CostDistributionChart() {
  return (
       <div className="rounded-3xl border border-slate-100 bg-white px-6 py-5 shadow-soft transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Cost Distribution
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Breakdown by application
        </p>
      </div>
      <div className="mt-4 h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value: unknown, name: unknown) => [
                String(value),
                String(name) + " :",
              ]}
              contentStyle={{
                borderRadius: 12,
                padding: 10,
                fontSize: 12,
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={1}
              label={CustomLabel}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
