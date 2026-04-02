import {
  DashboardSquare01Icon,
  Notification01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b bg-white px-4 md:px-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <HugeiconsIcon
          icon={DashboardSquare01Icon}
          size={24}
          className="hidden text-foreground md:block"
        />
        <h1 className="font-bold text-2xl tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[360px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground transition-[color,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]">
            <HugeiconsIcon icon={Search01Icon} size={18} />
          </div>
          <Input
            placeholder="Cari laporan..."
            className="h-11 rounded-lg border-transparent bg-muted/50 pl-10 transition-[background-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:bg-white focus-visible:ring-1"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="motion-press h-11 w-11 rounded-full text-muted-foreground hover:text-foreground"
        >
          <HugeiconsIcon icon={Notification01Icon} size={24} />
        </Button>
      </div>
    </header>
  );
}
