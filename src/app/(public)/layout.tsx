import { AppHeader } from "@/components/app-header";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col">
      <AppHeader />
      <section className="container pt-10 pb-20 md:pb-40">{children}</section>
    </div>
  );
}
