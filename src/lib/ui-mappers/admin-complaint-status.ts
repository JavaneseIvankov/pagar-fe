import type { TAdminComplaintStatus } from "@/types";
import type { StatusUi } from "./status-ui";

export type AdminComplaintStatus = TAdminComplaintStatus;

export function getAdminComplaintStatusUi(
  status: AdminComplaintStatus,
): StatusUi {
  switch (status) {
    case "PENDING":
      return {
        label: "Menunggu",
        className: "bg-sky-50 text-sky-600 hover:bg-sky-50",
      };
    case "INVESTIGATING":
      return {
        label: "Investigasi",
        className: "bg-orange-50 text-orange-600 hover:bg-orange-50",
      };
    case "RESOLVED":
      return {
        label: "Selesai",
        className: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
      };
  }
}
