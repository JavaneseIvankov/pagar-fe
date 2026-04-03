"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TAdminCreateManagedAccountInput } from "@/types";

const createAkunSchema = z
  .object({
    alamatSekolah: z.string().optional(),
    alamatSppg: z.string().optional(),
    email: z.string().email("Email tidak valid"),
    kataSandi: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka",
      ),
    kodeBgn: z
      .string()
      .max(32, "Kode BGN maksimal 32 karakter")
      .optional()
      .or(z.literal("")),
    kodeRegistrasi: z
      .string()
      .max(32, "Kode registrasi maksimal 32 karakter")
      .optional()
      .or(z.literal("")),
    namaSekolah: z.string().optional(),
    namaSppg: z.string().optional(),
    role: z.enum(["SCHOOL", "SPPG"]),
    ulangiKataSandi: z.string(),
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(16, "Username maksimal 16 karakter"),
  })
  .superRefine((data, ctx) => {
    if (data.kataSandi !== data.ulangiKataSandi) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kata sandi tidak cocok",
        path: ["ulangiKataSandi"],
      });
    }

    if (data.role === "SPPG") {
      if (!data.namaSppg?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nama SPPG wajib diisi",
          path: ["namaSppg"],
        });
      }

      if (!data.alamatSppg?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alamat SPPG wajib diisi",
          path: ["alamatSppg"],
        });
      }
    }

    if (data.role === "SCHOOL") {
      if (!data.namaSekolah?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nama sekolah wajib diisi",
          path: ["namaSekolah"],
        });
      }

      if (!data.alamatSekolah?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alamat sekolah wajib diisi",
          path: ["alamatSekolah"],
        });
      }
    }
  });

type CreateAkunFormValues = z.infer<typeof createAkunSchema>;

const DEFAULT_VALUES: CreateAkunFormValues = {
  alamatSekolah: "",
  alamatSppg: "",
  email: "",
  kataSandi: "",
  kodeBgn: "",
  kodeRegistrasi: "",
  namaSekolah: "",
  namaSppg: "",
  role: "SPPG",
  ulangiKataSandi: "",
  username: "",
};

export interface CreateAkunDialogProps {
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: TAdminCreateManagedAccountInput) => Promise<void>;
  open: boolean;
}

export function CreateAkunDialog({
  isSubmitting,
  onOpenChange,
  onSubmit,
  open,
}: CreateAkunDialogProps) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateAkunFormValues>({
    resolver: zodResolver(createAkunSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (!open) {
      reset(DEFAULT_VALUES);
    }
  }, [open, reset]);

  const submitForm = async (data: CreateAkunFormValues) => {
    if (data.role === "SPPG") {
      await onSubmit({
        bgnCode: data.kodeBgn || undefined,
        email: data.email,
        password: data.kataSandi,
        role: "SPPG",
        sppgAddress: data.alamatSppg ?? "",
        sppgName: data.namaSppg ?? "",
        username: data.username,
      });
      return;
    }

    await onSubmit({
      email: data.email,
      password: data.kataSandi,
      registrationCode: data.kodeRegistrasi || undefined,
      role: "SCHOOL",
      schoolAddress: data.alamatSekolah ?? "",
      schoolName: data.namaSekolah ?? "",
      username: data.username,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buat Akun Baru</DialogTitle>
          <DialogDescription>
            Tambahkan akun SPPG atau Sekolah. Akun baru akan masuk antrean
            validasi.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          <Tabs
            value={selectedRole}
            onValueChange={(value) =>
              setValue("role", value as CreateAkunFormValues["role"], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="SPPG" type="button">
                SPPG
              </TabsTrigger>
              <TabsTrigger value="SCHOOL" type="button">
                Sekolah
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field data-invalid={!!errors.username}>
              <FieldLabel htmlFor="create-akun-username">Username</FieldLabel>
              <Input
                id="create-akun-username"
                placeholder="Masukkan username"
                aria-invalid={!!errors.username}
                disabled={isSubmitting}
                {...register("username")}
              />
              {errors.username ? (
                <FieldError>{errors.username.message}</FieldError>
              ) : null}
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="create-akun-email">Email</FieldLabel>
              <Input
                id="create-akun-email"
                type="email"
                placeholder="email@contoh.com"
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email ? (
                <FieldError>{errors.email.message}</FieldError>
              ) : null}
            </Field>

            {selectedRole === "SPPG" ? (
              <>
                <Field data-invalid={!!errors.namaSppg}>
                  <FieldLabel htmlFor="create-akun-nama-sppg">
                    Nama SPPG
                  </FieldLabel>
                  <Input
                    id="create-akun-nama-sppg"
                    placeholder="Masukkan nama SPPG"
                    aria-invalid={!!errors.namaSppg}
                    disabled={isSubmitting}
                    {...register("namaSppg")}
                  />
                  {errors.namaSppg ? (
                    <FieldError>{errors.namaSppg.message}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={!!errors.alamatSppg}>
                  <FieldLabel htmlFor="create-akun-alamat-sppg">
                    Alamat SPPG
                  </FieldLabel>
                  <Input
                    id="create-akun-alamat-sppg"
                    placeholder="Masukkan alamat SPPG"
                    aria-invalid={!!errors.alamatSppg}
                    disabled={isSubmitting}
                    {...register("alamatSppg")}
                  />
                  {errors.alamatSppg ? (
                    <FieldError>{errors.alamatSppg.message}</FieldError>
                  ) : null}
                </Field>

                <Field
                  data-invalid={!!errors.kodeBgn}
                  className="md:col-span-2"
                >
                  <FieldLabel htmlFor="create-akun-kode-bgn">
                    Kode BGN (Opsional)
                  </FieldLabel>
                  <Input
                    id="create-akun-kode-bgn"
                    placeholder="Masukkan kode BGN"
                    aria-invalid={!!errors.kodeBgn}
                    disabled={isSubmitting}
                    {...register("kodeBgn")}
                  />
                  {errors.kodeBgn ? (
                    <FieldError>{errors.kodeBgn.message}</FieldError>
                  ) : null}
                </Field>
              </>
            ) : (
              <>
                <Field data-invalid={!!errors.namaSekolah}>
                  <FieldLabel htmlFor="create-akun-nama-sekolah">
                    Nama Sekolah
                  </FieldLabel>
                  <Input
                    id="create-akun-nama-sekolah"
                    placeholder="Masukkan nama sekolah"
                    aria-invalid={!!errors.namaSekolah}
                    disabled={isSubmitting}
                    {...register("namaSekolah")}
                  />
                  {errors.namaSekolah ? (
                    <FieldError>{errors.namaSekolah.message}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={!!errors.alamatSekolah}>
                  <FieldLabel htmlFor="create-akun-alamat-sekolah">
                    Alamat Sekolah
                  </FieldLabel>
                  <Input
                    id="create-akun-alamat-sekolah"
                    placeholder="Masukkan alamat sekolah"
                    aria-invalid={!!errors.alamatSekolah}
                    disabled={isSubmitting}
                    {...register("alamatSekolah")}
                  />
                  {errors.alamatSekolah ? (
                    <FieldError>{errors.alamatSekolah.message}</FieldError>
                  ) : null}
                </Field>

                <Field
                  data-invalid={!!errors.kodeRegistrasi}
                  className="md:col-span-2"
                >
                  <FieldLabel htmlFor="create-akun-kode-registrasi">
                    Kode Registrasi (Opsional)
                  </FieldLabel>
                  <Input
                    id="create-akun-kode-registrasi"
                    placeholder="Masukkan kode registrasi"
                    aria-invalid={!!errors.kodeRegistrasi}
                    disabled={isSubmitting}
                    {...register("kodeRegistrasi")}
                  />
                  {errors.kodeRegistrasi ? (
                    <FieldError>{errors.kodeRegistrasi.message}</FieldError>
                  ) : null}
                </Field>
              </>
            )}

            <Field data-invalid={!!errors.kataSandi}>
              <FieldLabel htmlFor="create-akun-kata-sandi">
                Kata Sandi
              </FieldLabel>
              <PasswordInput
                id="create-akun-kata-sandi"
                placeholder="••••••••"
                aria-invalid={!!errors.kataSandi}
                disabled={isSubmitting}
                {...register("kataSandi")}
              />
              {errors.kataSandi ? (
                <FieldError>{errors.kataSandi.message}</FieldError>
              ) : null}
            </Field>

            <Field data-invalid={!!errors.ulangiKataSandi}>
              <FieldLabel htmlFor="create-akun-ulangi-kata-sandi">
                Ulangi Kata Sandi
              </FieldLabel>
              <PasswordInput
                id="create-akun-ulangi-kata-sandi"
                placeholder="••••••••"
                aria-invalid={!!errors.ulangiKataSandi}
                disabled={isSubmitting}
                {...register("ulangiKataSandi")}
              />
              {errors.ulangiKataSandi ? (
                <FieldError>{errors.ulangiKataSandi.message}</FieldError>
              ) : null}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Membuat..." : "Buat Akun"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
