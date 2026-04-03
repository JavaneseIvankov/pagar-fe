import { ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../animate-ui/components/radix/accordion";

const FAQ_DATA: { title: string; content: string }[] = [
  {
    title: "Apa itu PaGar",
    content:
      "PaGar (Pantau Anggaran Gizi Rakyat) adalah platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran demi masa depan yang lebih baik",
  },
  {
    title: "Siapa saja yang bisa menggunakan aplikasi ini",
    content:
      "Aplikasi ini dirancang untuk empat pihak utama: Masyarakat Umum, Penyedia Gizi (SPPG), dan Pemerintah sebagai admin",
  },
  {
    title: "Apakah data anggaran di PaGar benar-benar akurat?",
    content:
      "Ya, kami berkomitmen pada transparansi 100% di mana setiap alokasi biaya bahan baku dapat dipantau secara terbuka untuk mencegah penyimpangan",
  },
  {
    title: "Apakah masyarakat umum bisa melihat rincian biaya secara mendetail",
    content:
      "Ya, masyarakat unum dapat mengakses Dashboard Publik untuk memantau rincian menu harian hingga transparansi alokasi anggaran biaya per porsi secara terbuka guna memastikan efisiensi dana gizi nasional",
  },
  {
    title: "Bagaimana jika ditemukan ketidaksesuaian laporan di lapangan",
    content:
      "Jika ditemukan ketidaksesuaian, masyarakat dapat melaporkannya melalui fitur 'Laporan' di Dashboard Publik. Laporan akan segera ditinjau oleh pihak yang berwenang dan ditindaklanjuti sesuai prosedur yang berlaku",
  },
];

function FaqAccordion({
  value,
  title,
  content,
}: {
  value: string;
  title: string;
  content: string;
}) {
  return (
    <AccordionItem
      value={value}
      className="mb-4 rounded-xl border border-primary bg-muted px-6 py-3 last:mb-0 last:border-b"
    >
      <AccordionTrigger
        showArrow={false}
        className="group font-bold text-primary hover:no-underline"
      >
        {title}
        <div className="flex size-7 items-center justify-center rounded-full bg-primary text-background transition-transform duration-200 group-data-[state=open]:rotate-180">
          <HugeiconsIcon icon={ChevronDown} size={20} fill="currentColor" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-6 text-primary">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
}

export function FaqAccordions({ className }: { className?: string }) {
  return (
    <Accordion type="multiple" className={cn("max-w-[800px]", className)}>
      {FAQ_DATA.map((faq, idx) => (
        <FaqAccordion
          // biome-ignore lint/suspicious/noArrayIndexKey: stable index
          key={`faq-${idx}`}
          value={`faq-${idx}`}
          title={faq.title}
          content={faq.content}
        />
      ))}
    </Accordion>
  );
}
