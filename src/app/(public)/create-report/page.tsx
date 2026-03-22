import { CreateReportForm } from "@/components/reports/create-report-form";

export default function CreateReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl text-left mb-8">
        <h1 className="text-h3 md:text-h1 font-bold mb-3">
          Laporan Kualitas Makanan
        </h1>
        <p className="text-body-2 md:text-body-3 text-muted-foreground">
          Bantu kami memantau kualitas gizi dan anggaran makanan publik dengan
          melaporkan temuan Anda di lapangan.
        </p>
      </div>
      <CreateReportForm />
    </div>
  );
}
