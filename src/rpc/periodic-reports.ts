import { delayedValue } from "@/lib/utils";
import { getSppgPeriodicReportsSuccessResponseSchema } from "@/lib/api/dto";
import {
  mapPeriodicReportsDtoToDomain,
  type TSppgPeriodicReport,
} from "@/types";
import { buildSppgPeriodicReportsResponse } from "./mock-backend";

export async function fetchSppgPeriodicReports(): Promise<
  TSppgPeriodicReport[]
> {
  const rawData = await delayedValue(buildSppgPeriodicReportsResponse(), 300);
  const dto = getSppgPeriodicReportsSuccessResponseSchema.parse(rawData);

  return mapPeriodicReportsDtoToDomain(dto.data);
}
