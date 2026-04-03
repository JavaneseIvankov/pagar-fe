import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pagar-fe.vercel.app"),
  title: {
    default: "Pagar - Transparansi Nutrisi & Anggaran Makanan Sekolah",
    template: "%s | Pagar",
  },
  description:
    "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia.",
  keywords: [
    "nutrisi",
    "makanan sekolah",
    "transparansi",
    "anggaran",
    "kesehatan",
    "sekolah",
  ],
  authors: [{ name: "Pagar Team" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pagar-fe.vercel.app",
    siteName: "Pagar",
    title: "Pagar - Transparansi Nutrisi & Anggaran Makanan Sekolah",
    description:
      "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pagar - Transparansi Nutrisi & Anggaran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pagar - Transparansi Nutrisi & Anggaran Makanan Sekolah",
    description:
      "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
