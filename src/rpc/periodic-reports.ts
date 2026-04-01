"use server";

import {
  mapPeriodicReportsDtoToDomain,
  type TSppgPeriodicReport,
} from "@/types";
import { createServerRpc } from "./server-rpc";

export interface FetchSppgPeriodicReportsParams {
  endDate: string;
  startDate: string;
}

export const fetchSppgPeriodicReports = createServerRpc(
  {
    operation: "fetchSppgPeriodicReports",
  },
  async (
    { client },
    { endDate, startDate }: FetchSppgPeriodicReportsParams,
  ): Promise<TSppgPeriodicReport[]> => {
    const dto = await client.getSppgPeriodicReports({
      query: {
        end_date: endDate,
        start_date: startDate,
      },
    });

    return mapPeriodicReportsDtoToDomain(dto.data);
  },
);
