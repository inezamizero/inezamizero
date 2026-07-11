"use client";

// Shared dark-theme building blocks for slideshow-style prayer pages (Rozari
// devotions, Isengesho, Noveni). Each page picks its own background shade
// (a distinct "dark chocolate" per devotion) and passes it in — everything
// else (cards, labels, the next/prev bar, the pulsing next button) is shared
// so a tweak like "pulse the button" only has to happen in one place.

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DarkCard({
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

export function DarkPrayerBlock({
  name,
  text,
  repeat,
  note,
}: {
  name?: string;
  text: string;
  repeat?: string;
  note?: string;
}) {
  return (
    <div className="mb-4 last:mb-0">
      {name && (
        <div className="flex items-baseline justify-between mb-2">
          <h4 className="font-heading text-base font-semibold text-siyoni-cream/90">{name}</h4>
          {repeat && (
            <span className="font-body text-xs font-medium text-siyoni-ochre ml-4 whitespace-nowrap">
              {repeat}
            </span>
          )}
        </div>
      )}
      <p className="prayer-text text-siyoni-cream/80 text-sm leading-relaxed whitespace-pre-line">{text}</p>
      {note && (
        <p className="font-body text-xs text-siyoni-cream/40 italic mt-2 pt-2 border-t border-white/10">
          {note}
        </p>
      )}
    </div>
  );
}

export function DarkSectionLabel({ title }: { title: string }) {
  return (
    <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-2">
      {title}
    </p>
  );
}

// One Rosary decade as a slide: mystery name, meditation, then the four
// decade prayers. Shared by every page that prays a full 5-decade Rosary
// (Rozari, the Divine Mercy chaplet, the Undoer of Knots novena) so the
// layout stays identical across all of them.
export function DarkDecadeSlide({
  decadeNumber,
  mysteryName,
  mysteryItem,
  meditation,
  prayers,
}: {
  decadeNumber: number;
  mysteryName: string;
  mysteryItem: string;
  meditation?: string;
  prayers: Array<{ name: string; text: string; repeat?: string }>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <DarkSectionLabel title={`Icya ${decadeNumber} · ${mysteryName}`} />
        <h2 className="font-heading text-2xl font-bold text-siyoni-cream leading-snug mb-2">
          {mysteryItem}
        </h2>
        {meditation && (
          <p className="font-body text-sm text-siyoni-cream/60 italic">{meditation}</p>
        )}
      </div>

      <DarkCard>
        {prayers.map((p, i) => (
          <DarkPrayerBlock key={i} name={p.name} text={p.text} repeat={p.repeat} />
        ))}
      </DarkCard>
    </div>
  );
}

export function DarkLitanyRow({ invocation, response }: { invocation: string; response: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="font-body text-sm text-siyoni-cream/80 leading-relaxed">{invocation}</span>
      <span className="font-body text-sm font-medium text-siyoni-ochre italic whitespace-nowrap">{response}</span>
    </div>
  );
}

// The "click me" cue — the button gently levitates, with a soft shadow
// beneath it that shrinks and fades as it rises, like it's actually
// hovering rather than pulsing/alarming. Used for every "next" action across
// the dark prayer pages so the affordance reads the same everywhere.
export function PulsingNextButton({
  onClick,
  disabled,
  label = "Ibikurikira",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-1.5 transition-opacity duration-200 ${disabled ? "opacity-0 pointer-events-none" : ""}`}>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1 font-body text-sm text-siyoni-cream/70 hover:text-siyoni-cream transition-colors"
      >
        {label} <ChevronRight size={18} />
      </motion.button>
      <motion.span
        aria-hidden="true"
        className="w-7 h-1 rounded-full bg-black/30 blur-[2px]"
        animate={{ scaleX: [1, 0.55, 1], opacity: [0.6, 0.25, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Full prev/next + progress bar footer, shared across every slideshow page.
export function SlideNav({
  index,
  total,
  onPrev,
  onNext,
  nextLabel,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex items-center gap-1 font-body text-sm text-siyoni-cream/70 hover:text-siyoni-cream disabled:opacity-0 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft size={18} /> Inyuma
        </button>

        <span className="font-body text-xs text-siyoni-cream/40">
          {index + 1} / {total}
        </span>

        <PulsingNextButton
          onClick={onNext}
          disabled={index === total - 1}
          label={nextLabel}
        />
      </div>

      <div className="h-0.5 bg-white/10 rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-siyoni-ochre"
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </>
  );
}
