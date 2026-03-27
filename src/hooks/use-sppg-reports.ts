"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgReports } from "@/rpc";

export function useSppgReports() {
  return useQuery({
    queryKey: queryKeys.reports.list(),
    queryFn: fetchSppgReports,
  });
}
