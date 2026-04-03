import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { TAdminStatistics } from "@/types";
import { WarningIcon } from "../exported-icons";
import { DashboardCard } from "./dashboard-card";

type VendorWarning = TAdminStatistics["sppgWarnings"]["sppgs"][number];

export interface AdminVendorWarningsProps {
  warnings: VendorWarning[];
}

export function AdminVendorWarnings({ warnings }: AdminVendorWarningsProps) {
  return (
    <DashboardCard className="border border-destructive/20 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <WarningIcon />
        </div>
        <h3 className="font-bold text-destructive">Peringatan Vendor</h3>
      </div>

      <div className="flex flex-col gap-3">
        {warnings.map((vendor) => (
          <div
            key={vendor.id}
            className="flex cursor-pointer items-center justify-between rounded-xl bg-destructive/10 p-4 transition-colors hover:bg-destructive/20"
          >
            <div>
              <h4 className="font-bold text-foreground">{vendor.name}</h4>
              <p className="text-muted-foreground text-sm">
                Rating : {vendor.rating} ({vendor.reportsCount} Laporan Baru)
              </p>
            </div>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              className="text-destructive"
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
