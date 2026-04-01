import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { buttonVariants } from "@/components/ui/button";
import { getAuthenticatedLandingPath } from "@/lib/auth";
import { getAuthSession } from "@/lib/auth/server";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const session = await getAuthSession();

  const primaryHref = session
    ? getAuthenticatedLandingPath(session.user.role)
    : "/auth/masuk";
  const primaryLabel = session ? "Buka Halaman Utama" : "Masuk";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(22,163,74,0.12),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="flex items-center justify-center">
          <AppLogo className="h-14 w-auto sm:h-16" />
        </div>

        <section className="rounded-[32px] border border-border/60 bg-white/85 px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:px-10 sm:py-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 font-medium text-emerald-700 text-sm">
              Landing page placeholder
            </span>
            <div className="space-y-4">
              <h1 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl">
                Platform pemantauan gizi dan pelaporan menu sedang dirapikan.
              </h1>
              <p className="mx-auto max-w-2xl text-balance text-base text-foreground/70 leading-7 sm:text-lg">
                Halaman ini sementara menjadi titik masuk utama sebelum landing
                page final tersedia. Akses pelaporan masyarakat dan laporan SPPG
                sekarang mengikuti sesi login sesuai PRD.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className={buttonVariants({
                  className: "h-11 rounded-full px-6",
                })}
              >
                {primaryLabel}
              </Link>
              {session ? null : (
                <Link
                  href="/auth/daftar"
                  className={buttonVariants({
                    variant: "outline",
                    className: cn(
                      "h-11 rounded-full border-border/70 bg-white px-6",
                    ),
                  })}
                >
                  Daftar
                </Link>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-left text-slate-700 text-sm leading-6">
              <p>
                Status saat ini:
                {session
                  ? " Anda sudah masuk. Gunakan tombol di atas untuk kembali ke halaman utama sesuai role."
                  : " hanya halaman auth dan landing page yang tersedia tanpa sesi."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
