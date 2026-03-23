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
    <header className="h-20 bg-white border-b flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <HugeiconsIcon
          icon={DashboardSquare01Icon}
          size={24}
          className="text-foreground hidden md:block"
        />
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[360px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <HugeiconsIcon icon={Search01Icon} size={18} />
          </div>
          <Input
            placeholder="Cari laporan..."
            className="pl-10 bg-muted/50 border-transparent h-11 rounded-lg focus-visible:ring-1 focus-visible:bg-white"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-11 w-11 text-muted-foreground hover:text-foreground"
        >
          <HugeiconsIcon icon={Notification01Icon} size={24} />
        </Button>
      </div>
    </header>
  );
}
