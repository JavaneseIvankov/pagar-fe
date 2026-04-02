import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params;

  return (
    <AuthContentLayout
      title="Atur Ulang Kata Sandi"
      subtitle="Masukkan kata sandi baru untuk memulihkan akses akun Anda."
    >
      <ResetPasswordForm token={token} />
    </AuthContentLayout>
  );
}
