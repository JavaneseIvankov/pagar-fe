import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import ProfileButton from "@/components/profile/profile-button";
import { Button } from "@/components/ui/button";
import type { TAuthSession, TRole } from "@/types";

function getRoleLabel(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "PUBLIC":
      return "Publik";
    case "SCHOOL":
      return "Sekolah";
    case "SPPG":
      return "SPPG";
  }
}

function getProfileHref(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin/profil";
    case "SPPG":
      return "/dashboard/sppg/profil";
    case "PUBLIC":
    case "SCHOOL":
      return "/profil";
  }
}

export interface NavbarProps {
  session: TAuthSession | null;
  onLogout: () => void;
}

export function Navbar({ session, onLogout }: NavbarProps) {
  const isSchoolOrPublic =
    session?.user.role === "PUBLIC" || session?.user.role === "SCHOOL";
  const isSppgOrAdmin =
    session?.user.role === "SPPG" || session?.user.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 w-full border-border/60 border-b bg-card backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center">
        <Link
          href="#beranda"
          className="origin-left transition-transform duration-150 ease-out active:scale-95"
        >
          <AppLogo className="h-10" variant="full" />
        </Link>
        <div className="flex flex-1 items-center justify-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden items-center justify-center gap-6 md:flex md:flex-1">
            <a
              href="#beranda"
              className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
            >
              Beranda
            </a>
            <a
              href="#tentang-kami"
              className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
            >
              Tentang Kami
            </a>
            <a
              href="#alur-proses"
              className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
            >
              Alur Proses
            </a>
            {isSchoolOrPublic && (
              <Link
                href="/laporan-masyarakat"
                className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
              >
                Laporan
              </Link>
            )}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {!session ? (
            <>
              <Button variant="ghost" className="mr-2 px-4" asChild>
                <Link href="/auth/masuk">Masuk</Link>
              </Button>
              <Button className="h-10 px-6 shadow-sm" asChild>
                <Link href="/auth/daftar">Daftar</Link>
              </Button>
            </>
          ) : (
            <>
              {isSppgOrAdmin && (
                <Button className="mr-2 h-10 px-6 shadow-sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
              <ProfileButton
                username={session.user.username}
                secondaryText={getRoleLabel(session.user.role)}
                profileHref={getProfileHref(session.user.role)}
                onLogout={onLogout}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
