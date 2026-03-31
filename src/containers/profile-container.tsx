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

  const footerNote =
    currentUser.role === "SCHOOL"
      ? "Data profil sekolah sudah memakai kontrak baca backend. Perubahannya masih placeholder sampai kontrak pembaruan sekolah dipakai penuh."
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
