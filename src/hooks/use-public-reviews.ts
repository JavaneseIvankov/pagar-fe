"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchPublicReviews } from "@/rpc/reports";

export function usePublicReviews() {
  return useQuery({
    queryKey: queryKeys.publicReviews.list(),
    queryFn: fetchPublicReviews,
  });
}
