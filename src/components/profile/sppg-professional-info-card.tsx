"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InfoCircleIcon } from "../exported-icons";

const sppgProfessionalInfoSchema = z.object({
  sppgName: z.string().min(3, "Nama SPPG minimal 3 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
});

export type SppgProfessionalInfoFormValues = z.infer<
  typeof sppgProfessionalInfoSchema
>;

export interface SppgProfessionalInfoCardProps {
  initialData: {
    address: string;
    registrationCode: string;
    sppgName: string;
  };
  onSubmit: (data: SppgProfessionalInfoFormValues) => Promise<void> | void;
}

export function SppgProfessionalInfoCard({
  initialData,
  onSubmit,
}: SppgProfessionalInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<SppgProfessionalInfoFormValues>({
    resolver: zodResolver(sppgProfessionalInfoSchema),
    defaultValues: {
      sppgName: initialData.sppgName,
      address: initialData.address,
    },
  });

  const handleFormSubmit = async (data: SppgProfessionalInfoFormValues) => {
    await onSubmit(data);
    setIsEditing(false);
    reset(data);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex items-center justify-center text-primary">
            <InfoCircleIcon className="size-8" />
          </div>
          Informasi Profesional & Wilayah
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-6 pt-2">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex h-full flex-col gap-5"
        >
          <FieldGroup className="grid gap-5">
            <Field
              data-invalid={!!errors.sppgName}
              className="flex flex-col gap-2"
            >
              <FieldLabel
                htmlFor="sppgName"
                className="font-semibold text-foreground"
              >
                Nama SPPG
              </FieldLabel>
              <Input
                id="sppgName"
                className="bg-background"
                disabled={!isEditing}
                {...register("sppgName")}
                aria-invalid={!!errors.sppgName}
              />
              {errors.sppgName ? (
                <FieldError>{errors.sppgName.message}</FieldError>
              ) : null}
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel
                htmlFor="registrationCode"
                className="font-semibold text-foreground"
              >
                Kode BGN / Registrasi
              </FieldLabel>
              <Input
                id="registrationCode"
                value={initialData.registrationCode}
                className="bg-background"
                readOnly
              />
              <FieldDescription>
                Kode registrasi masih mengikuti data backend dan belum dapat
                diperbarui dari halaman ini.
              </FieldDescription>
            </Field>

            <Field
              data-invalid={!!errors.address}
              className="flex flex-col gap-2"
            >
              <FieldLabel
                htmlFor="address"
                className="font-semibold text-foreground"
              >
                Alamat
              </FieldLabel>
              <Input
                id="address"
                className="bg-background"
                disabled={!isEditing}
                {...register("address")}
                aria-invalid={!!errors.address}
              />
              {errors.address ? (
                <FieldError>{errors.address.message}</FieldError>
              ) : null}
            </Field>
          </FieldGroup>

          <div className="mt-auto flex flex-col gap-3 pt-4">
            {!isEditing ? (
              <Button
                type="button"
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profil SPPG
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !isDirty}
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
