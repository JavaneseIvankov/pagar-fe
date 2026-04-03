import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";

import { registerUser } from "@/rpc";

export const registerSchoolSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(16, "Username maksimal 16 karakter"),
    email: z.string().email("Email tidak valid"),
    namaSekolah: z.string().min(1, "Nama sekolah wajib diisi"),
    alamatSekolah: z.string().min(1, "Alamat sekolah wajib diisi"),
    kodeRegistrasi: z
      .string()
      .max(32, "Kode registrasi maksimal 32 karakter")
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

export type RegisterSchoolFormValues = z.infer<typeof registerSchoolSchema>;

export function useRegisterSchool() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchoolFormValues>({
    resolver: zodResolver(registerSchoolSchema),
    defaultValues: {
      username: "",
      email: "",
      namaSekolah: "",
      alamatSekolah: "",
      kodeRegistrasi: "",
      kataSandi: "",
      ulangiKataSandi: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await registerUser({
        email: data.email,
        password: data.kataSandi,
        registrationCode: data.kodeRegistrasi || undefined,
        role: "SCHOOL",
        schoolAddress: data.alamatSekolah,
        schoolName: data.namaSekolah,
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
