"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const authContent: Record<
  string,
  {
    image: string;
    title: string;
    subtitle: string;
  }
> = {
  "/auth/masuk": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/login-thumbnail.jpg.webp",
    title: "Pantau Terus, Jaga Bersama!",
    subtitle:
      "Mari berkolaborasi dalam memastikan setiap sajian membawa perubahan nyata bagi kesehatan bangsa.",
  },
  "/auth/daftar": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/role-selection-thumbnail.jpg.webp",
    title: "Ambil Peranmu dalam Menjaga Gizi Bangsa",
    subtitle:
      "Tentukan peranmu dalam ekosistem PaGar dan pastikan setiap rupiah anggaran tersalurkan menjadi hidangan sehat yang transparan!",
  },
  "/auth/daftar/sppg": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-sppg-thumbnail.jpg.webp",
    title: "Demi Masa Depan yang Lebih Sehat",
    subtitle:
      "Pantau, laporkan, dan pastikan setiap sajian  memberikan standar gizi yang maksimal",
  },
  "/auth/daftar/publik": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-public-thumbnail.jpg.webp",
    title: "Pastikan Layanan Terbaik di Setiap Piring",
    subtitle:
      "Menemukan lauk yang kurang matang? Jangan diam. Daftar sekarang untuk melapor dan bantu vendor memberikan tanggung jawab yang lebih baik secara instan!",
  },
  "/auth/daftar/sekolah": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-school-thumbnail.jpg.webp",
    title: "Awasi Distribusi Gizi untuk Sekolah Anda",
    subtitle:
      "Daftarkan akun sekolah untuk memantau kualitas makanan, menyampaikan evaluasi, dan menjaga hak gizi siswa.",
  },
  "/auth/lupa-kata-sandi": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/login-thumbnail.jpg.webp",
    title: "Pulihkan Akses Akun Anda",
    subtitle:
      "Gunakan halaman ini untuk memahami status pemulihan akses sementara backend reset kata sandi belum tersedia.",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const content = authContent[pathname] || authContent["/auth/masuk"];

  return (
    <div className="grid min-h-dvh w-full grid-cols-1 bg-background md:grid-cols-2">
      <section className="auth-thumbnail relative min-h-[280px] overflow-hidden bg-primary md:min-h-dvh">
        <Image
          src={content.image}
          alt="Authentication background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 text-white sm:px-6 sm:pb-8 md:right-10 md:bottom-24 md:left-10 md:px-0 md:pb-0">
          <h1 className="max-w-xl text-balance text-h3 sm:text-h2 xl:text-h1">
            {content.title}
          </h1>
          <p className="mt-3 max-w-2xl text-body-4 sm:text-body-3 md:max-w-xl">
            {content.subtitle}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent md:h-1/2" />
      </section>
      <section className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:min-h-dvh md:px-8 xl:px-12">
        <div className="w-full max-w-xl">{children}</div>
      </section>
    </div>
  );
}
