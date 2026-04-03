import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReportTabs } from "@/components/reports/report-tabs";
import { SppgReportContainer } from "@/containers/sppg-report-container";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { createServerQueryClient } from "@/lib/query/server-query-client";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReports } from "@/rpc/reports";

export default async function SppgReportPage() {
  const queryClient = createServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.reports.list({
        page: 1,
        limit: REPORT_LIST_PAGE_SIZE,
      }),
      queryFn: () =>
        fetchSppgReports({
          page: 1,
          limit: REPORT_LIST_PAGE_SIZE,
        }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.reports.infinite({
        limit: REPORT_LIST_PAGE_SIZE,
      }),
      queryFn: ({ pageParam }) =>
        fetchSppgReports({
          page: pageParam,
          limit: REPORT_LIST_PAGE_SIZE,
        }),
      initialPageParam: 1,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-10">
        <ReportTabs />
        <SppgReportContainer />
      </div>
    </HydrationBoundary>
  );
}
