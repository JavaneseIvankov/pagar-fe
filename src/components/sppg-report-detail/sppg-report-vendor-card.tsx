import Image from "next/image";
import {
  LocationIcon,
  PeopleIcon,
  ShopIcon,
} from "@/components/exported-icons";
import { CardContent, CardHeader } from "@/components/ui/card";
import type { TSppgReport } from "@/types";
import { SppgDetailSectionCard } from "./sppg-report-detail-layout";

export interface SppgReportVendorCardProps {
  vendor: TSppgReport["author"];
}

export function SppgReportVendorCard({ vendor }: SppgReportVendorCardProps) {
  return (
    <SppgDetailSectionCard className="overflow-hidden">
      <CardHeader className="border-foreground/5 border-b bg-slate-50/50 pt-4 pb-3">
        <h4 className="font-bold text-[11px] text-foreground/40 uppercase tracking-[0.2em]">
          INFORMASI VENDOR
        </h4>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="mb-1 flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50/80">
            <ShopIcon className="h-6 w-6 text-foreground" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base leading-tight md:text-lg">
              {vendor.sppgName}
            </h3>
            <p className="mt-1 font-medium text-[11px] text-muted-foreground">
              Vendor Terakreditasi B
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2.5 font-medium text-foreground/70 text-xs">
          <div className="flex items-center gap-3">
            <PeopleIcon className="h-4 w-4 flex-shrink-0 text-foreground/40" />
            <span>Kepemilikan : Perseorangan</span>
          </div>
          <div className="flex items-start gap-3">
            <LocationIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/40" />
            <span className="leading-snug">{vendor.address}</span>
          </div>
        </div>

        <div className="relative mt-3 aspect-[2/1] w-full overflow-hidden rounded-lg border border-foreground/5 bg-slate-100">
          <Image
            src="https://placehold.co/600x300?text=Map+Placeholder&font=roboto"
            alt="Peta Lokasi"
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </SppgDetailSectionCard>
  );
}
