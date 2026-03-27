import type { ReactNode } from "react";
import { SummaryCard } from "@/components/dashboard/summary-card";

export interface AdminSummaryStatItem {
  badgeClassName: string;
  badgeText: string;
  icon: ReactNode;
  iconClassName: string;
  title: string;
  value: string;
}

export interface AdminSummaryStatsProps {
  stats: AdminSummaryStatItem[];
}

export function AdminSummaryStats({ stats }: AdminSummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <SummaryCard
          key={stat.title}
          icon={stat.icon}
          iconClassName={stat.iconClassName}
          badgeText={stat.badgeText}
          badgeClassName={stat.badgeClassName}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
}
