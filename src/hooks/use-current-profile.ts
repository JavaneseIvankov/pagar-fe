"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchCurrentProfile } from "@/rpc";

export function useCurrentProfile() {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: fetchCurrentProfile,
  });
}
