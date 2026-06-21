"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Prayers ───────────────────────────────────────────────────────────────────
// Replace each [PLACEHOLDER] with the actual Kinyarwanda prayer text.
// The key (e.g. ikimenyetso) is for code reference only — not shown to users.

const PRAYERS = {
  // Sign of the Cross
  ikimenyetso: `[PLACEHOLDER — Ikimenyetso ky'Umusalaba]`,

  // Morning Offering
  kwiyegurira: `[PLACEHOLDER — Isengesho ryo kwiyegurira igitondo]`,

  // Our Father
  babaWacu: `[PLACEHOLDER — Baba Wacu]`,

  // Hail Mary
  ndakwibuka: `[PLACEHOLDER — Ndakwibuka Mariya]`,

  // Glory Be
  igisingizo: `[PLACEHOLDER — Igisingizo]`,

  // Act of Faith
  kwemera: `[PLACEHOLDER — Isengesho cyo kwemera (Act of Faith)]`,

  // Act of Hope
  kwizigama: `[PLACEHOLDER — Isengesho cyo kwizigama (Act of Hope)]`,

  // Act of Charity
  gukunda: `[PLACEHOLDER — Isengesho cyo gukunda (Act of Charity)]`,

  // Act of Contrition
  kunenga: `[PLACEHOLDER — Isengesho cyo kunenga ibyaha (Act of Contrition)]`,

  // Morning Prayer (general)
  igitondo: `[PLACEHOLDER — Isengesho ryo mu gitondo]`,
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

export default function MugitondoPage() {
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
            Amasengesho ya Mugitondo
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            Tangira umunsi wawe uherekejwe n'Imana.
          </p>

          {/* ── Opening ───────────────────────────────────────────────────── */}
          <SectionHeader title="Gutangira" />
          <PrayerBlock name="Ikimenyetso ky'Umusalaba" text={PRAYERS.ikimenyetso} />

          {/* ── Offerings ─────────────────────────────────────────────────── */}
          <SectionHeader title="Kwiyegurira" />
          <PrayerBlock name="Isengesho ryo Kwiyegurira Igitondo" text={PRAYERS.kwiyegurira} />

          {/* ── Core prayers ──────────────────────────────────────────────── */}
          <SectionHeader title="Amasengesho Asanzwe" />
          <PrayerBlock name="Baba Wacu" text={PRAYERS.babaWacu} />
          <PrayerBlock name="Ndakwibuka Mariya" text={PRAYERS.ndakwibuka} />
          <PrayerBlock name="Igisingizo" text={PRAYERS.igisingizo} />

          {/* ── Acts ──────────────────────────────────────────────────────── */}
          <SectionHeader title="Ivugurura" />
          <PrayerBlock name="Kwemera" text={PRAYERS.kwemera} />
          <PrayerBlock name="Kwizigama" text={PRAYERS.kwizigama} />
          <PrayerBlock name="Gukunda" text={PRAYERS.gukunda} />
          <PrayerBlock name="Kunenga Ibyaha" text={PRAYERS.kunenga} />

          {/* ── Morning prayer ────────────────────────────────────────────── */}
          <SectionHeader title="Isengesho ryo mu Gitondo" />
          <PrayerBlock name="Isengesho ryo mu Gitondo" text={PRAYERS.igitondo} />

          {/* Done */}
          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Imana ikuhe umunsi mwiza. 🙏
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
