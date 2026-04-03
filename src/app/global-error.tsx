"use client";

import { Alert02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    Sentry.captureException(error);
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <AppLogo className="h-12 w-auto" />
      </div>

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <HugeiconsIcon
          icon={Alert02Icon}
          size={40}
          className="text-destructive"
        />
      </div>

      <h1 className="mb-4 font-bold text-foreground text-h2">
        Terjadi Kesalahan
      </h1>
      <p className="mb-8 max-w-[500px] text-body-3 text-muted-foreground">
        Maaf, sistem kami mengalami gangguan. Silakan coba beberapa saat lagi.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => reset()} size="lg">
          Coba Lagi
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
}
