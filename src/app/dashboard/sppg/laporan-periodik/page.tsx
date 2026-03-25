import { PeriodicReportTable } from "@/components/dashboard/sppg/periodic-report-table";
import { sppgPeriodicReports } from "@/mock-data";

export default function SppgPeriodicReportPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col p-8">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight">Laporan Periodik</h1>
        <p className="text-muted-foreground">
          Rekap laporan rincian menu dan anggaran
        </p>
      </div>

      {/* Main Table component (Client component handling filters) */}
      <PeriodicReportTable data={sppgPeriodicReports} />
    </div>
  );
}
