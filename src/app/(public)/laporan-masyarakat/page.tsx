import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReportTabs } from "@/components/reports/report-tabs";
import { PublicReportContainer } from "@/containers/public-report-container";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { createServerQueryClient } from "@/lib/query/server-query-client";
import { queryKeys } from "@/lib/query-keys";
import { fetchPublicReviews } from "@/rpc/reports";

export default async function PublicReportPage() {
  const queryClient = createServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.publicReviews.list({
        page: 1,
        limit: REPORT_LIST_PAGE_SIZE,
      }),
      queryFn: () =>
        fetchPublicReviews({
          page: 1,
          limit: REPORT_LIST_PAGE_SIZE,
        }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.publicReviews.infinite({
        limit: REPORT_LIST_PAGE_SIZE,
      }),
      queryFn: ({ pageParam }) =>
        fetchPublicReviews({
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
        <PublicReportContainer />
      </div>
    </HydrationBoundary>
  );
}
