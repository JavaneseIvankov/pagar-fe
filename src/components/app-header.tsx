import Link from "next/link";
import { AppLogo } from "./app-logo";
import ProfileButton from "./profile/profile-button";
import { SearchReport } from "./reports/search-report";
import { buttonVariants } from "./ui/button";

export function AppHeader() {
  return (
    <header className="w-full bg-card">
      <div className="container min-h-16 flex items-center gap-2">
        <AppLogo className="h-18 pr-2" />
        <SearchReport />
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/create-report"}
        >
          Beranda
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
          Tambah Laporan
        </Link>
        <ProfileButton />
      </div>
    </header>
  );
}
