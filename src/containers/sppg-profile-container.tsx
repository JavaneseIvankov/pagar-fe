"use client";

import { toast } from "sonner";
import { ProfileHeaderCard } from "@/components/profile/profile-header-card";
import { SppgProfessionalInfoCard } from "@/components/profile/sppg-professional-info-card";
import { SppgAccountSettingsCard } from "@/components/profile/sppg-account-settings-card";
import { SppgProfileSkeleton } from "@/components/profile/sppg-profile-skeleton";
import {
  useCurrentSppgProfile,
  useUpdateCurrentSppgProfile,
} from "@/hooks/use-current-profile";

export function SppgProfileContainer() {
  const updateSppgProfileMutation = useUpdateCurrentSppgProfile();
  const { data: currentProfile, isError, isLoading } = useCurrentSppgProfile();

  if (isLoading) {
    return <SppgProfileSkeleton />;
  }

  if (isError || !currentProfile) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  const handleSubmit = async (data: { address: string; sppgName: string }) => {
    try {
      const result = await updateSppgProfileMutation.mutateAsync(data);
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui profil SPPG.",
      );
      throw error;
    }
  };

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6">
        <ProfileHeaderCard profile={currentProfile} />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <SppgProfessionalInfoCard
          initialData={{
            sppgName: currentProfile.sppgName,
            address: currentProfile.address,
            registrationCode: currentProfile.registrationCode,
          }}
          onSubmit={handleSubmit}
        />
        <SppgAccountSettingsCard
          email={currentProfile.email}
          username={currentProfile.username}
        />
      </div>
    </div>
  );
}
