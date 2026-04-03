"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { queryKeys } from "@/lib/query-keys";
import { fetchPublicReviews } from "@/rpc/reports";

export interface PublicReviewListParams {
  limit?: number;
  page: number;
  search?: string;
}

export function usePublicReviews(params: PublicReviewListParams) {
  const limit = params.limit ?? REPORT_LIST_PAGE_SIZE;

  return useQuery({
    queryKey: queryKeys.publicReviews.list({
      page: params.page,
      limit,
      search: params.search,
    }),
    queryFn: () =>
      fetchPublicReviews({
        page: params.page,
        limit,
        search: params.search,
      }),
  });
}

export function useInfinitePublicReviews(params?: {
  limit?: number;
  search?: string;
}) {
  const limit = params?.limit ?? REPORT_LIST_PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: queryKeys.publicReviews.infinite({
      limit,
      search: params?.search,
    }),
    queryFn: ({ pageParam }) =>
      fetchPublicReviews({
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
