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
    <DashboardCard className="pb-6">
      <CardContent className="flex min-h-[150px] flex-col justify-between p-6 py-1">
        <div className="mb-6 flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconClassName,
            )}
          >
            {icon}
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "h-full min-w-[30%] rounded-full px-4 py-1 text-sm font-semibold",
              badgeClassName,
            )}
          >
            {badgeText}
          </Badge>
        </div>
        <div>
          <p className="text-body-4 mb-1 font-medium text-muted-foreground">
            {title}
          </p>
          <p className="text-h4 font-bold">{value}</p>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
