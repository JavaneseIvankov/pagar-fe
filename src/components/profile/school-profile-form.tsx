"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TSchoolProfile } from "@/types";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";
import { Avatar } from "../ui/avatar";

const schoolProfileFormSchema = z.object({
  schoolName: z.string().min(3, "Nama sekolah minimal 3 karakter"),
  address: z.string().min(5, "Alamat sekolah minimal 5 karakter"),
});

export type SchoolProfileFormValues = z.infer<typeof schoolProfileFormSchema>;

export interface SchoolProfileFormProps {
  initialData: TSchoolProfile;
  onSubmit: (data: SchoolProfileFormValues) => Promise<void> | void;
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
      schoolName: initialData.schoolName,
      address: initialData.address,
    },
  });

  const handleFormSubmit = async (data: SchoolProfileFormValues) => {
    await onSubmit(data);
    setIsEditing(false);
    reset(data);
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
          <Field data-invalid={false}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              placeholder="Username"
              disabled={true}
              value={initialData.username}
              readOnly={true}
            />
            <FieldDescription>
              Username belum memiliki kontrak pembaruan di halaman ini.
            </FieldDescription>
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
