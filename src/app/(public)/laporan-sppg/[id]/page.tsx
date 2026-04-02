import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { SppgReportDetailContainer } from "@/containers/sppg-report-detail-container";
import { createServerQueryClient } from "@/lib/query/server-query-client";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReportDetail } from "@/rpc/reports";

type SppgReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SppgReportDetailPage({
  params,
}: SppgReportDetailPageProps) {
  const { id } = await params;
  const queryClient = createServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.reports.detail(id),
    queryFn: () => fetchSppgReportDetail(id),
  });

  const report = queryClient.getQueryData<
    Awaited<ReturnType<typeof fetchSppgReportDetail>>
  >(queryKeys.reports.detail(id));

  if (!report) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SppgReportDetailContainer id={id} />
    </HydrationBoundary>
  );
}
