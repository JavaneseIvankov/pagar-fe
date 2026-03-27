"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchAdminDashboard } from "@/rpc";

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.adminDashboard.detail(),
    queryFn: fetchAdminDashboard,
  });
}
