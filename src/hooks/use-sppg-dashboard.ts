"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchSppgDashboard } from "@/rpc";

export function useSppgDashboard() {
  return useQuery({
    queryKey: queryKeys.sppgDashboard.detail(),
    queryFn: fetchSppgDashboard,
  });
}
