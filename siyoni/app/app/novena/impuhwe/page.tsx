"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, DarkLitanyRow, SlideNav } from "@/components/DarkPrayerUI";
import { PRAYERS } from "@/lib/rosaryPrayers";
import { DECADES, CHAPLET_PRAYERS } from "@/lib/divineMercyPrayers";
import {
  NOVENA_INTRO,
  DIVINE_MERCY_NOVENA_DAYS,
  LITANY_RESPONSE,
  LITANY_OF_DIVINE_MERCY,
  LITANY_VERSICLE,
  LITANY_RESPONSE_VERSE,
  LITANY_CLOSING_PRAYER,
  SHORT_ASPIRATION_CALL,
  SHORT_ASPIRATION_RESPONSE,
} from "@/lib/divineMercyNovena";

// A warm dark-chocolate brown, matching the rest of the site's palette —
// distinct from the other novenas/rozari pages' shades.
const BG_COLOR = "#2B1A0C";

const TOTAL_DAYS = 9;
// Cover, chaplet opening, 5 decades, chaplet closing, day's intention,
// litany, litany closing + short aspiration, outro.
const TOTAL_SLIDES = 12;

// One hand, built from simple pill shapes (palm, thumb, four fingers).
// Local coordinates: x=0 is the inner edge (where the two hands meet at
// the thumbs), positive x runs outward toward the pinky. Mirrored via
// scale(-1,1) for the second hand so both meet cleanly at center.
function Hand({ mirror }: { mirror?: boolean }) {
  return (
    <g transform={`translate(100,148) rotate(-7) ${mirror ? "scale(-1,1)" : ""}`}>
      <rect x={0} y={-32} width={17} height={32} rx={7} fill="url(#handGradient)" opacity={0.92} />
      <rect x={-6} y={-20} width={7} height={16} rx={3} fill="url(#handGradient)" opacity={0.92} />
      <rect x={1} y={-62} width={4} height={30} rx={2} fill="url(#handGradient)" opacity={0.92} />
      <rect x={5} y={-68} width={4} height={36} rx={2} fill="url(#handGradient)" opacity={0.92} />
      <rect x={9} y={-60} width={4} height={28} rx={2} fill="url(#handGradient)" opacity={0.92} />
      <rect x={13} y={-50} width={4} height={18} rx={2} fill="url(#handGradient)" opacity={0.92} />
    </g>
  );
}

// Two hands pressed together in prayer — a plain geometric glyph (pill
// shapes, no figure/face), matching the site's imagery rules the same way
// the IHS monogram and knot motif do for the other two novenas.
function PrayingHandsGlyph() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-56 h-56 rounded-full bg-[#D9A53D] blur-3xl opacity-30"
      />
      <motion.svg
        width={180}
        height={180}
        viewBox="0 0 200 200"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="handGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#D9A53D" />
            <stop offset="100%" stopColor="#F7EDE2" />
          </linearGradient>
        </defs>
        <Hand />
        <Hand mirror />
      </motion.svg>
    </div>
  );
}

// Full-screen transition played once, leaving the cover slide — a warm
// gold-cream glow floods the viewport, then fades to reveal Day 1 already
// settled underneath. Same overlay-then-reveal technique as the other two novenas.
function PrayingHandsBurst() {
  return (
    <motion.div
      key="praying-hands-burst"
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
          <radialGradient id="prayingHandsBurstGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F7EDE2" />
            <stop offset="55%" stopColor="#D9A53D" />
            <stop offset="100%" stopColor="#D9A53D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={100} cy={100} r={70} fill="url(#prayingHandsBurstGlow)" />
      </motion.svg>
    </motion.div>
  );
}

export default function NoveniYImpuhwe() {
  const [dayIndex, setDayIndex] = useState(1);
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);
  const day = DIVINE_MERCY_NOVENA_DAYS[dayIndex - 1];

  const [bursting, setBursting] = useState(false);

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
        <PrayingHandsGlyph />

        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-2">
            Noveni y&apos;Impuhwe z&apos;Imana
          </h1>
          <p className="font-body text-sm text-siyoni-cream/60 italic max-w-sm">
            Iminsi icyenda Yezu yasabye Mutagatifu Faustina, buri munsi uvuga Ishapure y&apos;Impuhwe
            z&apos;Imana wiyambaza roho zihariwe uwo munsi.
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

        <DarkCard>
          <p className="prayer-text text-siyoni-cream/70 text-xs leading-relaxed whitespace-pre-line">
            {NOVENA_INTRO}
          </p>
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 1) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Ishapure y&apos;Impuhwe z&apos;Imana — Gutangira
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Indangakwemera" text={PRAYERS.imigenzo} />
          <DarkPrayerBlock name="Dawe Uri mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakwibuka} repeat="Inshuro 3" />
        </DarkCard>
      </div>
    );
  } else if (slideIndex >= 2 && slideIndex <= 6) {
    const i = slideIndex - 2;
    slide = (
      <div className="flex flex-col gap-5">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Igice {DECADES[i]}
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Ibuye rinini" text={CHAPLET_PRAYERS.daweMana} repeat="Inshuro 1" />
          <DarkPrayerBlock name="Ibuye rito" text={CHAPLET_PRAYERS.kubwububabare} repeat="Inshuro 10" />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 7) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Ishapure y&apos;Impuhwe z&apos;Imana — Gusoza
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Mana Nyir'Ubutagatifu" text={CHAPLET_PRAYERS.manaNyir} repeat="Inshuro 3" />
          <DarkPrayerBlock name="Isengesho ry'i Fatima" text={PRAYERS.yezuwacu} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 8) {
    slide = (
      <div className="flex flex-col gap-5">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Umunsi wa {day.day}
        </p>
        <DarkCard eyebrow="Ijambo rya Nyagasani">
          <p className="prayer-text text-siyoni-cream/85 leading-relaxed">{day.wordOfTheLord}</p>
        </DarkCard>
        <DarkCard>
          <p className="font-heading text-base font-semibold text-siyoni-ochre mb-3">
            {day.intentionHeading}
          </p>
          <p className="prayer-text text-siyoni-cream/90 leading-relaxed">{day.prayer}</p>
        </DarkCard>
        <DarkCard>
          <DarkPrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakwibuka} />
          <DarkPrayerBlock name="Hubahwe" text={PRAYERS.igisingizo} />
        </DarkCard>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/85 leading-relaxed">{day.closingPrayer}</p>
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 9) {
    slide = (
      <div className="flex flex-col gap-5">
        <div className="text-center">
          <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
            Ibisabisho by&apos;Impuhwe z&apos;Imana
          </p>
        </div>
        <DarkCard>
          {LITANY_OF_DIVINE_MERCY.map((line, i) => (
            <DarkLitanyRow key={i} invocation={`Mpuhwe z'Imana, ${line}`} response={LITANY_RESPONSE} />
          ))}
        </DarkCard>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/80 text-sm leading-relaxed italic">
            V/ {LITANY_VERSICLE}
          </p>
          <p className="prayer-text text-siyoni-cream/80 text-sm leading-relaxed italic mt-2">
            R/ {LITANY_RESPONSE_VERSE}
          </p>
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 10) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Dusabe
        </p>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/85 whitespace-pre-line leading-relaxed">
            {LITANY_CLOSING_PRAYER}
          </p>
        </DarkCard>
        <DarkCard eyebrow="Agasengesho kagufi">
          <DarkLitanyRow invocation={SHORT_ASPIRATION_CALL} response={SHORT_ASPIRATION_RESPONSE} />
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
      <AnimatePresence>{bursting && <PrayingHandsBurst />}</AnimatePresence>
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
