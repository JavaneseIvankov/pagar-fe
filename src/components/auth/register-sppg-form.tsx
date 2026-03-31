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
    namaSppg: z.string().min(1, "Nama SPPG wajib diisi"),
    alamatSppg: z.string().min(1, "Alamat SPPG wajib diisi"),
    kodeBgn: z
      .string()
      .max(32, "Kode BGN maksimal 32 karakter")
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

export function RegisterSppgForm() {
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
      namaSppg: "",
      alamatSppg: "",
      kodeBgn: "",
      kataSandi: "",
      ulangiKataSandi: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      const result = await registerUser({
        bgnCode: data.kodeBgn || undefined,
        email: data.email,
        password: data.kataSandi,
        role: "SPPG",
        sppgAddress: data.alamatSppg,
        sppgName: data.namaSppg,
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
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="sppg@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            disabled={isPending}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.namaSppg}>
          <FieldLabel htmlFor="namaSppg">Nama SPPG</FieldLabel>
          <Input
            id="namaSppg"
            placeholder="Masukkan nama SPPG"
            {...register("namaSppg")}
            aria-invalid={!!errors.namaSppg}
            disabled={isPending}
          />
          {errors.namaSppg && (
            <FieldError>{errors.namaSppg.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.alamatSppg}>
          <FieldLabel htmlFor="alamatSppg">Alamat SPPG</FieldLabel>
          <Input
            id="alamatSppg"
            placeholder="Masukkan alamat SPPG"
            {...register("alamatSppg")}
            aria-invalid={!!errors.alamatSppg}
            disabled={isPending}
          />
          {errors.alamatSppg && (
            <FieldError>{errors.alamatSppg.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.kodeBgn}>
          <FieldLabel htmlFor="kodeBgn">Kode BGN (Opsional)</FieldLabel>
          <Input
            id="kodeBgn"
            placeholder="Masukkan kode BGN"
            {...register("kodeBgn")}
            aria-invalid={!!errors.kodeBgn}
            disabled={isPending}
          />
          {errors.kodeBgn && <FieldError>{errors.kodeBgn.message}</FieldError>}
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
            disabled={isPending}
          />
          {errors.ulangiKataSandi && (
            <FieldError>{errors.ulangiKataSandi.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Memproses..." : "Daftar"}
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
