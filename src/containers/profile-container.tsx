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

  const handleSchoolSubmit = async (data: SchoolProfileFormValues) => {
    try {
      await updateSchoolProfileMutation.mutateAsync({
        schoolName: data.schoolName,
        address: data.address,
      });
      toast.success("Profil sekolah berhasil diperbarui!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui profil sekolah.",
      );
      throw error;
    }
  };

  const handlePublicSubmit = (data: PublicProfileFormValues) => {
    console.log("Public Submit data", data);
    toast.success("Profil pengguna berhasil diperbarui!");
  };

  const footerNote =
    currentUser.role === "SCHOOL"
      ? "Baca dan simpan nama/alamat sekolah sudah memakai backend. Username dan kata sandi masih menunggu kontrak pembaruan terpisah."
      : currentUser.role === "PUBLIC"
        ? "Data profil publik di halaman ini masih memakai fallback frontend karena kontrak baca profil publik belum tersedia. Perubahannya juga masih placeholder."
        : null;

  const profileForm =
    currentUser.role === "SCHOOL" ? (
      <SchoolProfileForm
        initialData={currentUser}
        onSubmit={handleSchoolSubmit}
      />
    ) : currentUser.role === "PUBLIC" ? (
      <PublicProfileForm
        initialData={currentUser}
        onSubmit={handlePublicSubmit}
      />
    ) : null;

  return (
    <div className="flex w-full justify-center py-8">
      {profileForm ? (
        <div className="flex w-full max-w-xl flex-col gap-3">
          {profileForm}
          {footerNote ? (
            <div className="rounded-xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-amber-950 text-sm leading-relaxed">
              {footerNote}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="py-8 text-muted-foreground">
          Tipe profil ini belum didukung di halaman publik.
        </div>
      )}
    </div>
  );
}
