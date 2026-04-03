import { PublicCreateReportContainer } from "@/containers/public-create-report-container";

type CreateReportPageProps = {
  searchParams?: Promise<{
    sppgId?: string;
  }>;
};

export default async function CreateReportPage({
  searchParams,
}: CreateReportPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto mb-8 max-w-4xl text-left">
        <h1 className="mb-3 font-bold text-h3 md:text-h1">
          Laporan Kualitas Makanan
        </h1>
        <p className="text-body-2 text-muted-foreground md:text-body-3">
          Bantu kami memantau kualitas gizi dan anggaran makanan publik dengan
          melaporkan temuan Anda di lapangan.
        </p>
      </div>
      <PublicCreateReportContainer
        initialSppgId={resolvedSearchParams?.sppgId}
      />
    </div>
  );
}
