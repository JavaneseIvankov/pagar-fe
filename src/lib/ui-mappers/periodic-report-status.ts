import type { TSppgPeriodicReport } from "@/types";
import type { StatusUi } from "./status-ui";

export type PeriodicReportVerificationStatus = TSppgPeriodicReport["status"];

export function getPeriodicReportVerificationStatusUi(
  status: PeriodicReportVerificationStatus,
): StatusUi {
  switch (status) {
    case "VERIFIED":
      return {
        label: "Terverifikasi",
        className:
          "whitespace-nowrap rounded-md border-none bg-emerald-50 px-4 py-1.5 font-semibold text-emerald-600 text-sm hover:bg-emerald-50",
      };
    case "NOT_VERIFIED":
      return {
        label: "Belum Verifikasi",
        className:
          "whitespace-nowrap rounded-md border-none bg-orange-50 px-4 py-1.5 font-semibold text-orange-600 text-sm hover:bg-orange-50",
      };
  }
}
