"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Heart,
  Music,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImigongoPattern from "@/components/ImigongoPattern";
import Navbar from "@/components/Navbar";
import { translateGospelRef } from "@/lib/readings";

const sections = [
  {
    name: "Amasengesho Rusange",
    desc: "Amasengesho ya buri munsi: mugitondo, nimugoroba, n'ibindi",
    href: "/isengesho",
    icon: BookOpen,
  },
  {
    name: "Rozari n'amashapure",
    desc: "Vuga Rozari wiyambaza Bikiramariya, ishapure y'impuhwe z'Imana",
    href: "/rozari",
    icon: Heart,
  },
  {
    name: "Noveni",
    desc: "Amasengesho y'iminsi icyenda atandukanye",
    href: "/novena",
    icon: CalendarDays,
  },
  {
    name: "Misa y'Umunsi",
    desc: "Amasomo ya buri munsi, umutagatifu w'uyu munsi, na Pacis TV",
    href: "/misa",
    icon: Sun,
  },
  {
    name: "Indirimbo",
    desc: "Indirimbo zo guhimbaza na links za YouTube",
    href: "/indirimbo",
    icon: Music,
  },
];

const MONTHS_RW = [
  "Mutarama", "Gashyantare", "Werurwe", "Mata",
  "Gicurasi", "Kamena", "Nyakanga", "Kanama",
  "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" as const, delay },
});

const tileVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Home() {
  const today = new Date();
  const dayNum = today.getDate();
  const monthRw = MONTHS_RW[today.getMonth()];
  const year = today.getFullYear();
  const todayLabel = `${dayNum} ${monthRw} ${year}`;

  const [gospelRef, setGospelRef] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    // Use the user's local date so it matches their timezone, same as the Misa page.
    const localDate = new Date();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const y = localDate.getFullYear();

    fetch(`/api/readings?year=${y}&month=${month}&day=${day}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const gospel = data.readings?.gospel;
        setGospelRef(gospel ? translateGospelRef(gospel) : null);
      })
      .catch(() => setGospelRef(null));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="min-h-screen font-body pb-20 md:pb-0"
    >
      <Navbar />

      {/* Imigongo strip — between nav and hero */}
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      {/* ── Hero — stays dark ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden bg-siyoni-brown">
        <Image
          src="/images/hero.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-30"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1
            {...fadeUp(0.2)}
            className="font-heading text-8xl md:text-9xl font-bold text-siyoni-cream tracking-wide mb-6"
          >
            Siyoni
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-base md:text-lg text-siyoni-cream/70 italic mb-10 leading-relaxed"
          >
            &ldquo;Kuko Kiliziya muri kumwe, aho uri hose&rdquo;
          </motion.p>

          <motion.div {...fadeUp(0.4)}>
            <Link
              href="/isengesho"
              className="inline-flex items-center justify-center px-10 py-3.5 rounded-card bg-siyoni-cream text-siyoni-brown font-body text-sm font-medium hover:bg-white transition-colors duration-200"
            >
              Tangira Gusenga
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="absolute bottom-8"
        >
          <div className="w-px h-10 bg-siyoni-cream opacity-30" />
        </motion.div>
      </section>

      {/* ── Everything below the hero is light cream ──────────────────────── */}
      <div className="bg-siyoni-cream">

        {/* Imigongo divider — hero to sections */}
        <div className="h-10 overflow-hidden">
          <ImigongoPattern className="w-full h-full" />
        </div>

        {/* ── Section tiles ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="font-heading text-3xl font-semibold text-siyoni-brown text-center mb-10"
          >
            Hitamo uko usenga
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  variants={tileVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07 }}
                  className="w-full"
                >
                  <Link
                    href={section.href}
                    className="group block w-full h-full bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-8 h-0.5 bg-siyoni-ochre mb-4" />
                    <Icon size={28} strokeWidth={1.5} className="text-siyoni-ochre mb-3" />
                    <h3 className="font-heading text-lg font-semibold text-siyoni-brown mb-2 leading-snug">
                      {section.name}
                    </h3>
                    <p className="font-body text-sm text-siyoni-mid leading-relaxed">
                      {section.desc}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Misa y'Umunsi widget ─────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-6 md:p-8"
          >
            {/* Header */}
            <div className="mb-5">
              <p className="font-body text-xs font-medium text-siyoni-mid tracking-[0.12em] uppercase mb-1">
                Uyu munsi · {todayLabel}
              </p>
              <h2 className="font-heading text-2xl font-semibold text-siyoni-brown">
                Misa y&apos;Umunsi
              </h2>
            </div>

            {/* Gospel reading */}
            <div className="border-l-2 border-siyoni-ochre pl-4 mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
                  Ubutumwa bwiza
                </p>
                <p className="font-body text-xs text-siyoni-mid ml-4">
                  {gospelRef === undefined && "..."}
                  {gospelRef === null && "Ntibiboneste"}
                  {gospelRef}
                </p>
              </div>
              {/* Full Kinyarwanda passage text is entered by hand — no public API has it. */}
              <p className="font-body text-sm text-siyoni-brown leading-relaxed line-clamp-4">
                [PLACEHOLDER — umwandiko uzongerwaho vuba]
              </p>
            </div>

            {/* Link to full Misa page */}
            <Link
              href="/misa"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-card bg-siyoni-brown text-siyoni-cream font-body text-sm font-medium hover:bg-siyoni-mid transition-colors duration-200"
            >
              Reba Misa y&apos;Umunsi yose
              <ChevronRight size={15} />
            </Link>
          </motion.div>
        </section>

        {/* Imigongo divider — above footer */}
        <div className="h-10 overflow-hidden">
          <ImigongoPattern className="w-full h-full" />
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="px-6 py-10 text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
            <p className="font-heading text-2xl font-bold text-siyoni-brown tracking-wide">
              Siyoni
            </p>

            <p className="font-body text-sm text-siyoni-mid italic">
              Kuko Kiliziya ikuri mu mutima, aho uri hose
            </p>

            <a
              href="https://ko-fi.com/siyoni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card border border-siyoni-mid text-siyoni-mid font-body text-sm font-medium hover:border-siyoni-brown hover:text-siyoni-brown transition-colors duration-200"
            >
              Dutere inkunga
              <ExternalLink size={13} />
            </a>

            <p className="font-body text-xs text-siyoni-mid opacity-60">
              Inkunga yawe idufasha kugera kuri benshi.
            </p>

            <p className="font-body text-xs text-siyoni-mid opacity-40 mt-2">
              © {year} Siyoni
            </p>
          </div>
        </footer>

      </div>
    </motion.div>
  );
}
