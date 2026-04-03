"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminDashboard.detail(),
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status keluhan.",
      );
    },
  });
}
