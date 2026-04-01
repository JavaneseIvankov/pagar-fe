"use client";

import {
  ArrowRight01Icon,
  BubbleChatIcon,
  Building01Icon,
  CallIcon,
  CheckmarkBadge01Icon,
  EyeIcon,
  Facebook01Icon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  Note01Icon,
  TruckIcon,
  TwitterIcon,
  UniversityIcon,
  UserGroupIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { buttonVariants } from "@/components/ui/button";

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

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-50 font-sans text-neutral-900 selection:bg-green-200 selection:text-green-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-border/60 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex w-full items-center gap-8">
            <Link
              href="#beranda"
              className="origin-left transition-transform duration-150 ease-out active:scale-95"
            >
              <AppLogo className="h-10" variant="full" />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex md:flex-1">
              <a
                href="#beranda"
                className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
              >
                Beranda
              </a>
              <a
                href="#tentang-kami"
                className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
              >
                Tentang Kami
              </a>
              <a
                href="#alur-proses"
                className="font-medium text-neutral-600 text-sm transition-colors hover:text-green-600"
              >
                Alur Proses
              </a>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href="/auth/masuk"
              className={buttonVariants({
                variant: "ghost",
                className: "mr-2 rounded-full px-4 font-medium",
              })}
            >
              Masuk
            </Link>
            <Link
              href="/auth/daftar"
              className={buttonVariants({
                className: "h-10 rounded-full px-6 font-medium shadow-sm",
              })}
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
            <Link
              href="#tentang-kami"
              className="inline-flex origin-center items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-150 ease-out hover:bg-green-700 hover:shadow-lg active:scale-[0.97]"
            >
              Baca Selengkapnya{" "}
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Illustration Collage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} // Strong ease-out
          className="relative h-[400px] lg:h-[500px]"
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

      {/* Info Banner Section */}
      <section
        id="tentang-kami"
        className="relative overflow-hidden bg-green-700 px-6 py-16 text-white"
      >
        {/* Decorative background element */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgb(255, 255, 255) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1"
          >
            <h2 className="mb-6 font-bold text-3xl leading-tight lg:text-4xl">
              Karena Setiap Piring Punya Cerita dan Setiap Rupiah Ada
              Pertanggungjawabannya.
            </h2>
            <p className="text-green-50 text-lg leading-relaxed">
              <strong>PaGar </strong>bukan sekadar aplikasi pelaporan biasa.
              Kami adalah jembatan transparansi antara penyedia gizi (SPPG),
              sekolah, dan masyarakat umum demi memastikan generasi masa depan
              mendapatkan nutrisi terbaik tanpa ada anggaran yang tersembunyi.
              Kami percaya bahwa kejujuran adalah bumbu utama dalam setiap
              sajian. Melalui sistem integrasi data yang akurat, kami mengawal
              setiap butir nasi dan potongan lauk agar sesuai dengan standar
              gizi yang dijanjikan.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="h-64 w-64 shrink-0 overflow-hidden rounded-full border-8 border-white/20 bg-white/10 md:h-80 md:w-80"
          >
            {/* Mock circular image */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-400 to-green-600 opacity-80 mix-blend-multiply" />
          </motion.div>
        </div>
      </section>

      {/* Target Audience / Solusi Section */}
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
            {[
              {
                icon: UserGroupIcon,
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
                icon: UniversityIcon,
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
                icon: Building01Icon,
                iconColor: "text-red-600",
                title: "Pemerintah",
                items: [
                  "Monitoring distribusi gizi secara terpusat",
                  "Evaluasi langsung kinerja SPPG dan serapan porsi",
                  "Laporan transparan anggaran SPPG dengan data",
                ],
                bgIcon: "bg-red-100",
              },
            ].map((card) => {
              return (
                <motion.div
                  key={card.title}
                  variants={STAGGER_CHILD}
                  className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${card.bgIcon} mb-6 flex items-center justify-center`}
                  >
                    <HugeiconsIcon
                      icon={card.icon}
                      size={24}
                      className={card.iconColor}
                    />
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
                        <HugeiconsIcon
                          icon={CheckmarkBadge01Icon}
                          size={16}
                          className="mt-0.5 shrink-0 text-green-500"
                        />
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

      {/* Stats Section */}
      <section className="bg-green-700 px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="flex flex-wrap items-center justify-center gap-10 text-center sm:justify-between"
          >
            {[
              { val: "1.000+", label: "Laporan Aktif" },
              { val: "200+", label: "Sekolah/Panti" },
              { val: "100%", label: "Transparansi Anggaran" },
              { val: "50+", label: "Donatur" },
            ].map((stat) => {
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

      {/* How We Work Section */}
      <section id="alur-proses" className="relative bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="hidden h-px flex-1 bg-neutral-300 sm:block" />
            <h2 className="text-center font-bold text-3xl text-neutral-900">
              Bagaimana Kami <span className="text-green-600">Bekerja?</span>
            </h2>
            <div className="hidden h-px flex-1 bg-neutral-300 sm:block" />
          </div>

          <div className="mb-10 flex w-full md:w-auto">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 font-semibold text-neutral-700 shadow-sm transition-all duration-150 ease-out hover:bg-neutral-50 active:scale-[0.97]"
            >
              <span className="mr-1 rounded-lg bg-purple-100 p-1.5 text-purple-600">
                <HugeiconsIcon icon={UserGroupIcon} size={16} />
              </span>
              Masyarakat Umum
              <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </span>
            </button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="relative grid gap-6 sm:grid-cols-3"
          >
            {/* Step 1 */}
            <motion.div
              variants={STAGGER_CHILD}
              className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-purple-50 p-8"
            >
              <div className="mb-4 font-extrabold text-3xl text-purple-600">
                01
              </div>
              <h3 className="mb-3 font-bold text-neutral-900 text-xl">
                Pantau Data
              </h3>
              <p className="mb-10 text-neutral-600 text-sm leading-relaxed">
                Warga mudah memantau nutrisi menu harian dan anggaran belanja
                lewat platform web.
              </p>
              <div className="transform-origin-bottom-right absolute right-6 bottom-6 text-purple-400 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                <HugeiconsIcon icon={EyeIcon} size={40} />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={STAGGER_CHILD}
              className="group relative transform rounded-2xl bg-purple-700 p-8 text-white shadow-xl sm:-translate-y-4"
            >
              <div className="mb-4 font-extrabold text-3xl text-purple-300">
                02
              </div>
              <h3 className="mb-3 font-bold text-xl">Laporan</h3>
              <p className="mb-10 text-purple-100 text-sm leading-relaxed">
                Mengecek form distribusi logistik, serapan dari menu, laporan
                uang di aplikasi.
              </p>
              <div className="transform-origin-bottom-left absolute bottom-6 left-6 text-purple-300 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                <HugeiconsIcon icon={Note01Icon} size={40} />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={STAGGER_CHILD}
              className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-purple-50 p-8"
            >
              <div className="mb-4 font-extrabold text-3xl text-purple-600">
                03
              </div>
              <h3 className="mb-3 font-bold text-neutral-900 text-xl">
                Umpan Balik
              </h3>
              <p className="mb-10 text-neutral-600 text-sm leading-relaxed">
                Memberikan saran dan dukungan pada SPPG di form aduan / masukan
                secara anonim atau public.
              </p>
              <div className="transform-origin-bottom-left absolute bottom-6 left-6 text-purple-400 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                <HugeiconsIcon icon={BubbleChatIcon} size={40} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-4 font-bold text-3xl text-neutral-900">
            Wujudkan Transparansi Bersama Kami
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
            Bergabunglah dalam gerakan nasional untuk memastikan setiap rupiah
            anggaran gizi pembuka pintu masa depan anak bangsa yang berkualitas.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/daftar"
              className="w-full origin-center rounded-full bg-green-600 px-8 py-3 font-medium text-white shadow-sm transition-all duration-150 ease-out hover:bg-green-700 active:scale-[0.97] sm:w-auto"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/about"
              className="w-full origin-center rounded-full border border-green-200 bg-white px-8 py-3 font-medium text-green-700 transition-all duration-150 ease-out hover:bg-green-50 active:scale-[0.97] sm:w-auto"
            >
              Baca Selengkapnya
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-neutral-200 border-t bg-neutral-100 px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-neutral-900">
              <span className="text-orange-500">$</span>PaGar
            </h4>
            <div className="inline-block rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
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
              {[
                "Pemkot",
                "E-Logistik",
                "Dispendukcapil",
                "Polres",
                "Polda",
                "Bapenda",
                "Kementerian Keuangan RI",
                "PPATK Malang",
              ].map((link) => (
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
              {[
                { Icon: Facebook01Icon, name: "facebook" },
                { Icon: TwitterIcon, name: "twitter" },
                { Icon: InstagramIcon, name: "instagram" },
                { Icon: YoutubeIcon, name: "youtube" },
              ].map(({ Icon, name }) => {
                return (
                  <a
                    key={name}
                    href="/"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all duration-150 hover:bg-neutral-50 hover:text-green-600 active:scale-95"
                  >
                    <HugeiconsIcon icon={Icon} size={18} />
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <h4 className="mb-4 font-bold text-neutral-900">
                Transparansi Anggaran
              </h4>
              <ul className="space-y-2">
                {["APBD", "DIPA", "BOS", "Bantuan SPPG"].map((link) => (
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
    </div>
  );
}
