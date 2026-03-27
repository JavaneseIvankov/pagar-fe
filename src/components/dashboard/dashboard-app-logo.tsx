import Link from "next/link";
import { AppLogo } from "../app-logo";

export function DashboardAppLogo() {
  return (
    <Link href="/dashboard" className="flex items-center justify-center">
      <AppLogo className="relative h-16 w-8/12 overflow-hidden transition-all group-data-[collapsible=icon]:hidden" />
      <AppLogo
        variant="symbol"
        className="relative hidden h-16 w-8/12 overflow-hidden transition-all group-data-[collapsible=icon]:block"
      />
    </Link>
  );
}
