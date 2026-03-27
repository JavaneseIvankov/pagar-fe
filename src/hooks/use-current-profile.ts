"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchCurrentAdminProfile,
  fetchCurrentProfile,
  fetchCurrentSppgProfile,
} from "@/rpc/profile";

export function useCurrentProfile() {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: fetchCurrentProfile,
  });
}

export function useCurrentSppgProfile() {
  return useQuery({
    queryKey: queryKeys.profile.sppg(),
    queryFn: fetchCurrentSppgProfile,
  });
}

export function useCurrentAdminProfile() {
  return useQuery({
    queryKey: queryKeys.profile.admin(),
    queryFn: fetchCurrentAdminProfile,
  });
}
