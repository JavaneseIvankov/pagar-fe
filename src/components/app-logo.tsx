import Image from "next/image";
import Logo from "@/components/svgs/app-logo.svg";
import LogoSymbol from "@/components/svgs/app-logo-symbol.svg";
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

type AppLogoProps = {
  className?: string;
  variant?: "symbol" | "full";
};

export function AppLogo({ className, variant = "full" }: AppLogoProps) {
  if (variant === "symbol") {
    return <LogoSymbol className={className} />;
  }
  return <Logo className={className} />;
}
