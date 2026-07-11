"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";
import {
  MYSTERIES,
  MEDITATIONS,
  PRAYERS,
  getTodaysMystery,
} from "@/lib/rosaryPrayers";
import {
  HOW_TO_PRAY,
  HOW_TO_PRAY_NOTE,
  CANDLE_NOTE,
  ACT_OF_CONTRITION,
  KNOT_PRAYER,
  NOVENA_DAYS,
  fillKnot,
} from "@/lib/knotNovena";

const TOTAL_DAYS = 9;
// Cover, Sign of the Cross, Act of Contrition, 3 decades, day's petition, 2 decades, closing prayer, outro.
const TOTAL_SLIDES = 11;
const TRANSITION = { duration: 0.35, ease: "easeOut" as const };

// ── Dark-themed prayer display — a separate palette from the light-theme
// PrayerBlock on the Rozari page, since this page is a deliberate one-off
// exception to the site's cream base theme. ──────────────────────────────────

function DarkCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black/25 border border-siyoni-ochre/25 rounded-card p-6 backdrop-blur-sm">
      {eyebrow && (
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
          {eyebrow}
        </p>
      )}
      {title && (
        <h3 className="font-heading text-xl font-semibold text-siyoni-cream mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

function DarkPrayerBlock({
  name,
  text,
  repeat,
}: {
  name: string;
  text: string;
  repeat?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-2">
        <h4 className="font-heading text-base font-semibold text-siyoni-cream/90">{name}</h4>
        {repeat && (
          <span className="font-body text-xs font-medium text-siyoni-ochre ml-4 whitespace-nowrap">
            {repeat}
          </span>
        )}
      </div>
      <p className="prayer-text text-siyoni-cream/80 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

// A tied rope knot — stands in for a literal knot ("ipfundo"), which no icon
// library carries. Two loops plus two loose hanging tails below the crossing
// point, the way an actual tied knot reads (a plain figure-eight alone just
// looks like an infinity symbol, not rope).
function KnotIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* The two loops */}
      <path
        d="M19,19 C12,11 3,13 6,20 C3,27 12,29 19,19 C26,9 37,11 34,19 C37,27 27,30 19,19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The two loose tails hanging below */}
      <path
        d="M18,20 C16,25 13,29 12,35"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M21,19 C23,24 25,29 27,34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Gap at the crossing point, painted in the page background color,
          so the loops read as rope passing over/under itself */}
      <circle cx="19.5" cy="19.5" r="3.2" fill="#1C1008" />
    </svg>
  );
}

// Full-screen transition played once, when someone commits to their knot and
// continues from the cover slide. Reuses the same loop/tail geometry as
// KnotIcon, but as separate pieces (left loop, right loop, two tails) that
// swing apart and fade — animating independent pieces like this is reliable
// across browsers, unlike trying to morph one SVG path shape into another.
function UntieAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Full-screen light bloom at the moment of release — a wash across
          the whole viewport, not a small glow near the icon. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.0, delay: 0.8, ease: [0.4, 0, 0.2, 1], times: [0, 0.45, 1] }}
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(196,136,42,0.9) 0%, rgba(196,136,42,0.3) 35%, transparent 70%)",
        }}
      />

      {/* Knot — arrives and settles first, pauses, then unties. No wiggle:
          just a clean arrival followed by a clean release, each easy to
          register as its own beat. */}
      <motion.svg
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="w-[55vmin] h-[55vmin] max-w-[420px] max-h-[420px]"
        style={{ overflow: "visible" }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{
          scale: [0.4, 1, 1, 2.2],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.8,
          times: [0, 0.35, 0.55, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.path
          d="M19,19 C12,11 3,13 6,20 C3,27 12,29 19,19"
          stroke="#C4882A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: -30, y: -14, rotate: -35, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M19,19 C26,9 37,11 34,19 C37,27 27,30 19,19"
          stroke="#C4882A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: 30, y: -14, rotate: 35, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M18,20 C16,25 13,29 12,35"
          stroke="#C4882A"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: -20, y: 26, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M21,19 C23,24 25,29 27,34"
          stroke="#C4882A"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 20, y: 26, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx="19.5"
          cy="19.5"
          r="3.2"
          fill="#1C1008"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.8 }}
        />
      </motion.svg>
    </div>
  );
}

function DecadeSlide({
  decadeNumber,
  mysteryName,
  mysteryItem,
  meditation,
}: {
  decadeNumber: number;
  mysteryName: string;
  mysteryItem: string;
  meditation: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-2">
          Iyibukiro rya {decadeNumber} · {mysteryName}
        </p>
        <h2 className="font-heading text-2xl font-bold text-siyoni-cream leading-snug mb-2">
          {mysteryItem}
        </h2>
        <p className="font-body text-sm text-siyoni-cream/60 italic">{meditation}</p>
      </div>

      <DarkCard>
        <DarkPrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
        <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakwibuka} repeat="Inshuro 10" />
        <DarkPrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />
        <DarkPrayerBlock name="Yezu Wacu" text={PRAYERS.yezuwacu} />
      </DarkCard>
    </div>
  );
}

export default function KnotNovena() {
  const [dayIndex, setDayIndex] = useState(1);
  const [knot, setKnot] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [untying, setUntying] = useState(false);

  const mysteryKey = getTodaysMystery();
  const mystery = MYSTERIES[mysteryKey];
  const meditations = MEDITATIONS[mysteryKey];
  const day = NOVENA_DAYS[dayIndex - 1];

  const goTo = (next: number) => {
    if (next < 0 || next >= TOTAL_SLIDES) return;
    setDirection(next > slideIndex ? 1 : -1);
    setSlideIndex(next);
  };

  // Plays once, leaving the cover slide — the knot-untying overlay, then
  // hands off into the Sign of the Cross slide once it finishes. The slide
  // itself advances immediately, fully hidden behind the opaque overlay, so
  // by the time the overlay fades away the next slide has long since settled
  // — nothing left underneath to glimpse mid-transition.
  const startUntie = () => {
    if (untying) return;
    setUntying(true);
    setDirection(1);
    setSlideIndex(1);
    setTimeout(() => {
      setUntying(false);
    }, 2000);
  };

  const handleNext = () => {
    if (slideIndex === 0) {
      startUntie();
    } else {
      goTo(slideIndex + 1);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") goTo(slideIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, untying]);

  const slides = useMemo(() => {
    const list: React.ReactNode[] = [];

    // 0 — Cover
    list.push(
      <div key="cover" className="flex flex-col items-center text-center gap-8">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-siyoni-ochre"
        >
          <KnotIcon size={40} />
        </motion.div>

        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-3">
            Noveni ya Bikiramariya Upfundura Amapfundo
          </h1>
          <p className="font-body text-sm text-siyoni-cream/60 italic">{CANDLE_NOTE}</p>
        </div>

        <div className="w-full max-w-sm">
          <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-3">
            Uri ku munsi wa kangahe?
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
            Ipfundo ryawe (si ngombwa)
          </label>
          <input
            type="text"
            value={knot}
            onChange={(e) => setKnot(e.target.value)}
            placeholder="Andika ipfundo ushaka gusengera..."
            className="w-full bg-white/5 border border-siyoni-ochre/25 rounded-card px-4 py-3 text-sm font-body text-siyoni-cream placeholder:text-siyoni-cream/30 focus:outline-none focus:border-siyoni-ochre transition-colors"
          />
          <p className="font-body text-xs text-siyoni-cream/40 mt-2">
            Ibi bibikwa ibanga
          </p>
        </div>

        <button
          onClick={startUntie}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-card bg-siyoni-ochre text-siyoni-brown font-body text-sm font-semibold hover:bg-siyoni-ochre/90 transition-colors duration-200"
        >
          Pfundura Ipfundo, Utangire Gusenga
        </button>

        <details className="w-full max-w-sm text-left">
          <summary className="font-body text-xs font-medium text-siyoni-cream/60 uppercase tracking-widest cursor-pointer hover:text-siyoni-cream transition-colors">
            Uko iyi noveni ivugwa
          </summary>
          <ol className="mt-3 space-y-1.5 list-decimal list-inside">
            {HOW_TO_PRAY.map((step, i) => (
              <li key={i} className="font-body text-xs text-siyoni-cream/60 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
          <p className="font-body text-xs text-siyoni-ochre/80 italic mt-3">{HOW_TO_PRAY_NOTE}</p>
        </details>
      </div>
    );

    // 1 — Sign of the Cross
    list.push(
      <div key="cross" className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gutangira
        </p>
        <DarkCard title="Ikimenyetso ky'Umusaraba">
          <p className="prayer-text text-siyoni-cream/85">{PRAYERS.ikimenyetso}</p>
        </DarkCard>
      </div>
    );

    // 2 — Act of Contrition
    list.push(
      <div key="contrition" className="flex flex-col items-center text-center gap-6">
        <DarkCard title="Isengesho ryo Kwicuza Ibyaha">
          <p className="prayer-text text-siyoni-cream/85">{ACT_OF_CONTRITION}</p>
        </DarkCard>
      </div>
    );

    // 3–5 — First 3 decades
    for (let i = 0; i < 3; i++) {
      list.push(
        <DecadeSlide
          key={`decade-${i + 1}`}
          decadeNumber={i + 1}
          mysteryName={mystery.name}
          mysteryItem={mystery.items[i]}
          meditation={meditations[i]}
        />
      );
    }

    // 6 — Day's petition
    list.push(
      <div key="petition" className="flex flex-col gap-5">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Igisabisho cy&apos;umunsi wa {day.day}
        </p>
        <DarkCard>
          <p className="prayer-text text-siyoni-cream/90 leading-relaxed">
            {fillKnot(day.text, knot)}
          </p>
        </DarkCard>
        {day.quote && (
          <p className="font-body text-sm text-siyoni-cream/50 italic text-center">
            {day.quote}
          </p>
        )}
      </div>
    );

    // 7–8 — Remaining 2 decades
    for (let i = 3; i < 5; i++) {
      list.push(
        <DecadeSlide
          key={`decade-${i + 1}`}
          decadeNumber={i + 1}
          mysteryName={mystery.name}
          mysteryItem={mystery.items[i]}
          meditation={meditations[i]}
        />
      );
    }

    // 9 — Closing prayer
    list.push(
      <div key="closing" className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gusoza
        </p>
        <DarkCard title="Isengesho rya Mariya Upfundura Amapfundo">
          <p className="prayer-text text-siyoni-cream/85 whitespace-pre-line">
            {fillKnot(KNOT_PRAYER, knot)}
          </p>
        </DarkCard>
      </div>
    );

    // 10 — Outro
    list.push(
      <div key="outro" className="flex flex-col items-center text-center gap-6">
        <DarkCard title="Ikimenyetso ky'Umusaraba">
          <p className="prayer-text text-siyoni-cream/85">{PRAYERS.ikimenyetso}</p>
        </DarkCard>
        <div className="mt-4">
          <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
          <p className="font-heading text-xl text-siyoni-cream">
            Umunsi wa {day.day} warangiye. 🙏
          </p>
          <Link
            href="/novena"
            className="inline-block mt-6 font-body text-sm text-siyoni-cream/60 hover:text-siyoni-cream transition-colors underline underline-offset-2"
          >
            Subira kuri Noveni
          </Link>
        </div>
      </div>
    );

    return list;
  }, [mystery, meditations, day, knot, dayIndex]);

  return (
    <div className="min-h-screen bg-siyoni-brown font-body pb-24 md:pb-0 relative overflow-hidden">
      <Navbar />

      {/* Faint dark-gold Imigongo texture across the whole page — placeholder
          for real photography, swappable later without changing layout. */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <ImigongoPattern className="w-full h-full" bgColor="#1C1008" fgColor="#C4882A" />
      </div>

      <AnimatePresence>
        {untying && (
          <motion.div
            key="untie-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-siyoni-brown flex items-center justify-center"
          >
            <UntieAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative max-w-xl mx-auto px-6 py-10">
        <Link
          href="/novena"
          className="inline-flex items-center gap-1 text-siyoni-cream/50 text-sm mb-8 hover:text-siyoni-cream transition-colors"
        >
          ← Subira
        </Link>

        <div className="min-h-[55vh] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slideIndex}
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={TRANSITION}
              className="w-full"
            >
              {slides[slideIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => goTo(slideIndex - 1)}
            disabled={slideIndex === 0}
            className="flex items-center gap-1 font-body text-sm text-siyoni-cream/70 hover:text-siyoni-cream disabled:opacity-0 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={18} /> Inyuma
          </button>

          <span className="font-body text-xs text-siyoni-cream/40">
            {slideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={handleNext}
            disabled={slideIndex === slides.length - 1}
            className="flex items-center gap-1 font-body text-sm text-siyoni-cream/70 hover:text-siyoni-cream disabled:opacity-0 disabled:pointer-events-none transition-all"
          >
            Ibikurikira <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/10 rounded-full mt-4 overflow-hidden">
          <motion.div
            className="h-full bg-siyoni-ochre"
            animate={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
            transition={TRANSITION}
          />
        </div>
      </main>
    </div>
  );
}
