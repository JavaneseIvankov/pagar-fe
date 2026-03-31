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
import type { TSchoolProfile } from "@/types";
import { createPasswordSchema } from "./profile-schema";

const schoolProfileFormSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    schoolName: z.string().min(3, "Nama sekolah minimal 3 karakter"),
    address: z.string().min(5, "Alamat sekolah minimal 5 karakter"),
  })
  .and(createPasswordSchema());

export type SchoolProfileFormValues = z.infer<typeof schoolProfileFormSchema>;

export interface SchoolProfileFormProps {
  initialData: TSchoolProfile;
  onSubmit: (data: SchoolProfileFormValues) => void;
}

export function SchoolProfileForm({
  initialData,
  onSubmit,
}: SchoolProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchoolProfileFormValues>({
    resolver: zodResolver(schoolProfileFormSchema),
    defaultValues: {
      username: initialData.username,
      schoolName: initialData.schoolName,
      address: initialData.address,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleFormSubmit = (data: SchoolProfileFormValues) => {
    onSubmit(data);
    setIsEditing(false);
    reset({
      ...data,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300">
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

          <Field data-invalid={!!errors.schoolName}>
            <FieldLabel htmlFor="schoolName">Nama sekolah</FieldLabel>
            <Input
              id="schoolName"
              placeholder="Nama sekolah"
              disabled={!isEditing}
              {...register("schoolName")}
              aria-invalid={!!errors.schoolName}
            />
            {errors.schoolName && (
              <FieldError>{errors.schoolName.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.address}>
            <FieldLabel htmlFor="address">Alamat Sekolah</FieldLabel>
            <Input
              id="address"
              placeholder="Alamat Sekolah"
              disabled={!isEditing}
              {...register("address")}
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <FieldError>{errors.address.message}</FieldError>
            )}
          </Field>

          {/* Password Section */}
          {!isEditing ? (
            <Field data-invalid={false}>
              <FieldLabel htmlFor="kataSandiPlaceholder">Kata Sandi</FieldLabel>
              <PasswordInput
                id="kataSandiPlaceholder"
                placeholder="********"
                disabled={true}
              />
            </Field>
          ) : (
            <div className="mt-2 flex flex-col gap-6 border-gray-100 border-t pt-2">
              <h3 className="font-medium text-foreground text-sm">
                Ubah Kata Sandi (Opsional)
              </h3>

              <Field data-invalid={!!errors.currentPassword}>
                <FieldLabel htmlFor="currentPassword">
                  Kata Sandi Saat Ini
                </FieldLabel>
                <PasswordInput
                  id="currentPassword"
                  placeholder="********"
                  {...register("currentPassword")}
                  aria-invalid={!!errors.currentPassword}
                />
                {errors.currentPassword && (
                  <FieldError>{errors.currentPassword.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.newPassword}>
                <FieldLabel htmlFor="newPassword">Kata Sandi Baru</FieldLabel>
                <PasswordInput
                  id="newPassword"
                  placeholder="********"
                  {...register("newPassword")}
                  aria-invalid={!!errors.newPassword}
                />
                {errors.newPassword && (
                  <FieldError>{errors.newPassword.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.confirmNewPassword}>
                <FieldLabel htmlFor="confirmNewPassword">
                  Ulangi Kata Sandi Baru
                </FieldLabel>
                <PasswordInput
                  id="confirmNewPassword"
                  placeholder="********"
                  {...register("confirmNewPassword")}
                  aria-invalid={!!errors.confirmNewPassword}
                />
                {errors.confirmNewPassword && (
                  <FieldError>{errors.confirmNewPassword.message}</FieldError>
                )}
              </Field>
            </div>
          )}
        </FieldGroup>

        <div className="flex flex-col gap-3 pt-4">
          {!isEditing ? (
            <Button
              type="button"
              className="w-full bg-green-600 text-white hover:bg-green-700"
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
                className="w-full bg-green-600 text-white hover:bg-green-700"
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
