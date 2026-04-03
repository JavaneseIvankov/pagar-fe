"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchAdminDashboard,
  fetchAdminDashboardReviews,
  updateAdminComplaintStatus,
} from "@/rpc";
import type { TAdminComplaintStatus } from "@/types";

export interface AdminDashboardReviewListParams {
  limit?: number;
  page: number;
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.adminDashboard.detail(),
    queryFn: fetchAdminDashboard,
  });
}

export function useAdminDashboardReviews(
  params: AdminDashboardReviewListParams,
) {
  const limit = params.limit ?? REPORT_LIST_PAGE_SIZE;

  return useQuery({
    queryKey: queryKeys.adminDashboard.reviews.list({
      page: params.page,
      limit,
    }),
    queryFn: () =>
      fetchAdminDashboardReviews({
        page: params.page,
        limit,
      }),
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
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.adminDashboard.detail(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.adminDashboard.reviews.all(),
        }),
      ]);
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
