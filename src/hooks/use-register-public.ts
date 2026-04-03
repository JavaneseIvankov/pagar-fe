import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";

import { registerUser } from "@/rpc";

export const registerPublicSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(16, "Username maksimal 16 karakter"),
    email: z.string().email("Email tidak valid"),
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

export type RegisterPublicFormValues = z.infer<typeof registerPublicSchema>;

export function useRegisterPublic() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPublicFormValues>({
    resolver: zodResolver(registerPublicSchema),
    defaultValues: {
      username: "",
      email: "",
      kataSandi: "",
      ulangiKataSandi: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await registerUser({
        email: data.email,
        password: data.kataSandi,
        role: "PUBLIC",
        username: data.username,
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push(result.redirectTo);
    });
  });

  return {
    register,
    onSubmit,
    errors,
    isPending,
  };
}
