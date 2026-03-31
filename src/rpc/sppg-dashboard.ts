"use server";

import { mapSppgDashboardDtoToDomain, type TSppgDashboard } from "@/types";
import { createServerApiClient } from "./server-api-client";

export async function fetchSppgDashboard(): Promise<TSppgDashboard> {
  const client = createServerApiClient();
  const dto = await client.getSppgDashboard();

  return mapSppgDashboardDtoToDomain(dto.data);
}
