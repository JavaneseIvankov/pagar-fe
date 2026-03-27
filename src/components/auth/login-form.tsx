"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";
import { loginAction } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
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
      const result = await loginAction(data);

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
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
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
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Memproses..." : "Masuk"}
      </Button>
      <div className="flex w-full justify-between">
        <Link href="/auth/lupa-kata-sandi" className="text-body-4 underline">
          Lupa Password?
        </Link>
        <Link href="/auth/daftar" className="text-body-4 underline">
          Belum Punya Akun?{" "}
          <span className="font-semibold text-primary">Daftar</span>
        </Link>
      </div>
    </form>
  );
}
