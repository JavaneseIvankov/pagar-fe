"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import type { TAdminProfile } from "@/types";

const adminAccountSettingsSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    username: z.string().min(5, "Username minimal 5 karakter"),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasNewPassword = !!data.newPassword;
    const hasConfirmPassword = !!data.confirmNewPassword;

    if (!hasNewPassword && !hasConfirmPassword) {
      return;
    }

    if (!hasNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kata sandi baru wajib diisi",
        path: ["newPassword"],
      });
    } else if ((data.newPassword?.length ?? 0) < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kata sandi minimal 8 karakter",
        path: ["newPassword"],
      });
    }

    if (!hasConfirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Konfirmasi kata sandi wajib diisi",
        path: ["confirmNewPassword"],
      });
    } else if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Konfirmasi kata sandi tidak cocok",
        path: ["confirmNewPassword"],
      });
    }
  });

export type AdminAccountSettingsFormValues = z.infer<
  typeof adminAccountSettingsSchema
>;

export interface AdminAccountSettingsCardProps {
  profile: Pick<TAdminProfile, "email" | "name" | "username">;
  onSubmit: (data: AdminAccountSettingsFormValues) => Promise<void> | void;
}

export function AdminAccountSettingsCard({
  profile,
  onSubmit,
}: AdminAccountSettingsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdminAccountSettingsFormValues>({
    resolver: zodResolver(adminAccountSettingsSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      username: profile.username,
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleFormSubmit = async (data: AdminAccountSettingsFormValues) => {
    await onSubmit(data);
    setIsEditing(false);
    reset({
      ...data,
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0eb363] text-white">
            <HugeiconsIcon icon={UserIcon} size={18} />
          </div>
          Pengaturan Akun
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-6 pt-2">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex h-full flex-col gap-5"
        >
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field data-invalid={!!errors.name} className="flex flex-col gap-2">
              <FieldLabel
                htmlFor="nama"
                className="font-semibold text-foreground"
              >
                Nama
              </FieldLabel>
              <Input
                id="nama"
                className="bg-background"
                disabled={!isEditing}
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name ? (
                <FieldError>{errors.name.message}</FieldError>
              ) : null}
            </Field>

            <Field
              data-invalid={!!errors.email}
              className="flex flex-col gap-2"
            >
              <FieldLabel
                htmlFor="email"
                className="font-semibold text-muted-foreground"
              >
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                className="bg-background"
                disabled={!isEditing}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <FieldError>{errors.email.message}</FieldError>
              ) : null}
            </Field>

            <Field
              data-invalid={!!errors.username}
              className="flex flex-col gap-2"
            >
              <FieldLabel
                htmlFor="username"
                className="font-semibold text-foreground"
              >
                Username
              </FieldLabel>
              <Input
                id="username"
                className="bg-background"
                disabled={!isEditing}
                {...register("username")}
                aria-invalid={!!errors.username}
              />
              {errors.username ? (
                <FieldError>{errors.username.message}</FieldError>
              ) : null}
            </Field>

            {!isEditing ? (
              <Field className="flex flex-col gap-2">
                <FieldLabel
                  htmlFor="password-placeholder"
                  className="font-semibold text-foreground"
                >
                  Kata Sandi
                </FieldLabel>
                <PasswordInput
                  id="password-placeholder"
                  defaultValue="********"
                  className="bg-background"
                  disabled
                  readOnly
                />
              </Field>
            ) : (
              <>
                <Field
                  data-invalid={!!errors.newPassword}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel
                    htmlFor="newPassword"
                    className="font-semibold text-foreground"
                  >
                    Kata Sandi Baru
                  </FieldLabel>
                  <PasswordInput
                    id="newPassword"
                    className="bg-background"
                    {...register("newPassword")}
                    aria-invalid={!!errors.newPassword}
                  />
                  {errors.newPassword ? (
                    <FieldError>{errors.newPassword.message}</FieldError>
                  ) : null}
                </Field>

                <Field
                  data-invalid={!!errors.confirmNewPassword}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel
                    htmlFor="confirmNewPassword"
                    className="font-semibold text-foreground"
                  >
                    Konfirmasi Kata Sandi Baru
                  </FieldLabel>
                  <PasswordInput
                    id="confirmNewPassword"
                    className="bg-background"
                    {...register("confirmNewPassword")}
                    aria-invalid={!!errors.confirmNewPassword}
                  />
                  {errors.confirmNewPassword ? (
                    <FieldError>{errors.confirmNewPassword.message}</FieldError>
                  ) : null}
                </Field>
              </>
            )}
          </FieldGroup>

          <div className="mt-auto flex flex-col gap-3 pt-4">
            {!isEditing ? (
              <Button
                type="button"
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => setIsEditing(true)}
              >
                Edit Profil Admin
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
      </CardContent>
    </Card>
  );
}
