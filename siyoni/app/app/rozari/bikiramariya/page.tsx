"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";
import {
  MYSTERIES,
  MEDITATIONS,
  PRAYERS,
  getTodaysMystery,
  type MysteryKey,
} from "@/lib/rosaryPrayers";

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

function PrayerBlock({
  name,
  text,
  repeat,
}: {
  name: string;
  text: string;
  repeat?: string; // e.g. "Bivuge inshuro 10" (Say it 10 times)
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-heading text-lg font-semibold text-siyoni-brown">{name}</h3>
        {repeat && (
          <span className="font-body text-xs font-medium text-siyoni-ochre ml-4 whitespace-nowrap">
            {repeat}
          </span>
        )}
      </div>

      <div className="bg-siyoni-card border border-siyoni-border rounded-card p-5 shadow-card">
        <p className="prayer-text text-siyoni-brown">{text}</p>

        {/* Audio player — uncomment and wire up when audio files are ready */}
        {/* <div className="mt-4 pt-4 border-t border-siyoni-border">
          <audio controls src={audioSrc} className="w-full" />
        </div> */}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RozariBikiraMariya() {
  const [mysteryKey, setMysteryKey] = useState<MysteryKey>(getTodaysMystery());
  const mystery = MYSTERIES[mysteryKey];

  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-xl mx-auto px-6 py-12">
        <Link
          href="/rozari"
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
            Rozari Ntagatifu
          </h1>

          {/* Mystery selector — 4 cards, no items listed inside.
              Today's mystery is pre-selected. Scroll down after selecting to pray. */}
          <div className="mb-2">
            <p className="font-body text-xs font-medium text-siyoni-mid tracking-widest uppercase mb-3">
              Hitamo amibukiro
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(MYSTERIES) as MysteryKey[]).map((key) => {
                const m = MYSTERIES[key];
                const isToday = getTodaysMystery() === key;
                const isSelected = mysteryKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setMysteryKey(key)}
                    className={`
                      text-left w-full px-6 py-5 rounded-card border transition-all duration-200
                      ${isSelected
                        ? "border-siyoni-ochre bg-siyoni-card shadow-card-hover"
                        : "border-siyoni-border bg-siyoni-card shadow-card hover:border-siyoni-mid"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        {isToday && (
                          <span className="inline-block font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
                            ✓ Uyu munsi
                          </span>
                        )}
                        <p className="font-body text-xs text-siyoni-mid mb-1">{m.days}</p>
                        <h3 className="font-heading text-2xl font-bold text-siyoni-brown leading-snug">
                          {m.name}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Opening ───────────────────────────────────────────────────── */}
          <div className="mt-24" />
          <SectionHeader title="Gutangira" />

          <PrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />
          <PrayerBlock name="Indangakwemera" text={PRAYERS.imigenzo} />
          <PrayerBlock name="Dawe Uri Mu ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <PrayerBlock
            name="Ndakuramutsa Mariya"
            text={PRAYERS.ndakwibuka}
            repeat="Inshuro 3"
          />
          <PrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />


          {/* ── 5 Decades ────────────────────────────────────────────────── */}
          {mystery.items.map((mysteryName, i) => (
            <div key={i}>
              <SectionHeader title={`Iyibukiro rya ${i + 1}`} />

              {/* Mystery announcement */}
              <div className="mb-6 p-4 bg-siyoni-card border border-siyoni-ochre/30 rounded-card">
                <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
                  Kuvuga iyibukiro
                </p>
                <p className="font-heading text-lg font-semibold text-siyoni-brown">
                  {mysteryName}
                </p>
                {/* Individual meditation for this specific mystery */}
                <p className="font-body text-sm text-siyoni-mid mt-2">
                  {MEDITATIONS[mysteryKey][i]}
                </p>
              </div>

              <PrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
              <PrayerBlock
                name="Ndakuramutsa Mariya"
                text={PRAYERS.ndakwibuka}
                repeat="Inshuro 10"
              />
              <PrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />
              <PrayerBlock name="Yezu Wacu" text={PRAYERS.yezuwacu} />

            </div>
          ))}

          {/* ── Closing ───────────────────────────────────────────────────── */}
          <SectionHeader title="Gusoza" />

          <PrayerBlock name="Bikira Mariya Nyirimpuhwe" text={PRAYERS.hailHolyQueen} />
          <PrayerBlock name="Dusabe" text={PRAYERS.closing} />
          <PrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />

          {/* Done */}
          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Rozari irarangiye. 🙏
            </p>
            <Link
              href="/rozari"
              className="inline-block mt-6 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors underline underline-offset-2"
            >
              Subira ku yandi mashapure
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
