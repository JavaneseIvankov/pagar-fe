import Link from "next/link";
import type { ReactNode } from "react";
import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { PeopleIcon, SchoolIcon, TruckIcon } from "@/components/exported-icons";
import { cn } from "@/lib/utils";

const ROLE_DATA = [
  {
    icon: <TruckIcon className="text-[#13AFEC]" />,
    roleName: "SPPG",
    description: "Kelola dapur dan buktikan transparansi pelayanan Anda",
    iconWrapperClassName: "bg-[#E3F8FF]",
    href: "/auth/daftar/sppg",
  },
  {
    icon: <SchoolIcon className="text-[#00A455]" />,
    roleName: "Sekolah",
    description: "Pastikan siswa mendapatkan hak nutrisinya",
    iconWrapperClassName: "bg-[#E7FDEE]",
    href: "/auth/daftar/sekolah",
  },
  {
    icon: <PeopleIcon className="text-[#6200EE]" />,
    roleName: "Umum",
    description: "Suarakan kepedulian Anda sebagai pengawas kualitas",
    iconWrapperClassName: "bg-[#EFE6FD]",
    href: "/auth/daftar/publik",
  },
] as const;

export default function RegisterRoleSelectionPage() {
  return (
    <AuthContentLayout>
      <div className="flex flex-col gap-4">
        {ROLE_DATA.map((role) => (
          <Link
            key={role.roleName}
            //  className={buttonVariants({ variant: "ghost" })}
            href={role.href}
          >
            <RoleSelectionCard
              key={role.roleName}
              roleName={role.roleName}
              description={role.description}
              className="hover:bg-primary/3"
              iconWrapperClassName={role.iconWrapperClassName}
              icon={role.icon}
            />
          </Link>
        ))}
      </div>
    </AuthContentLayout>
  );
}

function RoleSelectionCard({
  roleName,
  description,
  className,
  iconWrapperClassName,
  icon,
}: {
  roleName: string;
  description: string;
  iconWrapperClassName?: string;
  className?: string;
  icon: ReactNode;
}) {
  return (
    <div
      className={cn(
        "motion-press flex gap-4 rounded-md border-1 border-foreground/10 p-4 transition-[transform,box-shadow,border-color,background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:-translate-y-px hover:border-foreground/20 hover:shadow-md xl:gap-6 xl:p-4",
        className,
      )}
    >
      <div
        className={cn(
          "role-icon flex aspect-square size-fit items-center justify-center rounded-full p-4",
          iconWrapperClassName,
        )}
      >
        {icon}
      </div>
      <div className="role-info">
        <h2 className="font-semibold text-body">{roleName}</h2>
        <p className="text-body-4 text-foreground/80">{description}</p>
      </div>
    </div>
  );
}
