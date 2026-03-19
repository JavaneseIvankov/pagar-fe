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
    <div className={cn("flex flex-col gap-10 md:max-w-[90%]", className)}>
      <section className="auth-content-header space-y-4">
        <h1 className="text-h1">{_title}</h1>
        <p className="text-foreground/40 text-body">{_subtitle}</p>
      </section>
      {children}
    </div>
  );
}
