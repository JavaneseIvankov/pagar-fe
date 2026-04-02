"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { resetPassword } from "@/rpc";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi kata sandi harus sama",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    startTransition(async () => {
      const result = await resetPassword({
        token,
        newPassword: data.newPassword,
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();

      if (result.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-md p-4"
    >
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
