import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";

import { requestPasswordReset } from "@/rpc";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Masukkan email yang valid"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await requestPasswordReset(data);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();
    });
  });

  return {
    register,
    onSubmit,
    errors,
    isPending,
  };
}
