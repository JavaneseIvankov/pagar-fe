// src/containers/sppg-profile-container.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ProfileHeaderCard } from "@/components/profile/profile-header-card";
import { SppgProfessionalInfoCard } from "@/components/profile/sppg-professional-info-card";
import { SppgAccountSettingsCard } from "@/components/profile/sppg-account-settings-card";

export function SppgProfileContainer() {
  const profileData = {
    name: "CV. Berkah Nutrisi",
    description:
      "Penyedia nutrisi presisi tersertifikasi untuk program kesehatan nasional dengan fokus pada transparansi rantai pasok.",
    location: "Kota Malang, Kec. Kedungkandang",
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="flex h-full w-full flex-col pb-10">
      <div className="mb-6">
        <ProfileHeaderCard
          name={profileData.name}
          description={profileData.description}
          location={profileData.location}
        />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <SppgProfessionalInfoCard />
        <SppgAccountSettingsCard />
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          className="w-full rounded-lg bg-[#0eb363] py-6 font-semibold text-lg text-white hover:bg-[#0aa65a]"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
}
