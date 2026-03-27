import { delayedValue } from "@/lib/utils";
import {
  getAdminDashboardSuccessResponseSchema,
  mapAdminDashboardDtoToDomain,
  type TAdminDashboard,
} from "@/types";
import { buildAdminDashboardResponse } from "./mock-backend";

export async function fetchAdminDashboard(): Promise<TAdminDashboard> {
  const rawData = await delayedValue(buildAdminDashboardResponse(), 300);
  const dto = getAdminDashboardSuccessResponseSchema.parse(rawData);

  return mapAdminDashboardDtoToDomain(dto.data);
}
