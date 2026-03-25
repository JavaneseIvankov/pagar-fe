import { WarningIcon } from "../exported-icons";
import { DashboardCard } from "./dashboard-card";

export interface AdminComplaintsOverviewProps {
  publicPercent: number;
  schoolPercent: number;
  total: number;
}

export function AdminComplaintsOverview({
  publicPercent,
  schoolPercent,
  total,
}: AdminComplaintsOverviewProps) {
  return (
    <DashboardCard className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <WarningIcon />
        </div>
        <h3 className="font-bold">Total Keluhan</h3>
      </div>

      <div className="flex items-center gap-8">
        <div className="font-black text-6xl">{total}</div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium text-xs">
              <span>Sekolah</span>
              <span className="text-muted-foreground">{schoolPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${schoolPercent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-medium text-xs">
              <span>Umum</span>
              <span className="text-muted-foreground">{publicPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${publicPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
