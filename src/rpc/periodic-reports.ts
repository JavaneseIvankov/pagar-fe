"use server";

import {
  mapPeriodicReportsDtoToDomain,
  type TSppgPeriodicReport,
} from "@/types";
import { createServerApiClient } from "./server-api-client";

export interface FetchSppgPeriodicReportsParams {
  endDate: string;
  startDate: string;
}

export async function fetchSppgPeriodicReports({
  endDate,
  startDate,
}: FetchSppgPeriodicReportsParams): Promise<TSppgPeriodicReport[]> {
  const client = createServerApiClient();
  const dto = await client.getSppgPeriodicReports({
    query: {
      end_date: endDate,
      start_date: startDate,
    },
  });

  return mapPeriodicReportsDtoToDomain(dto.data);
}
