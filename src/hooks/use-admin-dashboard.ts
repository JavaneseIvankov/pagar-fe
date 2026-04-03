"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchAdminDashboard, updateAdminComplaintStatus } from "@/rpc";
import type { TAdminComplaintStatus } from "@/types";

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.adminDashboard.detail(),
    queryFn: fetchAdminDashboard,
  });
}

export function useUpdateAdminComplaintStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; status: TAdminComplaintStatus }) =>
      updateAdminComplaintStatus({
        idReview: params.id,
        status: params.status,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminDashboard.detail(),
      });
    },
  });
}
