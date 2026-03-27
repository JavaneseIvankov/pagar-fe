import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <AppLogo className="h-12 w-auto" />
      </div>

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <HugeiconsIcon
          icon={Search01Icon}
          size={40}
          className="text-muted-foreground"
        />
      </div>

      <h1 className="mb-2 font-bold text-foreground text-h1">404</h1>
      <h2 className="mb-4 text-foreground text-h3">Halaman Tidak Ditemukan</h2>
      <p className="mb-8 max-w-[500px] text-body-3 text-muted-foreground">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
        dipindahkan.
      </p>

      <Button asChild size="lg">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
