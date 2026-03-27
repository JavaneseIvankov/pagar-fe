import Image from "next/image";

export interface SppgReportHeroProps {
  title: string;
  imageUrl: string;
}

function isRenderableImageUrl(imageUrl: string) {
  try {
    const pathname = new URL(
      imageUrl,
      "https://pagar.local",
    ).pathname.toLowerCase();
    return [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"].some(
      (extension) => pathname.endsWith(extension),
    );
  } catch {
    return false;
  }
}

export function SppgReportHero({ title, imageUrl }: SppgReportHeroProps) {
  const canRenderImage = isRenderableImageUrl(imageUrl);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/10 lg:aspect-[2/1]">
      {canRenderImage ? (
        <Image fill src={imageUrl} alt={title} className="object-cover" />
      ) : (
        <div className="flex h-full items-end bg-[linear-gradient(135deg,rgba(15,118,110,0.16),rgba(255,255,255,0.98))] p-5 sm:p-6">
          <div className="max-w-xl rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur">
            <p className="font-semibold text-emerald-700 text-sm">
              Lampiran visual belum tersedia
            </p>
            <p className="mt-1 line-clamp-2 text-foreground/70 text-sm leading-relaxed">
              Dokumen yang terhubung pada laporan ini berupa file non-gambar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
