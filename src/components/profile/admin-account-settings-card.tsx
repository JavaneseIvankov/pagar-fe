import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import type { TAdminProfile } from "@/types";

export interface AdminAccountSettingsCardProps {
  profile: Pick<TAdminProfile, "email" | "name" | "username">;
}

export function AdminAccountSettingsCard({
  profile,
}: AdminAccountSettingsCardProps) {
  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0eb363] text-white">
            <HugeiconsIcon icon={UserIcon} size={18} />
          </div>
          Pengaturan Akun
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-6 pt-2">
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="nama"
              className="font-semibold text-foreground"
            >
              Nama
            </FieldLabel>
            <Input
              id="nama"
              defaultValue={profile.name}
              className="bg-background"
              readOnly
            />
          </Field>

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
              defaultValue={profile.email}
              className="bg-background"
              readOnly
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
              defaultValue={profile.username}
              className="bg-background"
              readOnly
            />
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="password"
              className="font-semibold text-foreground"
            >
              Kata Sandi
            </FieldLabel>
            <PasswordInput
              id="password"
              defaultValue="********"
              className="bg-background"
              disabled
              readOnly
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
