import { delayedValue } from "@/lib/utils";
import {
  getSppgDashboardSuccessResponseSchema,
  mapSppgDashboardDtoToDomain,
  type TSppgDashboard,
} from "@/types";
import { buildSppgDashboardResponse } from "./mock-backend";

export async function fetchSppgDashboard(): Promise<TSppgDashboard> {
  const rawData = await delayedValue(buildSppgDashboardResponse(), 300);
  const dto = getSppgDashboardSuccessResponseSchema.parse(rawData);

  return mapSppgDashboardDtoToDomain(dto.data);
}
