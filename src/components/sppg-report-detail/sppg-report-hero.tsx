import Image from "next/image";

export interface SppgReportHeroProps {
  title: string;
  imageUrl: string;
}

export function SppgReportHero({ title, imageUrl }: SppgReportHeroProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/10 lg:aspect-[2/1]">
      <Image fill src={imageUrl} alt={title} className="object-cover" />
    </div>
  );
}
