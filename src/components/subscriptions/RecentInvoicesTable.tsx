"use client";

import { CreditCard, Download, ExternalLink } from "lucide-react";

type InvoiceRow = {
  id: string;
  date: string;
  amount: string;
  status: "Paid";
};

const invoices: InvoiceRow[] = [
  { id: "INV-2025-10", date: "Oct 1, 2025", amount: "$1046", status: "Paid" },
  { id: "INV-2025-09", date: "Sep 1, 2025", amount: "$1046", status: "Paid" },
  { id: "INV-2025-08", date: "Aug 1, 2025", amount: "$897", status: "Paid" },
  { id: "INV-2025-07", date: "Jul 1, 2025", amount: "$897", status: "Paid" },
];

export default function RecentInvoicesTable() {
  return (
    <div className="mt-6 rounded-[24px] border border-slate-100 bg-white px-8 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Recent Invoices
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Download and view your billing history
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <CreditCard className="h-4 w-4" />
          <span>Payment Methods</span>
        </button>
      </div>

      {/* Table */}
      <div className="mt-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/70 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="w-[25%] py-3 pr-4 font-medium">Invoice ID</th>
              <th className="w-[25%] py-3 px-4 font-medium">Date</th>
              <th className="w-[20%] py-3 px-4 font-medium">Amount</th>
              <th className="w-[15%] py-3 px-4 font-medium">Status</th>
              <th className="w-[15%] py-3 pl-4 font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-xs text-slate-700 dark:text-slate-100">
            {invoices.map(inv => (
              <tr
                key={inv.id}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="py-4 pr-4 align-middle text-[13px] text-slate-800 dark:text-slate-100">
                  {inv.id}
                </td>
                <td className="py-4 px-4 align-middle text-[13px] text-slate-700 dark:text-slate-200">
                  {inv.date}
                </td>
                <td className="py-4 px-4 align-middle text-[13px] text-slate-800 dark:text-slate-100">
                  {inv.amount}
                </td>
                <td className="py-4 px-4 align-middle">
                  <span className="inline-flex items-center rounded-full bg-[#E0F7EC] px-3 py-1 text-[11px] font-semibold text-[#16A34A]">
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 pl-4 pr-0 align-middle">
                  <div className="flex justify-end gap-2">
                    <IconButton ariaLabel="Download invoice">
                      <Download className="h-4 w-4" />
                    </IconButton>
                    <IconButton ariaLabel="Open invoice">
                      <ExternalLink className="h-4 w-4" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


type IconButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
};

function IconButton({ children, ariaLabel }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
