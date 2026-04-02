"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";
import { InfoCircleIcon } from "@/components/exported-icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginUser } from "@/rpc";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  returnTo?: null | string;
  showAuthRequiredNotice?: boolean;
}

export function LoginForm({
  returnTo,
  showAuthRequiredNotice = false,
}: LoginFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await loginUser({
        ...data,
        returnTo: returnTo ?? undefined,
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push(result.redirectTo);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {showAuthRequiredNotice ? (
        <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-foreground/80">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <InfoCircleIcon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-body-3 text-foreground">
              Masuk diperlukan
            </p>
            <p className="text-body-4 sm:text-body-3">
              Masuk untuk melanjutkan ke halaman yang Anda tuju.
            </p>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-md p-4"
      >
        <FieldGroup>
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              type="text"
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

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={!!errors.password}
              disabled={isPending}
            />
            <div className="motion-error-slot" data-visible={!!errors.password}>
              {errors.password ? (
                <FieldError>{errors.password.message}</FieldError>
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
            <span>{isPending ? "Memproses..." : "Masuk"}</span>
          </span>
        </Button>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/auth/lupa-kata-sandi" className="text-body-4 underline">
            Lupa Password?
          </Link>
          <Link href="/auth/daftar" className="text-body-4 underline">
            Belum Punya Akun?{" "}
            <span className="font-semibold text-primary">Daftar</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
