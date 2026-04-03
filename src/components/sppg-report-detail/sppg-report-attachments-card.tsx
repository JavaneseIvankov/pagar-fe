import {
  Attachment01Icon,
  Download01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import type { TAttachment } from "@/types";
import {
  SppgDetailSectionCard,
  SppgDetailSectionHeader,
} from "./sppg-report-detail-layout";

export interface SppgReportAttachmentsCardProps {
  attachments: TAttachment[];
}

export function SppgReportAttachmentsCard({
  attachments,
}: SppgReportAttachmentsCardProps) {
  return (
    <SppgDetailSectionCard>
      <SppgDetailSectionHeader
        title="Lampiran"
        icon={
          <HugeiconsIcon
            icon={Attachment01Icon}
            className="h-6 w-6 text-blue-500"
          />
        }
        className="pt-6 pb-4"
      />
      <CardContent className="flex w-full flex-col gap-4 pb-6 font-medium text-sm">
        {attachments.map((attachment) => {
          const isImage = attachment.mimeType.startsWith("image/");

          if (isImage) {
            return (
              <a
                key={attachment.id}
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-muted/30"
              >
                <Image
                  src={attachment.url}
                  alt={attachment.label}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-lg bg-black/50 px-4 py-2 font-medium text-sm text-white backdrop-blur-sm">
                    Lihat Gambar
                  </span>
                </div>
              </a>
            );
          }

          return (
            <a
              key={attachment.id}
              href={attachment.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 shadow-sm transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <HugeiconsIcon icon={File01Icon} size={20} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium text-foreground text-sm">
                  {attachment.label}
                </span>
                <span className="truncate text-muted-foreground text-xs uppercase">
                  {attachment.mimeType.split("/")[1] || "DOCUMENT"}
                </span>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <HugeiconsIcon icon={Download01Icon} size={18} />
              </div>
            </a>
          );
        })}
      </CardContent>
    </SppgDetailSectionCard>
  );
}
