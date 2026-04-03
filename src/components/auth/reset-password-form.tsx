"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useResetPassword } from "@/hooks/use-reset-password";

export interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { register, onSubmit, errors, isPending } = useResetPassword(token);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-md p-4">
      <FieldGroup>
        <Field data-invalid={!!errors.newPassword}>
          <FieldLabel htmlFor="newPassword">Kata Sandi Baru</FieldLabel>
          <PasswordInput
            id="newPassword"
            placeholder="••••••••"
            {...register("newPassword")}
            aria-invalid={!!errors.newPassword}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.newPassword}
          >
            {errors.newPassword ? (
              <FieldError>{errors.newPassword.message}</FieldError>
            ) : null}
          </div>
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">
            Konfirmasi Kata Sandi Baru
          </FieldLabel>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            disabled={isPending}
          />
          <div
            className="motion-error-slot"
            data-visible={!!errors.confirmPassword}
          >
            {errors.confirmPassword ? (
              <FieldError>{errors.confirmPassword.message}</FieldError>
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
          <span>{isPending ? "Menyimpan..." : "Simpan Kata Sandi Baru"}</span>
        </span>
      </Button>

      <Link href="/auth/masuk" className="text-body-4 underline">
        Kembali ke Login
      </Link>
    </form>
  );
}
