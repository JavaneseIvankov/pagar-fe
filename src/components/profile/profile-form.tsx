"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const profileFormSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    namaSekolah: z.string().min(3, "Nama sekolah minimal 3 karakter"),
    alamatSekolah: z.string().min(5, "Alamat sekolah minimal 5 karakter"),
    kodeRegistrasi: z.string().min(3, "Kode registrasi minimal 3 karakter"),
    kataSandi: z.string().optional(),
    konfirmasiKataSandi: z.string().optional(),
  })
  .refine(
    (data) => {
      // If kataSandi is provided, konfirmasiKataSandi must match
      if (data.kataSandi && data.kataSandi !== data.konfirmasiKataSandi) {
        return false;
      }
      return true;
    },
    {
      message: "Konfirmasi kata sandi tidak cocok",
      path: ["konfirmasiKataSandi"],
    },
  );

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export interface ProfileFormProps {
  initialData: {
    username: string;
    namaSekolah: string;
    alamatSekolah: string;
    kodeRegistrasi: string;
  };
  onSubmit: (data: ProfileFormValues) => void;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: initialData.username,
      namaSekolah: initialData.namaSekolah,
      alamatSekolah: initialData.alamatSekolah,
      kodeRegistrasi: initialData.kodeRegistrasi,
      kataSandi: "",
      konfirmasiKataSandi: "",
    },
  });

  const handleFormSubmit = (data: ProfileFormValues) => {
    onSubmit(data);
    setIsEditing(false); // Switch back to view mode after submit
    // Reset password fields after save
    reset({
      ...data,
      kataSandi: "",
      konfirmasiKataSandi: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(); // Revert to initialData + empty passwords
  };

  return (
    <div className="w-full max-w-xl p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-2">
          <HugeiconsIcon icon={User} size={48} className="text-white" />
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FieldGroup>
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              placeholder="Username"
              disabled={!isEditing}
              {...register("username")}
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <FieldError>{errors.username.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.namaSekolah}>
            <FieldLabel htmlFor="namaSekolah">Nama sekolah</FieldLabel>
            <Input
              id="namaSekolah"
              placeholder="Nama sekolah"
              disabled={!isEditing}
              {...register("namaSekolah")}
              aria-invalid={!!errors.namaSekolah}
            />
            {errors.namaSekolah && (
              <FieldError>{errors.namaSekolah.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.alamatSekolah}>
            <FieldLabel htmlFor="alamatSekolah">Alamat Sekolah</FieldLabel>
            <Input
              id="alamatSekolah"
              placeholder="Alamat Sekolah"
              disabled={!isEditing}
              {...register("alamatSekolah")}
              aria-invalid={!!errors.alamatSekolah}
            />
            {errors.alamatSekolah && (
              <FieldError>{errors.alamatSekolah.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.kodeRegistrasi}>
            <FieldLabel htmlFor="kodeRegistrasi">Kode Registrasi</FieldLabel>
            <Input
              id="kodeRegistrasi"
              placeholder="Kode Registrasi"
              disabled={!isEditing}
              {...register("kodeRegistrasi")}
              aria-invalid={!!errors.kodeRegistrasi}
            />
            {errors.kodeRegistrasi && (
              <FieldError>{errors.kodeRegistrasi.message}</FieldError>
            )}
          </Field>

          {/* Password fields only shown/editable when in edit mode or read-only as placeholder when view mode */}
          <Field data-invalid={!!errors.kataSandi}>
            <FieldLabel htmlFor="kataSandi">Kata Sandi</FieldLabel>
            <PasswordInput
              id="kataSandi"
              placeholder="********"
              disabled={!isEditing}
              {...register("kataSandi")}
              aria-invalid={!!errors.kataSandi}
            />
            {errors.kataSandi && (
              <FieldError>{errors.kataSandi.message}</FieldError>
            )}
          </Field>

          {isEditing && (
            <Field data-invalid={!!errors.konfirmasiKataSandi}>
              <FieldLabel htmlFor="konfirmasiKataSandi">
                Konfirmasi Kata Sandi
              </FieldLabel>
              <PasswordInput
                id="konfirmasiKataSandi"
                placeholder="********"
                {...register("konfirmasiKataSandi")}
                aria-invalid={!!errors.konfirmasiKataSandi}
              />
              {errors.konfirmasiKataSandi && (
                <FieldError>{errors.konfirmasiKataSandi.message}</FieldError>
              )}
            </Field>
          )}
        </FieldGroup>

        <div className="flex flex-col gap-3 pt-2">
          {!isEditing ? (
            <Button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit Profil
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                Simpan Perubahan
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Batal
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
