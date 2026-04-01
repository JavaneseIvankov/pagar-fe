"use server";

import { mapSppgDashboardDtoToDomain, type TSppgDashboard } from "@/types";
import { createServerRpc } from "./server-rpc";

export const fetchSppgDashboard = createServerRpc(
  {
    operation: "fetchSppgDashboard",
  },
  async ({ client }): Promise<TSppgDashboard> => {
    const dto = await client.getSppgDashboard();

    return mapSppgDashboardDtoToDomain(dto.data);
  },
);
