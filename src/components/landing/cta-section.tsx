import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="mb-4 font-bold text-3xl text-foreground">
          Wujudkan Transparansi Bersama Kami
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Bergabunglah dalam gerakan nasional untuk memastikan setiap rupiah
          anggaran gizi pembuka pintu masa depan anak bangsa yang berkualitas.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-auto w-full origin-center px-8 py-3 font-medium shadow-sm transition-all duration-150 ease-out active:scale-[0.97] sm:w-auto"
          >
            <Link href="/auth/daftar">Daftar Sekarang</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-auto w-full origin-center px-8 py-3 font-medium transition-all duration-150 ease-out active:scale-[0.97] sm:w-auto"
          >
            <Link href="">Baca Selengkapnya</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
