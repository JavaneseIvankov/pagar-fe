import {
  AnalyticsUpIcon,
  Store01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { TAdminAccessDetail } from "@/types";

export interface AdminAccessDetailUi {
  icon: IconSvgElement;
  id: string;
  label: string;
}

export function mapAdminAccessDetailToUi(
  detail: TAdminAccessDetail,
): AdminAccessDetailUi {
  switch (detail.id) {
    case "manage-sppg":
      return {
        id: detail.id,
        label: detail.label,
        icon: Store01Icon,
      };
    case "manage-accounts":
      return {
        id: detail.id,
        label: detail.label,
        icon: UserIcon,
      };
    case "monitor-data":
      return {
        id: detail.id,
        label: detail.label,
        icon: AnalyticsUpIcon,
      };
    default:
      return {
        id: detail.id,
        label: detail.label,
        icon: UserIcon,
      };
  }
}
