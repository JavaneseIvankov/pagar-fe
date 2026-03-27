import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardCard } from "./dashboard-card";

export interface SummaryCardProps {
  icon: ReactNode;
  iconClassName?: string;
  badgeText: string;
  badgeClassName?: string;
  title: string;
  value: string;
}

export function SummaryCard({
  icon,
  iconClassName,
  badgeText,
  badgeClassName,
  title,
  value,
}: SummaryCardProps) {
  return (
    <DashboardCard className="page-enter overflow-hidden">
      <CardContent className="flex min-h-[156px] flex-col justify-between p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl",
              iconClassName,
            )}
          >
            {icon}
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "max-w-full rounded-full px-3 py-1 text-center font-semibold text-sm",
              badgeClassName,
            )}
          >
            {badgeText}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 font-medium text-body-4 text-muted-foreground">
            {title}
          </p>
          <p className="text-balance font-bold text-h4">{value}</p>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
