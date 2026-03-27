import {
  AnalyticsUpIcon,
  Store01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import { AdminAccessDetailsCard } from "@/components/profile/admin-access-details-card";
import { AdminAccountSettingsCard } from "@/components/profile/admin-account-settings-card";

const MOCK_ACCESS_DETAILS = [
  { label: "Mengelola Vendor SPPG", icon: Store01Icon },
  { label: "Mengelola Akun", icon: UserIcon },
  { label: "Memantau Data", icon: AnalyticsUpIcon },
];

export function AdminProfileContainer() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="font-bold text-3xl text-foreground">Profil Pengguna</h1>
        <p className="font-medium text-muted-foreground text-sm">
          Profil Pengguna Admin
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <AdminAccountSettingsCard />
        <AdminAccessDetailsCard accessDetails={MOCK_ACCESS_DETAILS} />
      </div>
    </div>
  );
}
