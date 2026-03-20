import { People, School, Truck } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { PeopleIcon, SchoolIcon, TruckIcon } from "@/components/exported-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROLE_DATA = [
  {
    icon: <TruckIcon />,
    roleName: "SPPG",
    description: "Kelola dapur dan buktikan transparansi pelayanan Anda",
    iconWrapperClassName: "bg-[#E3F8FF]",
    href: "/auth/register/sppg",
  },
  {
    icon: <SchoolIcon />,
    roleName: "Sekolah",
    description: "Pastikan siswa mendapatkan hak nutrisinya",
    iconWrapperClassName: "bg-[#E7FDEE]",
    href: "/auth/register/school",
  },
  {
    icon: <PeopleIcon />,
    roleName: "Umum",
    description: "Suarakan kepedulian Anda sebagai pengawas kualitas",
    iconWrapperClassName: "bg-[#EFE6FD]",
    href: "/auth/register/public",
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
        "flex gap-4 xl:gap-6 p-4 xl:p-4 border-1 border-foreground/10  rounded-md",
        className,
      )}
    >
      <div
        className={cn(
          "role-icon size-fit p-4 rounded-full aspect-square flex justify-center items-center",
          iconWrapperClassName,
        )}
      >
        {icon}
      </div>
      <div className="role-info">
        <h2 className="text-body font-semibold">{roleName}</h2>
        <p className="text-body-4 text-foreground/80">{description}</p>
      </div>
    </div>
  );
}
