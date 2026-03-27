import { AppHeader } from "@/components/app-header";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col">
      <AppHeader />
      <section className="container flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
        {children}
      </section>
    </div>
  );
}
