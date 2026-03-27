"use client";

import { toast } from "sonner";
import {
  SchoolProfileForm,
  type SchoolProfileFormValues,
} from "@/components/profile/school-profile-form";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import type { TSchool } from "@/types";

export function ProfileContainer() {
  const { data: currentUser, isLoading, isError } = useCurrentProfile();

  if (isLoading) {
    return <div className="py-8 text-muted-foreground">Memuat profil...</div>;
  }

  if (isError || !currentUser) {
    return <div className="py-8 text-destructive">Gagal memuat profil.</div>;
  }

  const handleSchoolSubmit = (data: SchoolProfileFormValues) => {
    console.log("School Submit data", data);
    toast.success("Profil sekolah berhasil diperbarui!");
  };

  return (
    <div className="flex w-full justify-center py-8">
      <SchoolProfileForm
        initialData={currentUser as TSchool}
        onSubmit={handleSchoolSubmit}
      />
    </div>
  );
}
