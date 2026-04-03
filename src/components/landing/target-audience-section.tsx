import type { Variants } from "motion";
import { motion } from "motion/react";
import {
  CheckCircleIcon,
  PeopleIcon,
  PersonShieldIcon,
  SchoolIcon,
  TruckIcon,
} from "../exported-icons";

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0, duration: 0.6 },
  },
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const TARGET_AUDIENCE = [
  {
    icon: PeopleIcon,
    iconColor: "text-purple-600",
    title: "Masyarakat Umum",
    items: [
      "Pantau asupan nutrisi harian anak Anda",
      "Berikan umpan balik",
      "Dukung transparansi donasi Anda",
    ],
    bgIcon: "bg-purple-100",
  },
  {
    icon: SchoolIcon,
    iconColor: "text-green-600",
    title: "Sekolah",
    items: [
      "Sistem pemantauan nutrisi harian otomatis",
      "Pantau menu yang disediakan pihak sekolah",
      "Jadwal dan rekap data makanan anak secara berkala",
    ],
    bgIcon: "bg-green-100",
  },
  {
    icon: TruckIcon,
    iconColor: "text-blue-600",
    title: "SPPG",
    items: [
      "Pencatatan distribusi gizi harian yang cepat",
      "Integrasi menu yang baik dengan sekolah dan orangtua",
      "Laporan klaim nutrisi gizi harian untuk anak sekolah",
    ],
    bgIcon: "bg-blue-100",
  },
  {
    icon: PersonShieldIcon,
    iconColor: "text-red-600",
    title: "Pemerintah",
    items: [
      "Monitoring distribusi gizi secara terpusat",
      "Evaluasi langsung kinerja SPPG dan serapan porsi",
      "Laporan transparan anggaran SPPG dengan data",
    ],
    bgIcon: "bg-red-100",
  },
];

export function TargetAudienceSection() {
  return (
    <section className="bg-neutral-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-bold text-3xl text-neutral-900">
            <span className="text-green-600">Solusi Untuk</span> Semua Pihak
          </h2>
          <div className="ml-4 hidden h-px flex-1 bg-neutral-300 md:block" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TARGET_AUDIENCE.map((card) => {
            return (
              <motion.div
                key={card.title}
                variants={STAGGER_CHILD}
                className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div
                  className={`h-12 w-12 rounded-xl ${card.bgIcon} mb-6 flex items-center justify-center`}
                >
                  <card.icon className={`size-5 ${card.iconColor}`} />
                </div>
                <h3 className="mb-4 font-bold text-lg text-neutral-900">
                  {card.title}
                </h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-neutral-600 text-sm leading-tight"
                    >
                      <CheckCircleIcon className="mt-0.5 shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
