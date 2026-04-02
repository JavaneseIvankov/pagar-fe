import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Variants } from "motion";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={STAGGER_CONTAINER}
        className="max-w-xl"
      >
        <motion.h1
          variants={STAGGER_CHILD}
          className="font-extrabold text-5xl text-neutral-900 leading-[1.1] tracking-tight lg:text-6xl"
        >
          Transparansi Gizi Untuk{" "}
          <span className="text-green-600">Generasi Sehat</span>
        </motion.h1>
        <motion.p
          variants={STAGGER_CHILD}
          className="mt-6 text-lg text-neutral-600 leading-relaxed"
        >
          Platform terintegrasi untuk memantau{" "}
          <strong>kualitas nutrisi makanan</strong> dan{" "}
          <strong>transparansi anggaran</strong>. Pantau rincian menu harian
          hingga alokasi biaya bahan baku demi masa depan Indonesia yang lebih
          baik.
        </motion.p>
        <motion.div variants={STAGGER_CHILD} className="mt-8">
          <Button
            asChild
            className="inline-flex h-auto origin-center items-center gap-2 px-6 py-3 transition-all duration-150 ease-out hover:bg-green-700 hover:shadow-lg active:scale-[0.97]"
          >
            <Link href="#tentang-kami">
              Baca Selengkapnya
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero Illustration Collage */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} // Strong ease-out
        className="relative ml-auto aspect-square w-full max-w-[400px] lg:mx-auto lg:max-w-[500px]"
      >
        {/* Mock image wrappers with blur reveals and staggered float animations */}
        <div className="absolute top-0 right-0 h-3/4 w-3/4 rotate-3 transform overflow-hidden rounded-3xl border-4 border-white bg-neutral-200 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-green-100/50 font-bold text-2xl text-green-800/20">
            Visual Makanan Sehat
          </div>
        </div>
        <div className="absolute bottom-10 left-10 h-1/2 w-1/2 -rotate-6 transform overflow-hidden rounded-3xl border-4 border-white bg-neutral-200 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-orange-100/50 font-bold text-orange-800/20 text-xl">
            Nutrisi
          </div>
        </div>
        <div className="absolute top-1/2 -ml-10 h-1/3 w-1/3 rotate-12 transform overflow-hidden rounded-3xl border-4 border-white bg-neutral-200 shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center bg-blue-100/50 font-bold text-blue-800/20 text-sm">
            Gizi
          </div>
        </div>
      </motion.div>
    </section>
  );
}
