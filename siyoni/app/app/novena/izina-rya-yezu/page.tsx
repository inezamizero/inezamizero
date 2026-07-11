"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, DarkLitanyRow, SlideNav } from "@/components/DarkPrayerUI";
import { PRAYERS } from "@/lib/rosaryPrayers";
import {
  HOLY_SPIRIT_PRAYER,
  CLOSING_ACCLAMATION,
  CONSECRATION_PRAYER,
  LITANY_RESPONSE,
  LITANY_OF_THE_HOLY_NAME,
  NAME_OF_JESUS_DAYS,
  fillPetition,
} from "@/lib/nameOfJesus";

// A distinct dark-chocolate shade — a deep antique bronze-brown, warmer and
// richer than the others, fitting a devotion built around gold iconography.
const BG_COLOR = "#2A1607";

const TOTAL_DAYS = 9;
// Cover, the selected day's content, the litany, the consecration prayer, outro.
const TOTAL_SLIDES = 5;

// The IHS Christogram — the traditional monogram for the Holy Name of Jesus,
// used for centuries in Catholic iconography (altars, vestments, church
// ceilings). A small cross rises from the H, surrounded by a radiating
// burst of gold light. Deliberately not a picture of a person's face — the
// site's own design rules rule that out, and this is the actual historic
// symbol for exactly what this devotion is about.
function IHSGlyph() {
  const RAYS = 20;
  const rays = Array.from({ length: RAYS }, (_, i) => (i * 360) / RAYS);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-56 h-56 rounded-full bg-[#E8B84B] blur-3xl opacity-40"
      />

      <motion.svg
        width={180}
        height={180}
        viewBox="0 0 200 200"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="ihsGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE9B0" />
            <stop offset="100%" stopColor="#D9A53D" />
          </radialGradient>
        </defs>

        {rays.map((deg) => (
          <line
            key={deg}
            x1={100}
            y1={100}
            x2={100}
            y2={22}
            stroke="#E8B84B"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.55}
            transform={`rotate(${deg} 100 100)`}
          />
        ))}

        <circle cx={100} cy={100} r={58} fill="none" stroke="#E8B84B" strokeWidth={1.5} opacity={0.5} />

        {/* Small cross rising from the H */}
        <line x1={100} y1={64} x2={100} y2={76} stroke="url(#ihsGlow)" strokeWidth={4} strokeLinecap="round" />
        <line x1={94} y1={69} x2={106} y2={69} stroke="url(#ihsGlow)" strokeWidth={4} strokeLinecap="round" />

        <text
          x="100"
          y="128"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="52"
          fill="url(#ihsGlow)"
        >
          IHS
        </text>
      </motion.svg>
    </div>
  );
}

// Full-screen transition played once, leaving the cover slide — the IHS
// monogram grows until it floods the entire viewport in gold light, then
// fades away to reveal Day 1 already settled underneath. Same
// overlay-then-reveal technique as the Knot novena's untying transition.
function IHSBurst() {
  return (
    <motion.div
      key="ihs-burst"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none flex items-center justify-center"
      style={{ backgroundColor: BG_COLOR }}
    >
      <motion.svg
        width={180}
        height={180}
        viewBox="0 0 200 200"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 18, opacity: [1, 1, 0] }}
        transition={{ duration: 1.3, times: [0, 0.6, 1], ease: [0.4, 0, 0.2, 1] }}
      >
        <defs>
          <radialGradient id="ihsBurstGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE9B0" />
            <stop offset="60%" stopColor="#D9A53D" />
            <stop offset="100%" stopColor="#D9A53D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={100} cy={100} r={70} fill="url(#ihsBurstGlow)" />
      </motion.svg>
    </motion.div>
  );
}

export default function IzinaRyaYezu() {
  const [dayIndex, setDayIndex] = useState(1);
  const [petition, setPetition] = useState("");
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);
  const day = NAME_OF_JESUS_DAYS[dayIndex - 1];

  const [bursting, setBursting] = useState(false);

  // Plays once, leaving the cover slide. The slide itself advances
  // immediately, fully hidden behind the opaque overlay, so by the time the
  // overlay fades away Day 1 has long since settled underneath.
  const startBurst = () => {
    if (bursting) return;
    setBursting(true);
    next();
    setTimeout(() => setBursting(false), 1500);
  };

  const handleNext = () => {
    if (slideIndex === 0) {
      startBurst();
    } else {
      next();
    }
  };

  let slide: React.ReactNode;

  if (slideIndex === 0) {
    slide = (
      <div className="flex flex-col items-center text-center gap-7">
        <IHSGlyph />

        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-2">
            Izina rya Yezu
          </h1>
          <p className="font-body text-sm text-siyoni-cream/60 italic">
            Noveni y&apos;iminsi icyenda yubaha Izina Ritagatifu rya Yezu
          </p>
        </div>

        <div className="w-full max-w-sm">
          <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-3">
            Uri ku munsi wa
          </p>
          <div className="grid grid-cols-9 gap-1.5">
            {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setDayIndex(n)}
                className={`aspect-square rounded-md text-sm font-body font-medium transition-all duration-200 ${
                  n === dayIndex
                    ? "bg-siyoni-ochre text-siyoni-brown"
                    : "bg-white/5 text-siyoni-cream/70 hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm text-left">
          <label className="block font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-2">
            Icyo usaba (si ngombwa)
          </label>
          <input
            type="text"
            value={petition}
            onChange={(e) => setPetition(e.target.value)}
            placeholder="Andika icyo ushaka gusaba mu izina rya Yezu..."
            className="w-full bg-white/5 border border-siyoni-ochre/25 rounded-card px-4 py-3 text-sm font-body text-siyoni-cream placeholder:text-siyoni-cream/30 focus:outline-none focus:border-siyoni-ochre transition-colors"
          />
        </div>
      </div>
    );
  } else if (slideIndex === 1) {
    const d = day;
    slide = (
      <div className="flex flex-col gap-5">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Umunsi wa {d.day}
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Isengesho" text={HOLY_SPIRIT_PRAYER} />
        </DarkCard>
        <DarkCard eyebrow="Gusoma no kuzirikana" title={d.citation}>
          <p className="prayer-text text-siyoni-cream/85 leading-relaxed">{d.gospel}</p>
        </DarkCard>
        <DarkCard>
          <DarkPrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakwibuka} />
          <DarkPrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />
        </DarkCard>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/90 leading-relaxed">
            {fillPetition(d.petitionPrayer, petition)}
          </p>
        </DarkCard>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/80 leading-relaxed">{CLOSING_ACCLAMATION}</p>
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 2) {
    slide = (
      <div className="flex flex-col gap-5">
        <div className="text-center">
          <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
            Ibisabisho by&apos;Izina rya Yezu
          </p>
        </div>
        <DarkCard>
          {LITANY_OF_THE_HOLY_NAME.map((line, i) => (
            <DarkLitanyRow key={i} invocation={`Zina rya Yezu, ${line}`} response={LITANY_RESPONSE} />
          ))}
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 3) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Isengesho ryo Kwiyegurira Ububasha bw&apos;Izina rya Yezu
        </p>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/85 whitespace-pre-line leading-relaxed">
            {CONSECRATION_PRAYER}
          </p>
        </DarkCard>
      </div>
    );
  } else {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-2" />
        <p className="font-heading text-xl text-siyoni-cream">
          Umunsi wa {day.day} warangiye. 🙏
        </p>
        <Link
          href="/novena"
          className="inline-block font-body text-sm text-siyoni-cream/60 hover:text-siyoni-cream transition-colors underline underline-offset-2"
        >
          Subira kuri Noveni
        </Link>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>{bursting && <IHSBurst />}</AnimatePresence>
      <DarkSlideshowShell
        bgColor={BG_COLOR}
        backHref="/novena"
        slideIndex={slideIndex}
        direction={direction}
        footer={<SlideNav index={slideIndex} total={TOTAL_SLIDES} onPrev={prev} onNext={handleNext} />}
      >
        {slide}
      </DarkSlideshowShell>
    </>
  );
}
