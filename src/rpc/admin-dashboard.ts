"use server";

import { mapAdminDashboardDtoToDomain, type TAdminDashboard } from "@/types";
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
