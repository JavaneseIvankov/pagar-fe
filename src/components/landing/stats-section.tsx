import type { Variants } from "motion";
import { motion } from "motion/react";

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

const STATS = [
  { val: "1.000+", label: "Laporan Aktif" },
  { val: "200+", label: "Sekolah/Panti" },
  { val: "100%", label: "Transparansi Anggaran" },
  { val: "50+", label: "Donatur" },
];

export function StatsSection() {
  return (
    <section id="data-publik" className="bg-green-700 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="flex flex-wrap items-center justify-center gap-10 text-center sm:justify-between"
        >
          {STATS.map((stat) => {
            return (
              <motion.div
                key={stat.label}
                variants={STAGGER_CHILD}
                className="flex flex-col items-center"
              >
                <div className="inline-block rounded-full bg-white px-6 py-2 font-extrabold text-2xl text-green-700 shadow-sm lg:text-3xl">
                  {stat.val}
                </div>
                <span className="mt-3 font-semibold text-sm uppercase tracking-wide opacity-90">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
