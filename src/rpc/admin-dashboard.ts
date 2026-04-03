"use server";

import {
  mapAdminDashboardDtoToDomain,
  type TAdminComplaintStatus,
  type TAdminDashboard,
} from "@/types";
import { createServerRpc } from "./server-rpc";

export const fetchAdminDashboard = createServerRpc(
  {
    operation: "fetchAdminDashboard",
  },
  async ({ client }): Promise<TAdminDashboard> => {
    const dto = await client.getDashboard();

    return mapAdminDashboardDtoToDomain(dto.data);
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
