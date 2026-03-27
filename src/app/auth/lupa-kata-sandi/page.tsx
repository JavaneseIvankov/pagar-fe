import Link from "next/link";
import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <AuthContentLayout
      title="Pemulihan Kata Sandi"
      subtitle="Alur reset kata sandi belum tersedia karena backend recovery flow belum ditetapkan."
    >
      <div className="space-y-4 rounded-md border border-border/60 bg-card p-6">
        <p className="text-body-3 text-muted-foreground">
          Untuk sementara, silakan hubungi admin sistem jika Anda kehilangan
          akses akun.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/masuk">Kembali ke Login</Link>
        </Button>
      </div>
    </AuthContentLayout>
  );
}
