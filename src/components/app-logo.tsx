import Image from "next/image";
import Logo from "@/components/svgs/app-logo.svg";
import { cn } from "@/lib/utils";

export function AppLogoImage({ className }: { className?: string }) {
  return (
    <div className={cn("img-wrapper relative", className)}>
      <Image
        className="object-contain"
        fill
        alt="pagar logo"
        src="https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/pagar-logo.webp"
      />
    </div>
  );
}

export function AppLogo({ className }: { className?: string }) {
  return <Logo className={className} />;
}
