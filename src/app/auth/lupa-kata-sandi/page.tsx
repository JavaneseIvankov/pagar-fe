import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthContentLayout
      title="Pemulihan Kata Sandi"
      subtitle="Masukkan email akun Anda untuk meminta link reset kata sandi."
    >
      <ForgotPasswordForm />
    </AuthContentLayout>
  );
}
