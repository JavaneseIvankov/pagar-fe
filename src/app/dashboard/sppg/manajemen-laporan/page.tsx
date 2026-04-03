import { SppgCreateReportContainer } from "@/containers/sppg-create-report-container";

export default function CreateReportPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl tracking-tight">
          Input Laporan Makan harian
        </h1>
        <p className="mt-2 text-muted-foreground">
          Lengkapi rincian menu, gizi, dan anggaran untuk laporan harian.
        </p>
      </div>

      <SppgCreateReportContainer />
    </div>
  );
}
