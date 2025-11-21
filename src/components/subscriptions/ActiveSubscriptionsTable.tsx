"use client";

type SubscriptionStatus = "Active" | "Trial";

type SubscriptionRow = {
  application: string;
  plan: string;
  status: SubscriptionStatus;
  usersUsed: number;
  usersTotal: number;
  renewalDate: string;
  monthlyCost: string;
  action: "Manage" | "Subscribe";
};

const rows: SubscriptionRow[] = [
  {
    application: "Scraawl",
    plan: "Professional",
    status: "Active",
    usersUsed: 24,
    usersTotal: 50,
    renewalDate: "Nov 15, 2025",
    monthlyCost: "$149",
    action: "Manage",
  },
  {
    application: "HireX",
    plan: "Enterprise",
    status: "Active",
    usersUsed: 18,
    usersTotal: 100,
    renewalDate: "Nov 22, 2025",
    monthlyCost: "$299",
    action: "Manage",
  },
  {
    application: "QR Generator",
    plan: "Basic",
    status: "Trial",
    usersUsed: 8,
    usersTotal: 10,
    renewalDate: "Nov 3, 2025",
    monthlyCost: "$0",
    action: "Subscribe",
  },
  {
    application: "Website Builder",
    plan: "Business",
    status: "Active",
    usersUsed: 15,
    usersTotal: 30,
    renewalDate: "Dec 1, 2025",
    monthlyCost: "$199",
    action: "Manage",
  },
  {
    application: "Jewellery E-Com",
    plan: "Enterprise",
    status: "Active",
    usersUsed: 32,
    usersTotal: 100,
    renewalDate: "Nov 18, 2025",
    monthlyCost: "$399",
    action: "Manage",
  },
  {
    application: "Job Portal",
    plan: "Pro",
    status: "Trial",
    usersUsed: 12,
    usersTotal: 25,
    renewalDate: "Nov 8, 2025",
    monthlyCost: "$0",
    action: "Subscribe",
  },
];

export default function ActiveSubscriptionsTable() {
  return (
    <div className="mt-6 rounded-[24px] border border-slate-100 bg-white px-8 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Card header */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Active Subscriptions
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Manage your application subscriptions and user allocations
        </p>
      </div>

      {/* Table (no inner scroll, full width) */}
      <div className="mt-4">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/70 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="w-[18%] py-3 pr-4 font-medium">Application</th>
              <th className="w-[14%] py-3 px-4 font-medium">Plan</th>
              <th className="w-[12%] py-3 px-4 font-medium">Status</th>
              <th className="w-[18%] py-3 px-4 font-medium">Users</th>
              <th className="w-[18%] py-3 px-4 font-medium">Renewal Date</th>
              <th className="w-[12%] py-3 px-4 font-medium">Monthly Cost</th>
              <th className="w-[8%] py-3 pl-4 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-700 dark:text-slate-100">
            {rows.map(row => (
              <tr
                key={row.application}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                {/* Application */}
                <td className="py-4 pr-4 align-middle text-sm font-medium text-slate-800 dark:text-slate-100">
                  {row.application}
                </td>

                {/* Plan badge */}
                <td className="py-4 px-4 align-middle">
                  <span className="inline-flex items-center rounded-full bg-[#E4ECFF] px-3 py-1 text-[11px] font-semibold text-[#2563EB]">
                    {row.plan}
                  </span>
                </td>

                {/* Status badge */}
                <td className="py-4 px-4 align-middle">
                  {row.status === "Active" ? (
                    <span className="inline-flex items-center rounded-full bg-[#E0F7EC] px-3 py-1 text-[11px] font-semibold text-[#16A34A]">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#FFF4E5] px-3 py-1 text-[11px] font-semibold text-[#F97316]">
                      Trial
                    </span>
                  )}
                </td>

                {/* Users usage + bar */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">
                      {row.usersUsed} / {row.usersTotal}
                    </span>
                    <UserUsageBar used={row.usersUsed} total={row.usersTotal} />
                  </div>
                </td>

                {/* Renewal date */}
                <td className="py-4 px-4 align-middle text-[13px] text-slate-700 dark:text-slate-200">
                  {row.renewalDate}
                </td>

                {/* Monthly cost */}
                <td className="py-4 px-4 align-middle text-[13px] text-slate-800 dark:text-slate-100">
                  {row.monthlyCost}
                </td>

                {/* Action buttons */}
                <td className="py-4 pl-4 pr-0 align-middle text-right">
                  {row.action === "Manage" ? (
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Manage
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rounded-lg bg-gradient-to-r from-[#3A7BFF] to-[#7B3CFF] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.45)] hover:brightness-110"
                    >
                      Subscribe
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


type UserUsageBarProps = {
  used: number;
  total: number;
};

function UserUsageBar({ used, total }: UserUsageBarProps) {
  const ratio = total === 0 ? 0 : Math.min(used / total, 1);
  const percentage = `${ratio * 100}%`;

  return (
    <div className="h-1.5 w-full max-w-[140px] rounded-full bg-slate-200">
      <div
        className="h-1.5 rounded-full bg-slate-900"
        style={{ width: percentage }}
      />
    </div>
  );
}
