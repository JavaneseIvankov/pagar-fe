"use client";

import { ProfileFormSkeleton } from "@/components/profile/profile-form-skeleton";
import {
  PublicProfileForm,
  type PublicProfileFormValues,
} from "@/components/profile/public-profile-form";
import {
  SchoolProfileForm,
  type SchoolProfileFormValues,
} from "@/components/profile/school-profile-form";
import {
  useCurrentProfile,
  useUpdateCurrentSchoolProfile,
} from "@/hooks/use-current-profile";

export function ProfileContainer() {
  const updateSchoolProfileMutation = useUpdateCurrentSchoolProfile();
  const { data: currentUser, isLoading, isError } = useCurrentProfile();

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  if (isError || !currentUser) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  const handleSchoolSubmit = (data: SchoolProfileFormValues) => {
    updateSchoolProfileMutation.mutate({
      schoolName: data.schoolName,
      address: data.address,
    });
  };

  const handlePublicSubmit = async (_data: PublicProfileFormValues) => {};

  const profileForm =
    currentUser.role === "SCHOOL" ? (
      <SchoolProfileForm
        initialData={currentUser}
        onSubmit={handleSchoolSubmit}
      />
    ) : currentUser.role === "PUBLIC" ? (
      <PublicProfileForm
        canEdit={false}
        initialData={currentUser}
        onSubmit={handlePublicSubmit}
      />
    ) : null;

  return (
    <div className="flex w-full justify-center py-8">
      {profileForm ? (
        <div className="flex w-full max-w-xl flex-col gap-3">{profileForm}</div>
      ) : (
        <div className="py-8 text-muted-foreground">
          Tipe profil ini belum didukung di halaman publik.
        </div>
      )}
    </div>
  );
}
