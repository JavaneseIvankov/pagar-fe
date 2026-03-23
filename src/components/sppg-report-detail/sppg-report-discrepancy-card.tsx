import { SpeakerIcon } from "@/components/exported-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SppgReportDiscrepancyCard() {
  return (
    <Card className="mt-2 mb-2 flex w-full flex-col items-center gap-4 rounded-xl border-0 bg-[#0a0a0a] p-6 text-center text-white shadow-none">
      <div className="mt-2 text-green-500">
        <SpeakerIcon className="h-8 w-8" />
      </div>
      <div className="mb-2 space-y-1.5">
        <h3 className="font-bold text-base leading-tight">
          Temukan Ketidaksesuaian?
        </h3>
        <p className="px-2 font-medium text-[11px] text-zinc-400 leading-relaxed">
          Laporkan jika gizi atau porsi tidak sesuai dengan yang tertera di
          platform ini
        </p>
      </div>
      <Button className="h-10 w-full max-w-[200px] rounded-lg bg-white font-extrabold text-black text-sm hover:bg-zinc-200">
        Laporkan
      </Button>
    </Card>
  );
}
