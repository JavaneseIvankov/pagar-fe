"use client";

import { toast } from "sonner";
import {
  PublicProfileForm,
  type PublicProfileFormValues,
} from "@/components/profile/public-profile-form";
import { ProfileFormSkeleton } from "@/components/profile/profile-form-skeleton";
import {
  SchoolProfileForm,
  type SchoolProfileFormValues,
} from "@/components/profile/school-profile-form";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export function ProfileContainer() {
  const { data: currentUser, isLoading, isError } = useCurrentProfile();

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  if (isError || !currentUser) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  const handleSchoolSubmit = (data: SchoolProfileFormValues) => {
    console.log("School Submit data", data);
    toast.success("Profil sekolah berhasil diperbarui!");
  };

  const handlePublicSubmit = (data: PublicProfileFormValues) => {
    console.log("Public Submit data", data);
    toast.success("Profil pengguna berhasil diperbarui!");
  };

  return (
    <div className="flex w-full justify-center py-8">
      {currentUser.role === "SCHOOL" ? (
        <SchoolProfileForm
          initialData={currentUser}
          onSubmit={handleSchoolSubmit}
        />
      ) : currentUser.role === "PUBLIC" ? (
        <PublicProfileForm
          initialData={currentUser}
          onSubmit={handlePublicSubmit}
        />
      ) : (
        <div className="py-8 text-muted-foreground">
          Tipe profil ini belum didukung di halaman publik.
        </div>
      )}
    </div>
  );
}
