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
import type { TUser } from "@/types/index";
import { createPasswordSchema } from "./profile-schema";

const publicProfileFormSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
  })
  .and(createPasswordSchema());

export type PublicProfileFormValues = z.infer<typeof publicProfileFormSchema>;

export interface PublicProfileFormProps {
  initialData: TUser;
  onSubmit: (data: PublicProfileFormValues) => void;
}

export function PublicProfileForm({
  initialData,
  onSubmit,
}: PublicProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PublicProfileFormValues>({
    resolver: zodResolver(publicProfileFormSchema),
    defaultValues: {
      username: initialData.username,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleFormSubmit = (data: PublicProfileFormValues) => {
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
            <div className="flex flex-col gap-6 pt-2 border-t border-gray-100 mt-2">
              <h3 className="text-sm font-medium text-foreground">
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
