"use client";

import { AdminAccessDetailsCard } from "@/components/profile/admin-access-details-card";
import { AdminAccountSettingsCard } from "@/components/profile/admin-account-settings-card";
import { AdminProfileSkeleton } from "@/components/profile/admin-profile-skeleton";
import { useCurrentAdminProfile } from "@/hooks/use-current-profile";
import { mapAdminAccessDetailToUi } from "@/lib/ui-mappers";

// TASK: implement mutation flow
export function AdminProfileContainer() {
  const { data: currentProfile, isError, isLoading } = useCurrentAdminProfile();

  if (isLoading) {
    return <AdminProfileSkeleton />;
  }

  if (isError || !currentProfile) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  const accessDetails = currentProfile.accessDetails.map(
    mapAdminAccessDetailToUi,
  );

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="font-bold text-3xl text-foreground">Profil Pengguna</h1>
        <p className="font-medium text-muted-foreground text-sm">
          Profil Pengguna Admin
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <AdminAccountSettingsCard profile={currentProfile} />
        <AdminAccessDetailsCard accessDetails={accessDetails} />
      </div>

      <p className="text-center text-muted-foreground text-sm">
        Halaman ini masih bersifat baca-saja sampai kontrak pembaruan profil
        admin tersedia.
      </p>
    </div>
  );
}
