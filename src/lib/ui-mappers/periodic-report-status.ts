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
          "whitespace-nowrap rounded-md border-none bg-primary/10 px-4 py-1.5 font-semibold text-primary text-sm hover:bg-primary/20",
      };
    case "NOT_VERIFIED":
      return {
        label: "Belum Verifikasi",
        className:
          "whitespace-nowrap rounded-md border-none bg-accent/10 px-4 py-1.5 font-semibold text-accent-foreground text-sm hover:bg-accent/20",
      };
  }
}
