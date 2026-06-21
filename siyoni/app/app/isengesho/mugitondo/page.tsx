"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Liturgical helpers ────────────────────────────────────────────────────────

function getEaster(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function isLent(date: Date): boolean {
  const year = date.getFullYear();
  const easter = getEaster(year);
  const ashWed = new Date(easter);
  ashWed.setDate(easter.getDate() - 46);
  const palmSunday = new Date(easter);
  palmSunday.setDate(easter.getDate() - 7);
  return date >= ashWed && date < palmSunday;
}

// ── Prayer content ────────────────────────────────────────────────────────────
// Replace each [PLACEHOLDER] with the actual Kinyarwanda text.
// You can scan the physical book using Google Lens or Apple Live Text to copy text fast.

const PRAYERS = {

  // ── 1. Intangiriro ────────────────────────────────────────────────────────
  intangiriro: `[PLACEHOLDER — Intangiriro (Opening prayer)]`,
  ikuzoIntangiriro: `[PLACEHOLDER — Ikuzo ry'Imana (Glory to God) — mu Ntangiriro]`,

  // ── 2. Indirimbo ──────────────────────────────────────────────────────────
  inyikirizoIndirimbo: `[PLACEHOLDER — Inyikirizo y'Indirimbo (Antiphon before Hymn)]`,
  alleluya: `[PLACEHOLDER — Alleluya (hazivugwa mu Igisibo)]`,
  indirimbo: `[PLACEHOLDER — Indirimbo yo mu gitondo (Morning Hymn)]`,

  // ── 3. Igisingizo ─────────────────────────────────────────────────────────
  inyikirizoIgisingizo: `[PLACEHOLDER — Inyikirizo y'Igisingizo (Antiphon)]`,
  igisingizo: `[PLACEHOLDER — Igisingizo (Glory Be)]`,
  igisingizoSentence: `[PLACEHOLDER — "horana impundu rurema iteka ryose, Amen"]`,

  // ── 4. Zaburi ─────────────────────────────────────────────────────────────
  // Three antiphon options — the reader picks one
  inyikirizo1: `[PLACEHOLDER — Inyikirizo ya 1]`,
  inyikirizo2: `[PLACEHOLDER — Inyikirizo ya 2]`,
  inyikirizo3: `[PLACEHOLDER — Inyikirizo ya 3]`,
  // Psalms — weekday vs Sunday
  zaburiWeekday: `[PLACEHOLDER — Zaburi zo mu gitondo (Iminsi isanzwe)]`,
  zaburiSunday: `[PLACEHOLDER — Zaburi zo mu gitondo (Ku Cyumweru)]`,
  // After the psalm
  igisubizo: `[PLACEHOLDER — Igisubizo (Response after Psalm)]`,
  zaburiSentence: `ibisingizo bye bizahora ubudatuza mu munwa wange, iteka n'ahantu hose`,
  ikuzoZaburi: `[PLACEHOLDER — Ikuzo ry'Imana (Glory to God) — mu Zaburi]`,

  // ── 5. Indirimbo ya Zakariya (Benedictus) ─────────────────────────────────
  inyikirizoZakariya: `[PLACEHOLDER — Inyikirizo y'Indirimbo ya Zakariya]`,
  zakariya: `[PLACEHOLDER — Indirimbo ya Zakariya (Benedictus) — Luka 1:68-79]`,
  ikuzoZakariya: `[PLACEHOLDER — Ikuzo ry'Imana (Glory to God) — nyuma ya Zakariya]`,

  // ── 6. Amasengesho yo gusaba ──────────────────────────────────────────────
  gusaba: `[PLACEHOLDER — Amasengesho yo gusaba (Morning Intercessions)]`,

  // ── 7. Dawe uri mu ijuru ──────────────────────────────────────────────────
  dawe: `[PLACEHOLDER — Dawe Uri mu Ijuru (Our Father)]`,

  // ── 8. Isengesho risoza ───────────────────────────────────────────────────
  risozaWeekday: `[PLACEHOLDER — Isengesho risoza (Iminsi isanzwe / Weekday Collect)]`,
  risozaSunday: `[PLACEHOLDER — Isengesho risoza (Ku Cyumweru / Sunday Collect)]`,

  // ── 9. Umusozo ────────────────────────────────────────────────────────────
  umusozo: `[PLACEHOLDER — Umusozo (Dismissal)]`,
};

// ── Sub-components ────────────────────────────────────────────────────────────

// Main section divider — title in the line
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

// Main prayer card — full width, prominent
function PrayerBlock({ text }: { text: string }) {
  return (
    <div className="bg-siyoni-card border border-siyoni-border rounded-card p-5 shadow-card mb-4">
      <p className="prayer-text text-siyoni-brown">{text}</p>
    </div>
  );
}

function SubBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="mb-4 ml-4 border-l-2 border-siyoni-ochre/30 pl-4">
      {label && (
        <p className="font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
          {label}
        </p>
      )}
      <p className="prayer-text text-siyoni-brown text-xs leading-relaxed">{text}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MugitondoPage() {
  const today = new Date();
  const isSunday = today.getDay() === 0;
  const inLent = isLent(today);

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
          <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-1">
            Amasengesho ya Mugitondo
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            {isSunday ? "Ku Cyumweru" : "Iminsi isanzwe"}
            {inLent && " · Igisibo"}
          </p>

          {/* ── 1. Intangiriro ─────────────────────────────────────────────── */}
          <SectionHeader title="Intangiriro" />
          <PrayerBlock text={PRAYERS.intangiriro} />
          <SubBlock label="Ikuzo ry'Imana" text={PRAYERS.ikuzoIntangiriro} />

          {/* ── 2. Indirimbo ───────────────────────────────────────────────── */}
          <SectionHeader title="Indirimbo" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoIndirimbo} />
          {/* Alleluya is omitted during Lent */}
          {!inLent && (
            <SubBlock label="Alleluya" text={PRAYERS.alleluya} />
          )}
          <PrayerBlock text={PRAYERS.indirimbo} />

          {/* ── 3. Igisingizo ──────────────────────────────────────────────── */}
          <SectionHeader title="Igisingizo" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoIgisingizo} />
          <PrayerBlock text={PRAYERS.igisingizo} />
          <SubBlock label="" text={PRAYERS.igisingizoSentence} />

          {/* ── 4. Zaburi ──────────────────────────────────────────────────── */}
          <SectionHeader title={isSunday ? "Zaburi — Ku Cyumweru" : "Zaburi — Iminsi Isanzwe"} />
          <SubBlock label="Inyikirizo 1" text={PRAYERS.inyikirizo1} />
          <SubBlock label="Inyikirizo 2" text={PRAYERS.inyikirizo2} />
          <SubBlock label="Inyikirizo 3" text={PRAYERS.inyikirizo3} />
          <PrayerBlock text={isSunday ? PRAYERS.zaburiSunday : PRAYERS.zaburiWeekday} />
          <SubBlock label="Igisubizo" text={PRAYERS.igisubizo} />
          <SubBlock label="" text={PRAYERS.zaburiSentence} />
          <SubBlock label="Ikuzo ry'Imana" text={PRAYERS.ikuzoZaburi} />

          {/* ── 5. Indirimbo ya Zakariya ───────────────────────────────────── */}
          <SectionHeader title="Indirimbo ya Zakariya" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoZakariya} />
          <PrayerBlock text={PRAYERS.zakariya} />
          <SubBlock label="Ikuzo ry'Imana" text={PRAYERS.ikuzoZakariya} />

          {/* ── 6. Amasengesho yo gusaba ───────────────────────────────────── */}
          <SectionHeader title="Amasengesho yo Gusaba" />
          <PrayerBlock text={PRAYERS.gusaba} />

          {/* ── 7. Dawe uri mu ijuru ───────────────────────────────────────── */}
          <SectionHeader title="Dawe Uri mu Ijuru" />
          <PrayerBlock text={PRAYERS.dawe} />

          {/* ── 8. Isengesho risoza ────────────────────────────────────────── */}
          <SectionHeader title="Isengesho Risoza" />
          <PrayerBlock text={isSunday ? PRAYERS.risozaSunday : PRAYERS.risozaWeekday} />

          {/* ── 9. Umusozo ─────────────────────────────────────────────────── */}
          <SectionHeader title="Umusozo" />
          <PrayerBlock text={PRAYERS.umusozo} />

          <SubBlock label="Umutambyi" text="Dusingize Nyagasani" />
          <SubBlock label="Abantu" text="Dushimiye Imana" />

          {/* End */}
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
