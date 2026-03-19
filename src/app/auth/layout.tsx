"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const authContent: Record<
  string,
  {
    image: string;
    title: string;
    subtitle: string;
  }
> = {
  "/auth/login": {
    //  image: "/images/login.jpg",
    image: "https://placehold.co/600x800",
    title: "Welcome Back!",
    subtitle: "Log in to continue your journey.",
  },
  "/auth/register": {
    image: "https://placehold.co/600x800",
    title: "Join Us Today!",
    subtitle: "Create an account to get started.",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const content = authContent[pathname] || authContent["/auth/login"];

  return (
    <div className="grid grid-rows-1 grid-cols-2 w-full h-[100dvh]">
      <section className="auth-thumbnail relative bg-blue-400">
        <Image
          src={content.image}
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-6 right-6 bottom-16 xl:bottom-24 xl:left-10 xl:right-10 text-white">
          <h1 className="text-h1">{content.title}</h1>
          <p className="text-body">{content.subtitle}</p>
        </div>
      </section>
      <section className="flex justify-center items-center mx-6">
        {children}
      </section>
    </div>
  );
}
