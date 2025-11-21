import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
};
export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div
      className="
        rounded-2xl 
        p-6
        border
        bg-white
        text-slate-900
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        
        dark:bg-gradient-to-br dark:from-[#141C2F] dark:to-[#0F1626]
        dark:border-white/10
        dark:text-white
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex h-10 w-10 items-center justify-center 
            rounded-xl 
            bg-slate-200/80 
            dark:bg-white/10
          "
        >
          {icon}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
