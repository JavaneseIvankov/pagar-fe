import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export interface SppgProfessionalInfoCardProps {
  address: string;
  registrationCode: string;
}

export function SppgProfessionalInfoCard({
  address,
  registrationCode,
}: SppgProfessionalInfoCardProps) {
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
            Kode BGN / Registrasi
          </FieldLabel>
          <Input
            id="registrationCode"
            defaultValue={registrationCode}
            className="bg-background"
            readOnly
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
            defaultValue={address}
            className="bg-background"
            readOnly
          />
        </Field>
      </CardContent>
    </Card>
  );
}
