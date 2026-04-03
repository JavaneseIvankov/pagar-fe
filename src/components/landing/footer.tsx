import {
  CallIcon,
  Facebook01Icon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  TwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AppLogo } from "@/components/app-logo";

const GOVERNMENT_LINKS = [
  "Pemkot",
  "E-Logistik",
  "Dispendukcapil",
  "Polres",
  "Polda",
  "Bapenda",
  "Kementerian Keuangan RI",
  "PPATK Malang",
];

const SOCIAL_LINKS = [
  { Icon: Facebook01Icon, name: "facebook" },
  { Icon: TwitterIcon, name: "twitter" },
  { Icon: InstagramIcon, name: "instagram" },
  { Icon: YoutubeIcon, name: "youtube" },
];

const BUDGET_LINKS = ["APBD", "DIPA", "BOS", "Bantuan SPPG"];

export function Footer() {
  return (
    <footer className="border-neutral-200 border-t bg-neutral-100 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-neutral-900">
            <AppLogo className="h-10" />
          </h4>
          <div className="inline-block rounded-lg py-4">
            <h5 className="mb-2 font-bold text-neutral-900 text-sm">
              Pemerintah Kota Malang
            </h5>
            <p className="flex max-w-[200px] items-start gap-2 text-neutral-500 text-xs">
              <HugeiconsIcon
                icon={Location01Icon}
                size={14}
                className="mt-0.5 shrink-0"
              />
              Jl. Tugu No.1, Kiduldalem, Kec. Klojen, Kota Malang, Jawa Timur
              65111
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-neutral-900">Kontak</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-neutral-600 text-sm transition-colors duration-150 hover:text-green-600"
              >
                <HugeiconsIcon icon={Mail01Icon} size={16} />{" "}
                info.pagar@malangkota.go.id
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-neutral-600 text-sm transition-colors duration-150 hover:text-green-600"
              >
                <HugeiconsIcon icon={CallIcon} size={16} /> (0341) 366666
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-neutral-900">Pemerintah</h4>
          <ul className="space-y-2">
            {GOVERNMENT_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="/"
                  className="block inline-block w-max text-neutral-600 text-sm transition-colors transition-transform duration-150 hover:translate-x-1 hover:text-green-600"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-neutral-900">Media Sosial</h4>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ Icon, name }) => {
              return (
                <a
                  key={name}
                  href="/"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-800 transition-all duration-150 hover:bg-neutral-50 active:scale-95"
                >
                  <HugeiconsIcon
                    className="font-semibold"
                    icon={Icon}
                    size={18}
                  />
                </a>
              );
            })}
          </div>

          <div className="mt-8">
            <h4 className="mb-4 font-bold text-neutral-900">
              Transparansi Anggaran
            </h4>
            <ul className="space-y-2">
              {BUDGET_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="/"
                    className="block inline-block w-max text-neutral-600 text-sm transition-colors transition-transform duration-150 hover:translate-x-1 hover:text-green-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
