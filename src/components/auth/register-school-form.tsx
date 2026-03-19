"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(16, "Username maksimal 16 karakter"),
    schoolName: z
      .string()
      .min(3, "Nama sekolah minimal 3 karakter")
      .max(30, "Nama sekolah maksimal 30 karakter"),
    alamat: z
      .string()
      .min(3, "Alamat minimal 3 karakter")
      .max(30, "Alamat maksimal 30 karakter"),
    kodeRegistrasi: z
      .string()
      .min(3, "Kode registrasi minimal 3 karakter")
      .max(16, "Kode registrasi maksimal 16 karakter"),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    // biome-ignore lint/suspicious/noExplicitAny: <Zod 4 type mismatch>
    resolver: zodResolver(registerSchema as any),
    defaultValues: {
      username: "",
      schoolName: "",
      alamat: "",
      kodeRegistrasi: "",
      kataSandi: "",
      ulangiKataSandi: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ulangiKataSandi, ...submitData } = data;
    console.log(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-4 rounded-md"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            placeholder="Masukkan username"
            {...register("username")}
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.schoolName}>
          <FieldLabel htmlFor="schoolName">Nama Sekolah</FieldLabel>
          <Input
            id="schoolName"
            placeholder="Masukkan nama sekolah"
            {...register("schoolName")}
            aria-invalid={!!errors.schoolName}
          />
          {errors.schoolName && (
            <FieldError>{errors.schoolName.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.alamat}>
          <FieldLabel htmlFor="alamat">Alamat</FieldLabel>
          <Input
            id="alamat"
            placeholder="Masukkan alamat"
            {...register("alamat")}
            aria-invalid={!!errors.alamat}
          />
          {errors.alamat && <FieldError>{errors.alamat.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.kodeRegistrasi}>
          <FieldLabel htmlFor="kodeRegistrasi">Kode Registrasi</FieldLabel>
          <Input
            id="kodeRegistrasi"
            placeholder="Masukkan kode registrasi"
            {...register("kodeRegistrasi")}
            aria-invalid={!!errors.kodeRegistrasi}
          />
          {errors.kodeRegistrasi && (
            <FieldError>{errors.kodeRegistrasi.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.kataSandi}>
          <FieldLabel htmlFor="kataSandi">Kata Sandi</FieldLabel>
          <PasswordInput
            id="kataSandi"
            placeholder="••••••••"
            {...register("kataSandi")}
            aria-invalid={!!errors.kataSandi}
          />
          {errors.kataSandi && (
            <FieldError>{errors.kataSandi.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.ulangiKataSandi}>
          <FieldLabel htmlFor="ulangiKataSandi">Ulangi Kata Sandi</FieldLabel>
          <PasswordInput
            id="ulangiKataSandi"
            placeholder="••••••••"
            {...register("ulangiKataSandi")}
            aria-invalid={!!errors.ulangiKataSandi}
          />
          {errors.ulangiKataSandi && (
            <FieldError>{errors.ulangiKataSandi.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full">
        Daftar
      </Button>
      <div className="flex justify-end w-full">
        <Link href="/auth/login" className="underline text-body-4">
          Sudah Punya Akun?{" "}
          <span className="font-semibold text-primary">Masuk</span>
        </Link>
      </div>
    </form>
  );
}
