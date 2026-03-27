import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TPublicReview } from "@/types";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";
import { DashboardCard } from "./dashboard-card";

interface PublicReportsListProps {
  reports: TPublicReview[];
}

export function PublicReportsList({ reports }: PublicReportsListProps) {
  return (
    <DashboardCard>
      <div className="flex flex-col gap-3 border-border/50 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h3 className="font-bold text-lg">Laporan Masyarakat</h3>
        <Button
          variant="ghost"
          className="h-auto w-fit gap-2 p-0 font-semibold text-emerald-600 hover:bg-transparent hover:text-emerald-700"
        >
          Lihat Semua{" "}
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:hidden">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex gap-3 rounded-2xl border border-border/60 bg-white/75 p-4"
          >
            <Avatar className="size-10 shrink-0">
              <AvatarFallback className="bg-muted">
                <AvatarFallbackIcon />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {report.reporterName}
                  </p>
                  <p className="mt-1 line-clamp-3 break-words text-foreground/80 text-sm">
                    {report.content}
                  </p>
                  <p className="mt-2 truncate text-muted-foreground text-xs">
                    {report.forSppg.sppgName}
                  </p>
                </div>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
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
          </div>
        ))}
      </div>
      <div className="hidden flex-col gap-6 px-6 pb-6 sm:flex">
        <div className="mb-2 grid grid-cols-12 gap-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
          <div className="col-span-3">PELAPOR</div>
          <div className="col-span-7">LAPORAN & VENDOR</div>
          <div className="col-span-2 text-right">BUKTI FOTO</div>
        </div>

        {reports.map((report) => (
          <div key={report.id} className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex min-w-0 items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted">
                  <AvatarFallbackIcon />
                </AvatarFallback>
              </Avatar>
              <span className="truncate font-medium text-sm">
                {report.reporterName}
              </span>
            </div>
            <div className="col-span-7 min-w-0">
              <p className="line-clamp-2 break-words font-medium text-sm leading-relaxed">
                {report.content}
              </p>
              <p className="mt-1 truncate text-muted-foreground text-xs">
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
