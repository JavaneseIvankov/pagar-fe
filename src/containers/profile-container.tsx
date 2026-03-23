"use client";

import { toast } from "sonner";
import {
  PublicProfileForm,
  type PublicProfileFormValues,
} from "@/components/profile/public-profile-form";
import {
  SchoolProfileForm,
  type SchoolProfileFormValues,
} from "@/components/profile/school-profile-form";
import { schoolUsers } from "@/mock-data";
import type { TSchool, TUser } from "@/types/index";

export function ProfileContainer() {
  const mockSessionUser: TUser = schoolUsers[0];

  const handleSchoolSubmit = (data: SchoolProfileFormValues) => {
    console.log("School Submit data", data);
    toast.success("Profil sekolah berhasil diperbarui!");
  };

  const handlePublicSubmit = (data: PublicProfileFormValues) => {
    console.log("Public Submit data", data);
    toast.success("Profil berhasil diperbarui!");
  };

  return (
    <div className="w-full flex justify-center py-8">
      {mockSessionUser.role === "SCHOOL" && (
        <SchoolProfileForm
          initialData={mockSessionUser as TSchool}
          onSubmit={handleSchoolSubmit}
        />
      )}
      {mockSessionUser.role === "PUBLIC" && (
        <PublicProfileForm
          initialData={mockSessionUser as TUser}
          onSubmit={handlePublicSubmit}
        />
      )}
    </div>
  );
}
