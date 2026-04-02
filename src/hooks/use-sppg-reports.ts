"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReports } from "@/rpc/reports";

export function useSppgReports() {
  return useQuery({
    queryKey: queryKeys.reports.list(),
    queryFn: fetchSppgReports,
  });
}
