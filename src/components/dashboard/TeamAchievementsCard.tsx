// src/components/dashboard/TeamAchievementsCard.tsx

type AchievementBarProps = {
  label: string;
  current: number;
  total: number;
};

function AchievementBar({ label, current, total }: AchievementBarProps) {
  const pct = Math.min(100, (current / total) * 100);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs text-slate-700">
        <span>{label}</span>
        <span className="text-[11px] font-semibold text-[#E5792B]">
          {current}/{total}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-[#D7C6BF]">
        <div
          className="h-full rounded-full bg-[#070312]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TeamAchievementsCard() {
  return (
    <section className="mt-6 rounded-[24px] border border-[#F3DEC8] bg-gradient-to-r from-[#F7EFE6] via-[#F8F0EA] to-[#F7E7E3] px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-semibold text-slate-800">
        Team Achievements <span className="ml-1">🏆👩‍💻</span>
      </div>
      <p className="mt-1 text-xs text-slate-600">
        You&apos;re making great progress this month!
      </p>

      <AchievementBar
        label="Onboarded 3 new apps"
        current={3}
        total={5}
      />
      <AchievementBar
        label="Team members trained"
        current={8}
        total={10}
      />
    </section>
  );
}
