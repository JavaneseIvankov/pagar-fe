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
  "/auth/login": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/login-thumbnail.jpg.webp",
    title: "Pantau Terus, Jaga Bersama!",
    subtitle:
      "Mari berkolaborasi dalam memastikan setiap sajian membawa perubahan nyata bagi kesehatan bangsa.",
  },
  "/auth/register": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/role-selection-thumbnail.jpg.webp",
    title: "Ambil Peranmu dalam Menjaga Gizi Bangsa",
    subtitle:
      "Tentukan peranmu dalam ekosistem PaGar dan pastikan setiap rupiah anggaran tersalurkan menjadi hidangan sehat yang transparan!",
  },
  "/auth/register/sppg": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-sppg-thumbnail.jpg.webp",
    title: "Demi Masa Depan yang Lebih Sehat",
    subtitle:
      "Pantau, laporkan, dan pastikan setiap sajian  memberikan standar gizi yang maksimal",
  },
  "/auth/register/public": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-public-thumbnail.jpg.webp",
    title: "Pastikan Layanan Terbaik di Setiap Piring",
    subtitle:
      "Menemukan lauk yang kurang matang? Jangan diam. Daftar sekarang untuk melapor dan bantu vendor memberikan tanggung jawab yang lebih baik secara instan!",
  },
  "/auth/register/school": {
    image:
      "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/register-school-thumbnail.jpg.webp",
    title: "Pastikan Layanan Terbaik di Setiap Piring",
    subtitle:
      "Menemukan lauk yang kurang matang? Jangan diam. Daftar sekarang untuk melapor dan bantu vendor memberikan tanggung jawab yang lebih baik secara instan!",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const content = authContent[pathname] || authContent["/auth/login"];

  return (
    <div className="grid h-[100dvh] w-full grid-cols-2 grid-rows-1">
      <section className="auth-thumbnail relative bg-blue-400">
        <Image
          src={content.image}
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute right-6 bottom-16 left-6 z-10 text-white xl:right-10 xl:bottom-24 xl:left-10">
          <h1 className="text-h1">{content.title}</h1>
          <p className="text-body">{content.subtitle}</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
      </section>
      <section className="mx-6 flex items-center justify-center">
        {children}
      </section>
    </div>
  );
}
