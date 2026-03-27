import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

// FIXME: refactor, this should be a form component
export function SppgProfessionalInfoCard() {
  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0eb363] text-white">
            <HugeiconsIcon icon={InformationCircleIcon} size={18} />
          </div>
          Informasi Profesional & Wilayah
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-6 pt-2">
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="registrationCode"
            className="font-semibold text-foreground"
          >
            Kode Registrasi
          </FieldLabel>
          <Input
            id="registrationCode"
            placeholder="001000111"
            className="bg-background"
            disabled
          />
        </Field>
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="address"
            className="font-semibold text-foreground"
          >
            Alamat
          </FieldLabel>
          <Input
            id="address"
            placeholder="Masukkan Alamat"
            className="bg-background"
          />
        </Field>
      </CardContent>
    </Card>
  );
}
