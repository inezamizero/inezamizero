"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Prayers ───────────────────────────────────────────────────────────────────
// Replace each [PLACEHOLDER] with the actual Kinyarwanda prayer text.

const PRAYERS = {
  // Sign of the Cross
  ikimenyetso: `[PLACEHOLDER — Ikimenyetso ky'Umusalaba]`,

  // Evening prayer / Thanksgiving
  gushimira: `[PLACEHOLDER — Isengesho cyo gushimira (Evening Thanksgiving)]`,

  // Our Father
  babaWacu: `[PLACEHOLDER — Baba Wacu]`,

  // Hail Mary
  ndakwibuka: `[PLACEHOLDER — Ndakwibuka Mariya]`,

  // Glory Be
  igisingizo: `[PLACEHOLDER — Igisingizo]`,

  // Act of Contrition
  kunenga: `[PLACEHOLDER — Isengesho cyo kunenga ibyaha (Act of Contrition)]`,

  // Examination of conscience
  kwisuzuma: `[PLACEHOLDER — Kwisuzuma (Examination of Conscience)]`,

  // Night prayer
  ijoro: `[PLACEHOLDER — Isengesho ryo ku mugoroba]`,

  // Hail Holy Queen
  hailHolyQueen: `[PLACEHOLDER — Turagusabira Nyina wa Yezu (Salve Regina)]`,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-siyoni-border" />
      <span className="font-body text-xs font-medium text-siyoni-mid tracking-widest uppercase whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-siyoni-border" />
    </div>
  );
}

function PrayerBlock({ name, text }: { name: string; text: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-heading text-lg font-semibold text-siyoni-brown mb-2">
        {name}
      </h3>
      <div className="bg-siyoni-card border border-siyoni-border rounded-card p-5 shadow-card">
        <p className="prayer-text text-siyoni-brown">{text}</p>
        {/* Audio player — uncomment when audio files are ready */}
        {/* <audio controls src="..." className="w-full mt-4" /> */}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NimugorobaPage() {
  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-xl mx-auto px-6 py-12">
        <Link
          href="/isengesho"
          className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors"
        >
          ← Subira
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
        >
          <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-2">
            Amasengesho ya Nimugoroba
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            Soza umunsi wawe neza mbere y'ubuturo.
          </p>

          {/* ── Opening ───────────────────────────────────────────────────── */}
          <SectionHeader title="Gutangira" />
          <PrayerBlock name="Ikimenyetso ky'Umusalaba" text={PRAYERS.ikimenyetso} />

          {/* ── Thanksgiving ──────────────────────────────────────────────── */}
          <SectionHeader title="Gushimira" />
          <PrayerBlock name="Isengesho cyo Gushimira" text={PRAYERS.gushimira} />

          {/* ── Examination of conscience ─────────────────────────────────── */}
          <SectionHeader title="Kwisuzuma" />
          <PrayerBlock name="Kwisuzuma Inkesha" text={PRAYERS.kwisuzuma} />
          <PrayerBlock name="Kunenga Ibyaha" text={PRAYERS.kunenga} />

          {/* ── Core prayers ──────────────────────────────────────────────── */}
          <SectionHeader title="Amasengesho Asanzwe" />
          <PrayerBlock name="Baba Wacu" text={PRAYERS.babaWacu} />
          <PrayerBlock name="Ndakwibuka Mariya" text={PRAYERS.ndakwibuka} />
          <PrayerBlock name="Igisingizo" text={PRAYERS.igisingizo} />
          <PrayerBlock name="Turagusabira Nyina wa Yezu" text={PRAYERS.hailHolyQueen} />

          {/* ── Night prayer ──────────────────────────────────────────────── */}
          <SectionHeader title="Isengesho ryo ku Mugoroba" />
          <PrayerBlock name="Isengesho ryo ku Mugoroba" text={PRAYERS.ijoro} />

          {/* Done */}
          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Imana ikuhe ijoro ryiza. 🙏
            </p>
            <Link
              href="/isengesho"
              className="inline-block mt-6 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors underline underline-offset-2"
            >
              Subira ku masengesho
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
