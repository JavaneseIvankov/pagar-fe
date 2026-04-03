"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import type { TPublicProfile } from "@/types";
import { createPasswordSchema } from "./profile-schema";
import { Avatar } from "../ui/avatar";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";

const publicProfileFormSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
  })
  .and(createPasswordSchema());

export type PublicProfileFormValues = z.infer<typeof publicProfileFormSchema>;

export interface PublicProfileFormProps {
  canEdit?: boolean;
  initialData: TPublicProfile;
  onSubmit: (data: PublicProfileFormValues) => Promise<void> | void;
}

export function PublicProfileForm({
  canEdit = true,
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

  const handleFormSubmit = async (data: PublicProfileFormValues) => {
    await onSubmit(data);
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
        <Avatar className="mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300">
          <AvatarFallbackIcon className="size-24" iconClassName="size-12" />
        </Avatar>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FieldGroup>
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              placeholder="Username"
              disabled={!canEdit || !isEditing}
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
              disabled={!canEdit}
              onClick={(e) => {
                e.preventDefault();
                if (!canEdit) {
                  return;
                }
                setIsEditing(true);
              }}
            >
              {canEdit ? "Edit Profil" : "Pembaruan Profil Tidak Tersedia"}
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
