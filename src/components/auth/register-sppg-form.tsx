"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRegisterSppg } from "@/hooks/use-register-sppg";

export function RegisterSppgForm() {
  const { register, onSubmit, errors, isPending } = useRegisterSppg();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-md p-4">
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
            placeholder="sppg@email.com"
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

        <Field data-invalid={!!errors.namaSppg}>
          <FieldLabel htmlFor="namaSppg">Nama SPPG</FieldLabel>
          <Input
            id="namaSppg"
            placeholder="Masukkan nama SPPG"
            {...register("namaSppg")}
            aria-invalid={!!errors.namaSppg}
            disabled={isPending}
          />
          <div className="motion-error-slot" data-visible={!!errors.namaSppg}>
            {errors.namaSppg ? (
              <FieldError>{errors.namaSppg.message}</FieldError>
            ) : null}
          </div>
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
          <div className="motion-error-slot" data-visible={!!errors.alamatSppg}>
            {errors.alamatSppg ? (
              <FieldError>{errors.alamatSppg.message}</FieldError>
            ) : null}
          </div>
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
          <div className="motion-error-slot" data-visible={!!errors.kodeBgn}>
            {errors.kodeBgn ? (
              <FieldError>{errors.kodeBgn.message}</FieldError>
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
