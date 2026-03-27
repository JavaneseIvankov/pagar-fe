import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

// FIXME: refactor, this should be a from component
export function SppgAccountSettingsCard() {
  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0eb363] text-white">
            <HugeiconsIcon icon={UserIcon} size={18} />
          </div>
          Pengaturan dan Keamanan Akun
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-6 pt-2">
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="email"
            className="font-semibold text-muted-foreground"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan Email"
            className="bg-background"
          />
        </Field>
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="username"
            className="font-semibold text-foreground"
          >
            Username
          </FieldLabel>
          <Input
            id="username"
            placeholder="Masukkan username"
            className="bg-background"
          />
        </Field>
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="password"
            className="font-semibold text-foreground"
          >
            Kata Sandi
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Masukkan kata sandi"
            className="bg-background"
          />
        </Field>
      </CardContent>
    </Card>
  );
}
