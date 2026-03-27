"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgPeriodicReports } from "@/rpc";

export function useSppgPeriodicReports() {
  return useQuery({
    queryKey: queryKeys.periodicReports.list(),
    queryFn: fetchSppgPeriodicReports,
  });
}
