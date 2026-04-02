"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { registerUser } from "@/rpc";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(16, "Username maksimal 16 karakter"),
    email: z.string().email("Email tidak valid"),
    namaSekolah: z.string().min(1, "Nama sekolah wajib diisi"),
    alamatSekolah: z.string().min(1, "Alamat sekolah wajib diisi"),
    kodeRegistrasi: z
      .string()
      .max(32, "Kode registrasi maksimal 32 karakter")
      .optional()
      .or(z.literal("")),
    kataSandi: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka",
      ),
    ulangiKataSandi: z.string(),
  })
  .refine((data) => data.kataSandi === data.ulangiKataSandi, {
    message: "Kata sandi tidak cocok",
    path: ["ulangiKataSandi"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterSchoolForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      namaSekolah: "",
      alamatSekolah: "",
      kodeRegistrasi: "",
      kataSandi: "",
      ulangiKataSandi: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      const result = await registerUser({
        email: data.email,
        password: data.kataSandi,
        registrationCode: data.kodeRegistrasi || undefined,
        role: "SCHOOL",
        schoolAddress: data.alamatSekolah,
        schoolName: data.namaSekolah,
        username: data.username,
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push(result.redirectTo);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-md p-4"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            placeholder="Masukkan username"
            {...register("username")}
            aria-invalid={!!errors.username}
            disabled={isPending}
          />
          <div className="motion-error-slot" data-visible={!!errors.username}>
            {errors.username ? (
              <FieldError>{errors.username.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="sekolah@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            disabled={isPending}
          />
          <div className="motion-error-slot" data-visible={!!errors.email}>
            {errors.email ? (
              <FieldError>{errors.email.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.namaSekolah}>
          <FieldLabel htmlFor="namaSekolah">Nama Sekolah</FieldLabel>
          <Input
            id="namaSekolah"
            placeholder="Masukkan nama sekolah"
            {...register("namaSekolah")}
            aria-invalid={!!errors.namaSekolah}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.namaSekolah}
          >
            {errors.namaSekolah ? (
              <FieldError>{errors.namaSekolah.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.alamatSekolah}>
          <FieldLabel htmlFor="alamatSekolah">Alamat Sekolah</FieldLabel>
          <Input
            id="alamatSekolah"
            placeholder="Masukkan alamat sekolah"
            {...register("alamatSekolah")}
            aria-invalid={!!errors.alamatSekolah}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.alamatSekolah}
          >
            {errors.alamatSekolah ? (
              <FieldError>{errors.alamatSekolah.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.kodeRegistrasi}>
          <FieldLabel htmlFor="kodeRegistrasi">
            Kode Registrasi (Opsional)
          </FieldLabel>
          <Input
            id="kodeRegistrasi"
            placeholder="Masukkan kode registrasi"
            {...register("kodeRegistrasi")}
            aria-invalid={!!errors.kodeRegistrasi}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.kodeRegistrasi}
          >
            {errors.kodeRegistrasi ? (
              <FieldError>{errors.kodeRegistrasi.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.kataSandi}>
          <FieldLabel htmlFor="kataSandi">Kata Sandi</FieldLabel>
          <PasswordInput
            id="kataSandi"
            placeholder="••••••••"
            {...register("kataSandi")}
            aria-invalid={!!errors.kataSandi}
            disabled={isPending}
          />
          <div className="motion-error-slot" data-visible={!!errors.kataSandi}>
            {errors.kataSandi ? (
              <FieldError>{errors.kataSandi.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.ulangiKataSandi}>
          <FieldLabel htmlFor="ulangiKataSandi">Ulangi Kata Sandi</FieldLabel>
          <PasswordInput
            id="ulangiKataSandi"
            placeholder="••••••••"
            {...register("ulangiKataSandi")}
            aria-invalid={!!errors.ulangiKataSandi}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.ulangiKataSandi}
          >
            {errors.ulangiKataSandi ? (
              <FieldError>{errors.ulangiKataSandi.message}</FieldError>
            ) : null}
          </div>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="motion-press w-full"
        disabled={isPending}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {isPending ? (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : null}
          <span>{isPending ? "Memproses..." : "Daftar"}</span>
        </span>
      </Button>
      <div className="flex w-full justify-end">
        <Link href="/auth/masuk" className="text-body-4 underline">
          Sudah Punya Akun?{" "}
          <span className="font-semibold text-primary">Masuk</span>
        </Link>
      </div>
    </form>
  );
}
