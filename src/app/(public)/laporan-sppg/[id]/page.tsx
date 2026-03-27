import { SppgReportDetailContainer } from "@/containers/sppg-report-detail-container";

type SppgReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SppgReportDetailPage({
  params,
}: SppgReportDetailPageProps) {
  const { id } = await params;

  return <SppgReportDetailContainer id={id} />;
}
