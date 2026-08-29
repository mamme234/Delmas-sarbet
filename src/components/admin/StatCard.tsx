import type { ComponentType } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  hint?: string;
}

export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink/8 bg-white/70 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink/55">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wine/8 text-wine">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <span className="font-display text-3xl text-ink">{value}</span>
      {hint && <span className="text-xs text-ink/40">{hint}</span>}
    </div>
  );
}
