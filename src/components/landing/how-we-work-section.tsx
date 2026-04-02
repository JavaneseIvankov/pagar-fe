"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BubbleChatIcon,
  ChartLineData01Icon,
  CheckListIcon,
  EyeIcon,
  Note01Icon,
  StarIcon,
  Task01Icon,
  TruckIcon,
  UniversityIcon,
  UserGroupIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepCard } from "./step-card";

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { type: "spring", bounce: 0, duration: 0.6 },
  },
};

const CATEGORIES = [
  {
    id: "masyarakat",
    title: "Masyarakat Umum",
    icon: UserGroupIcon,
    color: "purple" as const,
    bgIcon: "bg-purple-100 text-purple-600",
    steps: [
      {
        stepNumber: "01",
        title: "Pantau Data",
        content:
          "Mengakses dashboard publik untuk melihat rincian gizi dan transparansi anggaran harian.",
        icon: EyeIcon,
      },
      {
        stepNumber: "02",
        title: "Laporan",
        content:
          "Mengunggah foto atau laporan jika menemukan distribusi makanan yang tidak layak.",
        icon: Note01Icon,
      },
      {
        stepNumber: "03",
        title: "Umpan Balik",
        content:
          "Mendukung terciptanya ekosistem gizi yang jujur melalui partisipasi aktif di kolom ulasan.",
        icon: BubbleChatIcon,
      },
    ],
  },
  {
    id: "sekolah",
    title: "Sekolah",
    icon: UniversityIcon,
    color: "green" as const,
    bgIcon: "bg-green-100 text-green-600",
    steps: [
      {
        stepNumber: "01",
        title: "Terima & Cek",
        content:
          "Sekolah menerima distribusi makanan dari SPPG dan melakukan pengecekan fisik di tempat.",
        icon: CheckListIcon,
      },
      {
        stepNumber: "02",
        title: "Validasi",
        content:
          "Melihat detail menu di platform untuk memastikan kesesuaian sajian.",
        icon: Task01Icon,
      },
      {
        stepNumber: "03",
        title: "Beri Ulasan",
        content:
          "Memberikan rating atau laporan jika ditemukan ketidaksesuaian kualitas atau porsi.",
        icon: StarIcon,
      },
    ],
  },
  {
    id: "sppg",
    title: "Tim SPPG",
    icon: TruckIcon,
    color: "blue" as const,
    bgIcon: "bg-sky-100 text-sky-600",
    steps: [
      {
        stepNumber: "01",
        title: "Input Laporan",
        content:
          "Mengunggah detail menu harian, rincian kalori, dan foto makanan sebelum distribusi.",
        icon: Note01Icon,
      },
      {
        stepNumber: "02",
        title: "Kelola Anggaran",
        content:
          "Mencatat penggunaan dana bahan baku secara transparan sebagai bukti.",
        icon: Wallet01Icon,
      },
      {
        stepNumber: "03",
        title: "Evaluasi Kinerja",
        content:
          "Menerima rating dari sekolah & masyarakat untuk perbaikan kualitas layanan berkelanjutan.",
        icon: ChartLineData01Icon,
      },
    ],
  },
];

export function HowWeWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = CATEGORIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((curr) => (curr + 1) % CATEGORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (curr) => (curr - 1 + CATEGORIES.length) % CATEGORIES.length,
    );
  };

  return (
    <section id="alur-proses" className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <div className="hidden h-px flex-1 bg-neutral-300 md:block" />
        <h2 className="font-bold text-3xl text-neutral-900">
          Bagaimana Kami <span className="text-green-600">Bekerja?</span>
        </h2>
        <div className="hidden h-px flex-1 bg-neutral-300 md:block" />
      </div>

      {/* Carousel Controls */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeCategory.bgIcon}`}
          >
            <HugeiconsIcon icon={activeCategory.icon} size={24} />
          </div>
          <h3 className="font-bold text-2xl text-neutral-900">
            {activeCategory.title}
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            onClick={handlePrev}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            onClick={handleNext}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Button>
        </div>
      </div>

      {/* Carousel Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER_CONTAINER}
            className="grid gap-6 sm:grid-cols-3"
          >
            {activeCategory.steps.map((step, idx) => {
              const isMiddle = idx === 1;
              return (
                <StepCard
                  key={step.stepNumber}
                  variants={STAGGER_CHILD}
                  variant={isMiddle ? "default" : "outline"}
                  color={activeCategory.color}
                  stepNumber={step.stepNumber}
                  title={step.title}
                  content={step.content}
                  icon={step.icon}
                  iconPosition="left"
                  className={isMiddle ? "sm:-translate-y-4" : "sm:h-full"}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
