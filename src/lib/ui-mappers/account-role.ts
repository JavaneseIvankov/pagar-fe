import type { TManagedAccountRole } from "@/types";
import type { StatusUi } from "./status-ui";

export function getManagedAccountRoleUi(role: TManagedAccountRole): StatusUi {
  switch (role) {
    case "SCHOOL":
      return {
        label: "Sekolah",
        className: "bg-[#e8f5ef] text-[#0eb363] hover:bg-[#e8f5ef]/80",
      };
    case "SPPG":
      return {
        label: "SPPG",
        className: "bg-[#e6f4fb] text-[#0ea5e9] hover:bg-[#e6f4fb]/80",
      };
  }
}
