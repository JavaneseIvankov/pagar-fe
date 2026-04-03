"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReviews } from "@/rpc/reports";

export interface SppgReviewListParams {
  limit?: number;
  page: number;
}

export function useSppgReviews(params: SppgReviewListParams) {
  const limit = params.limit ?? REPORT_LIST_PAGE_SIZE;

  return useQuery({
    queryKey: queryKeys.sppgReviews.list({
      page: params.page,
      limit,
    }),
    queryFn: () =>
      fetchSppgReviews({
        page: params.page,
        limit,
      }),
  });
}

export function useInfiniteSppgReviews(params?: { limit?: number }) {
  const limit = params?.limit ?? REPORT_LIST_PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: queryKeys.sppgReviews.infinite({
      limit,
    }),
    queryFn: ({ pageParam }) =>
      fetchSppgReviews({
        page: pageParam,
        limit,
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
