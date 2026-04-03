"use client";

import { AdminAccessDetailsCard } from "@/components/profile/admin-access-details-card";
import { AdminAccountSettingsCard } from "@/components/profile/admin-account-settings-card";
import { AdminProfileSkeleton } from "@/components/profile/admin-profile-skeleton";
import {
  useCurrentAdminProfile,
  useUpdateCurrentAdminProfile,
} from "@/hooks/use-current-profile";
import { mapAdminAccessDetailToUi } from "@/lib/ui-mappers";

export function AdminProfileContainer() {
  const updateAdminProfileMutation = useUpdateCurrentAdminProfile();
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
  const handleSubmit = (data: {
    confirmNewPassword?: string;
    email: string;
    name: string;
    newPassword?: string;
    username: string;
  }) => {
    updateAdminProfileMutation.mutate({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.newPassword || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="font-bold text-3xl text-foreground">Profil Pengguna</h1>
        <p className="font-medium text-muted-foreground text-sm">
          Profil Pengguna Admin
        </p>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-accent-foreground text-sm leading-relaxed">
        Profil admin sekarang dibaca dari backend. Detail akses di samping masih
        memakai metadata placeholder frontend sampai backend menyediakan data
        izin yang lebih rinci.
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <AdminAccountSettingsCard
          profile={currentProfile}
          onSubmit={handleSubmit}
        />
        <AdminAccessDetailsCard accessDetails={accessDetails} />
      </div>

      <p className="text-center text-muted-foreground text-sm">
        Nama, email, username, dan kata sandi admin sudah bisa diperbarui.
        Detail akses tetap mengikuti placeholder frontend sampai backend
        mengirimkan metadata izin yang lengkap.
      </p>
    </div>
  );
}
