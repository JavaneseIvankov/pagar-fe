"use client";

import { ProfileHeaderCard } from "@/components/profile/profile-header-card";
import { SppgProfessionalInfoCard } from "@/components/profile/sppg-professional-info-card";
import { SppgAccountSettingsCard } from "@/components/profile/sppg-account-settings-card";
import { SppgProfileSkeleton } from "@/components/profile/sppg-profile-skeleton";
import { useCurrentSppgProfile } from "@/hooks/use-current-profile";

// TASK: implement mutation flow
export function SppgProfileContainer() {
  const { data: currentProfile, isError, isLoading } = useCurrentSppgProfile();

  if (isLoading) {
    return <SppgProfileSkeleton />;
  }

  if (isError || !currentProfile) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6">
        <ProfileHeaderCard profile={currentProfile} />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <SppgProfessionalInfoCard
          address={currentProfile.address}
          registrationCode={currentProfile.registrationCode}
        />
        <SppgAccountSettingsCard
          email={currentProfile.email}
          username={currentProfile.username}
        />
      </div>

      <p className="mt-8 text-center text-muted-foreground text-sm">
        Halaman ini masih bersifat baca-saja sampai kontrak pembaruan profil
        SPPG tersedia.
      </p>
    </div>
  );
}
