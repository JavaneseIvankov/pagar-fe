import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { PersonIcon } from "@/components/exported-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TPublicReview } from "@/types";
import { DashboardCard } from "./dashboard-card";

interface PublicReportsListProps {
  reports: TPublicReview[];
}

export function PublicReportsList({ reports }: PublicReportsListProps) {
  return (
    <DashboardCard>
      <div className="flex items-center justify-between px-6 py-5">
        <h3 className="font-bold text-lg">Laporan Masyarakat</h3>
        <Button
          variant="ghost"
          className="h-auto gap-2 p-0 font-semibold text-emerald-600 hover:bg-transparent hover:text-emerald-700"
        >
          Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="mb-2 grid grid-cols-12 gap-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
          <div className="col-span-3">PELAPOR</div>
          <div className="col-span-7">LAPORAN & VENDOR</div>
          <div className="col-span-2 text-right">BUKTI FOTO</div>
        </div>

        {reports.map((report) => (
          <div key={report.id} className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted">
                  <PersonIcon className="text-foreground/30" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{report.reporterName}</span>
            </div>
            <div className="col-span-7">
              <p className="font-medium text-sm leading-relaxed">
                {report.content}
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                {report.forSppg.sppgName}
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <div className="relative h-16 w-24 overflow-hidden rounded-md bg-muted">
                {report.imageUrl ? (
                  <Image
                    src={report.imageUrl}
                    alt={report.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-200" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
