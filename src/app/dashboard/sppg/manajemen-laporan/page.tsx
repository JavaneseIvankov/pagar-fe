import { CreateReportForm } from "@/components/dashboard/sppg/create-report-form";

export default function CreateReportPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl tracking-tight">
          Input Laporan Makan harian
        </h1>
        <p className="mt-2 text-muted-foreground">
          Lengkapi rincian menu dan anggaran untuk tanggal 14 Maret 2026
        </p>
      </div>

      <CreateReportForm />
    </div>
  );
}
