"use client";

import { PeriodicReportTable } from "@/components/dashboard/sppg/periodic-report-table";
import { useSppgPeriodicReports } from "@/hooks/use-sppg-periodic-reports";

export function SppgPeriodicReportsContainer() {
  const { data, isLoading, isError } = useSppgPeriodicReports();

  if (isLoading) {
    return (
      <div className="py-8 text-muted-foreground">
        Memuat laporan periodik...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-destructive">
        Gagal memuat laporan periodik.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight">Laporan Periodik</h1>
        <p className="text-muted-foreground">
          Rekap laporan rincian menu dan anggaran
        </p>
      </div>
      <PeriodicReportTable data={data} />
    </div>
  );
}
