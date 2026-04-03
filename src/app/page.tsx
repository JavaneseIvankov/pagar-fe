import type { Metadata } from "next";
import { LandingPageClient } from "@/components/landing/landing-page-client";
import { getAuthSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Transparansi Nutrisi & Anggaran Makanan Sekolah",
  description:
    "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia. Pantau rincian menu harian hingga alokasi biaya bahan baku.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pagar - Transparansi Nutrisi & Anggaran Makanan Sekolah",
    description:
      "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia.",
    url: "/",
    type: "website",
  },
};

export default async function LandingPage() {
  const session = await getAuthSession();
  return <LandingPageClient session={session} />;
}
