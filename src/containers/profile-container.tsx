"use client";
import { toast } from "sonner";
import {
  ProfileForm,
  type ProfileFormValues,
} from "@/components/profile/profile-form";

export interface Profile {
  username: string;
  namaSekolah: string;
  alamatSekolah: string;
  kodeRegistrasi: string;
}

export function ProfileContainer() {
  // Mock data representing what would normally come from an RPC call
  const mockProfile: Profile = {
    username: "SDN123",
    namaSekolah: "SDN 01 Malang",
    alamatSekolah: "Jl. Veteran UB",
    kodeRegistrasi: "000111",
  };

  const handleSubmit = (data: ProfileFormValues) => {
    console.log("Submit data", data);

    // Simulate API call
    toast.success("Profil berhasil diperbarui!");
  };

  return (
    <div className="w-full flex justify-center py-8">
      <ProfileForm initialData={mockProfile} onSubmit={handleSubmit} />
    </div>
  );
}
