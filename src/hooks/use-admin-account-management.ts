"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchAdminActiveAccounts,
  fetchAdminPendingAccounts,
  updateAdminAccountStatus,
} from "@/rpc";
import type { TAdminAccountDecision } from "@/types";

export function useAdminActiveAccounts() {
  return useQuery({
    queryKey: queryKeys.adminAccounts.active(),
    queryFn: fetchAdminActiveAccounts,
  });
}

export function useAdminPendingAccounts() {
  return useQuery({
    queryKey: queryKeys.adminAccounts.pending(),
    queryFn: fetchAdminPendingAccounts,
  });
}

export function useUpdateAdminAccountStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { idUser: string; status: TAdminAccountDecision }) =>
      updateAdminAccountStatus(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.adminAccounts.active(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.adminAccounts.pending(),
        }),
      ]);
    },
  });
}
