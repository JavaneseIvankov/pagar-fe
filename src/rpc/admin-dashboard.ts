"use server";

import { mapAdminDashboardDtoToDomain, type TAdminDashboard } from "@/types";
import { createServerApiClient } from "./server-api-client";

export async function fetchAdminDashboard(): Promise<TAdminDashboard> {
  const client = createServerApiClient();
  const dto = await client.getDashboard();

  return mapAdminDashboardDtoToDomain(dto.data);
}
