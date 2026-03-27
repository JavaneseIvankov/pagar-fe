"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReportDetail } from "@/rpc";

export function useSppgReportDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id),
    queryFn: () => fetchSppgReportDetail(id),
    enabled: Boolean(id),
  });
}
