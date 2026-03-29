import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthContentLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function AuthContentLayout({
  title,
  subtitle,
  children,
  className,
}: AuthContentLayoutProps) {
  const _title = title ?? "Selamat Datang di PaGar!";
  const _subtitle =
    subtitle ??
    "Pilih identitas Anda untuk mulai memantau, mengelola, dan memastikan setiap porsi makanan sampai dengan kualitas terbaik.";

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col gap-6 sm:gap-8 lg:max-w-[32rem] lg:gap-10",
        className,
      )}
    >
      <section className="auth-content-header space-y-3 sm:space-y-4">
        <h1 className="text-balance text-h3 sm:text-h2 lg:text-h1">{_title}</h1>
        <p className="max-w-2xl text-body-3 text-foreground/60">{_subtitle}</p>
      </section>
      {children}
    </div>
  );
}
