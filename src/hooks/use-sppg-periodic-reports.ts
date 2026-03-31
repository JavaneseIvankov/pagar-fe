"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchSppgPeriodicReports,
  type FetchSppgPeriodicReportsParams,
} from "@/rpc";

export function useSppgPeriodicReports(params: FetchSppgPeriodicReportsParams) {
  return useQuery({
    queryKey: queryKeys.periodicReports.list(params),
    queryFn: () => fetchSppgPeriodicReports(params),
  });
}
