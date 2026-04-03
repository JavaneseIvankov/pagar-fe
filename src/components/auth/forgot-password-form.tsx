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
import { useForgotPassword } from "@/hooks/use-forgot-password";

export function ForgotPasswordForm() {
  const { register, onSubmit, errors, isPending } = useForgotPassword();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-md p-4">
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
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
          <span>
            {isPending ? "Mengirim permintaan..." : "Kirim Link Reset"}
          </span>
        </span>
      </Button>

      <Link href="/auth/masuk" className="text-body-4 underline">
        Kembali ke Login
      </Link>
    </form>
  );
}
