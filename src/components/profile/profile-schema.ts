import * as z from "zod/v3";

export const createPasswordSchema = () => {
  return z
    .object({
      currentPassword: z.string().optional(),
      newPassword: z.string().optional(),
      confirmNewPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const hasCurrent = !!data.currentPassword;
      const hasNew = !!data.newPassword;
      const hasConfirm = !!data.confirmNewPassword;

      // If user started typing any password field, they must fill all three
      if (hasCurrent || hasNew || hasConfirm) {
        if (!hasCurrent) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kata sandi saat ini wajib diisi",
            path: ["currentPassword"],
          });
        }
        if (!hasNew) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kata sandi baru wajib diisi",
            path: ["newPassword"],
          });
        } else if (data.newPassword && data.newPassword.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kata sandi minimal 8 karakter",
            path: ["newPassword"],
          });
        }

        if (!hasConfirm) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Konfirmasi kata sandi wajib diisi",
            path: ["confirmNewPassword"],
          });
        } else if (data.newPassword !== data.confirmNewPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ulangi kata sandi baru tidak cocok",
            path: ["confirmNewPassword"],
          });
        }
      }
    });
};
