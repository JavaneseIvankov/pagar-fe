"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReports } from "@/rpc/reports";

export interface SppgReportListParams {
  limit?: number;
  page: number;
  search?: string;
}

export function useSppgReports(params: SppgReportListParams) {
  const limit = params.limit ?? REPORT_LIST_PAGE_SIZE;

  return useQuery({
    queryKey: queryKeys.reports.list({
      page: params.page,
      limit,
      search: params.search,
    }),
    queryFn: () =>
      fetchSppgReports({
        page: params.page,
        limit,
        search: params.search,
      }),
  });
}

export function useInfiniteSppgReports(params?: {
  limit?: number;
  search?: string;
}) {
  const limit = params?.limit ?? REPORT_LIST_PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: queryKeys.reports.infinite({
      limit,
      search: params?.search,
    }),
    queryFn: ({ pageParam }) =>
      fetchSppgReports({
        page: pageParam,
        limit,
        search: params?.search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNextPage) {
        return undefined;
      }

      return lastPage.meta.page + 1;
    },
  });
}
