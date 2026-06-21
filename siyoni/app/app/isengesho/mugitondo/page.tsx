"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Prayers ───────────────────────────────────────────────────────────────────
// Replace each [PLACEHOLDER] with the actual Kinyarwanda text.
// Structure follows the Liturgy of the Hours — Lauds (Morning Prayer).

const PRAYERS = {

  // ── 1. Intangiriro ────────────────────────────────────────────────────────
  // Opening verse — same every day
  intangiriro: `[PLACEHOLDER — Intangiriro / Opening verse
e.g. "Mwami fungura iminwa yanjye, ngo akanwa kanjye gashime ubuhizi bwawe."]`,

  // ── 2. Indirimbo ──────────────────────────────────────────────────────────
  // Morning hymn
  indirimbo: `[PLACEHOLDER — Indirimbo yo mu gitondo (Morning Hymn)]`,

  // ── 3. Igisingizo ─────────────────────────────────────────────────────────
  // Glory Be / Antiphon before psalmody
  igisingizo: `[PLACEHOLDER — Igisingizo (Glory Be)
"Ikuzo Nyene Data, na Mwana, na Roho Mutagatifu..."]`,

  // ── 4. Zaburi — weekday ───────────────────────────────────────────────────
  // Psalm(s) for weekday Lauds — these rotate across the 4-week psalter.
  // For now one placeholder; you can add the specific psalms per week later.
  zaburiWeekday: `[PLACEHOLDER — Zaburi zo mu gitondo (Iminsi isanzwe)
Shyiramo hano zaburi zikoreshwa mu gitondo ku minsi isanzwe.
Zirahinduka buri cyumweru mu Igitabo cy'Isengesho — Psalter ya Ibyumweru 4.]`,

  // ── 4. Zaburi — Sunday ────────────────────────────────────────────────────
  // Psalm(s) specifically for Sunday Lauds
  zaburiSunday: `[PLACEHOLDER — Zaburi zo mu gitondo (Ku cyumweru)
Shyiramo hano zaburi zikoreshwa mu gitondo ku Cyumweru.
Zirashobora kuba: Zaburi 63, Magnificat, Zaburi 149, n'izindi.]`,

  // ── 5. Indirimbo ya Zakariya (Benedictus) ─────────────────────────────────
  // Canticle of Zechariah — Luke 1:68-79 — prayed every morning
  zakariya: `[PLACEHOLDER — Indirimbo ya Zakariya (Benedictus) — Luka 1:68-79
"Nisingizwe Uwiteka Imana ya Isirayeli, kuko yabonye abantu be akabakura..."]`,

  // ── 6. Amasengesho yo gusaba ──────────────────────────────────────────────
  // Morning intercessions — petitions for the day
  gusaba: `[PLACEHOLDER — Amasengesho yo gusaba (Morning Intercessions)
Petitions offered in the morning for the day ahead.
Each petition ends with the community response, e.g. "Mwami, utwe inema."]`,

  // ── 7. Dawe uri mu ijuru ──────────────────────────────────────────────────
  // Our Father
  dawe: `[PLACEHOLDER — Dawe Uri mu Ijuru (Our Father)]`,

  // ── 8. Isengesho risoza ───────────────────────────────────────────────────
  // Closing collect/prayer — changes with the liturgical calendar
  risoza: `[PLACEHOLDER — Isengesho risoza (Closing Collect)
This prayer changes with the liturgical season and feast day.
Shyiramo hano isengesho risoza ry'uyu munsi.]`,

  // ── 9. Umusozo ────────────────────────────────────────────────────────────
  // Dismissal blessing
  umusozo: `[PLACEHOLDER — Umusozo (Dismissal)
e.g. "Nimugire amahoro. — Amen."]`,
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

function PrayerBlock({ text }: { text: string }) {
  return (
    <div className="mb-6">
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
  const isSunday = new Date().getDay() === 0;

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
          </p>

          <SectionHeader title="Intangiriro" />
          <PrayerBlock text={PRAYERS.intangiriro} />

          <SectionHeader title="Indirimbo" />
          <PrayerBlock text={PRAYERS.indirimbo} />

          <SectionHeader title="Igisingizo" />
          <PrayerBlock text={PRAYERS.igisingizo} />

          <SectionHeader title={isSunday ? "Zaburi — Ku Cyumweru" : "Zaburi — Iminsi Isanzwe"} />
          <PrayerBlock text={isSunday ? PRAYERS.zaburiSunday : PRAYERS.zaburiWeekday} />

          <SectionHeader title="Indirimbo ya Zakariya" />
          <PrayerBlock text={PRAYERS.zakariya} />

          <SectionHeader title="Amasengesho yo Gusaba" />
          <PrayerBlock text={PRAYERS.gusaba} />

          <SectionHeader title="Dawe Uri mu Ijuru" />
          <PrayerBlock text={PRAYERS.dawe} />

          <SectionHeader title="Isengesho Risoza" />
          <PrayerBlock text={PRAYERS.risoza} />

          <SectionHeader title="Umusozo" />
          <PrayerBlock text={PRAYERS.umusozo} />

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
