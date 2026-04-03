"use server";

import {
  mapAdminDashboardDtoToDomain,
  mapAdminDashboardReviewDtoToDomain,
  type TAdminComplaint,
  type TAdminComplaintStatus,
  type TAdminDashboard,
} from "@/types";
import { createServerRpc } from "./server-rpc";

export interface FetchAdminDashboardReviewsParams {
  limit?: number;
  page?: number;
}

function resolveAdminDashboardReviewParams(
  params?: FetchAdminDashboardReviewsParams,
) {
  return {
    page: params?.page && params.page > 0 ? Math.floor(params.page) : 1,
    limit: params?.limit && params.limit > 0 ? Math.floor(params.limit) : 10,
  };
}

export const fetchAdminDashboard = createServerRpc(
  {
    operation: "fetchAdminDashboard",
  },
  async ({ client }): Promise<TAdminDashboard> => {
    const dto = await client.getDashboard();

    return mapAdminDashboardDtoToDomain(dto.data);
  },
);

export const fetchAdminDashboardReviews = createServerRpc(
  {
    operation: "fetchAdminDashboardReviews",
  },
  async (
    { client },
    params?: FetchAdminDashboardReviewsParams,
  ): Promise<{
    items: TAdminComplaint[];
    meta: {
      currentPage: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  }> => {
    const normalizedParams = resolveAdminDashboardReviewParams(params);
    const dto = await client.getAdminDashboardReviews({
      query: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
      },
    });

    return {
      items: dto.data.map(mapAdminDashboardReviewDtoToDomain),
      meta: {
        currentPage: dto.meta.currentPage ?? normalizedParams.page,
        limit: dto.meta.limit ?? normalizedParams.limit,
        totalItems: dto.meta.totalItems ?? dto.data.length,
        totalPages:
          dto.meta.totalPages ??
          Math.max(
            1,
            Math.ceil(
              (dto.meta.totalItems ?? dto.data.length) / normalizedParams.limit,
            ),
          ),
      },
    };
  },
);

function mapAdminComplaintStatusToReviewStatus(
  status: TAdminComplaintStatus,
): "INVESTIGASI" | "MENUNGGU" | "SELESAI" {
  switch (status) {
    case "PENDING":
      return "MENUNGGU";
    case "INVESTIGATING":
      return "INVESTIGASI";
    case "RESOLVED":
      return "SELESAI";
  }
}

export const updateAdminComplaintStatus = createServerRpc(
  {
    operation: "updateAdminComplaintStatus",
  },
  async (
    { client },
    input: {
      idReview: string;
      status: TAdminComplaintStatus;
    },
  ): Promise<{ message: string }> => {
    const dto = await client.updateReviewStatus({
      params: {
        id_review: input.idReview,
      },
      body: {
        status_review: mapAdminComplaintStatusToReviewStatus(input.status),
      },
    });

    return {
      message: dto.message,
    };
  },
);
