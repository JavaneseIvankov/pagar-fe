import { motion } from "motion/react";
import Image from "next/image";

export function InfoBannerSection() {
  return (
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
            <strong>PaGar </strong>bukan sekadar aplikasi pelaporan biasa. Kami
            adalah jembatan transparansi antara penyedia gizi (SPPG), sekolah,
            dan masyarakat umum demi memastikan generasi masa depan mendapatkan
            nutrisi terbaik tanpa ada anggaran yang tersembunyi. Kami percaya
            bahwa kejujuran adalah bumbu utama dalam setiap sajian. Melalui
            sistem integrasi data yang akurat, kami mengawal setiap butir nasi
            dan potongan lauk agar sesuai dengan standar gizi yang dijanjikan.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-8 border-white/20 bg-white/10 md:h-80 md:w-80"
        >
          {/* Mock circular image */}
          <Image
            fill
            className="object-cover"
            src={
              "https://bhnybebpsxnfyazsjxtk.supabase.co/storage/v1/object/public/pagar-assets/landing-info-banner.jpg"
            }
            alt="info banner"
          />
        </motion.div>
      </div>
    </section>
  );
}
