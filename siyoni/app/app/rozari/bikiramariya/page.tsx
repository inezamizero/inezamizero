"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MYSTERIES,
  MEDITATIONS,
  PRAYERS,
  getTodaysMystery,
  type MysteryKey,
} from "@/lib/rosaryPrayers";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, DarkDecadeSlide, SlideNav } from "@/components/DarkPrayerUI";

// A distinct dark-chocolate shade per devotion — this one anchors the family
// since it's the primary Rosary (matches the site's existing dark token).
const BG_COLOR = "#1C1008";

const TOTAL_SLIDES = 9; // cover, opening, 5 decades, closing, outro

export default function RozariBikiraMariya() {
  const [mysteryKey, setMysteryKey] = useState<MysteryKey>(getTodaysMystery());
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);
  const mystery = MYSTERIES[mysteryKey];
  const meditations = MEDITATIONS[mysteryKey];

  const decadePrayers = (i: number) => [
    { name: "Dawe Uri Mu Ijuru", text: PRAYERS.DaweUriMuIjuru },
    { name: "Ndakuramutsa Mariya", text: PRAYERS.ndakwibuka, repeat: "Inshuro 10" },
    { name: "Hubahwe Imana Data", text: PRAYERS.igisingizo },
    { name: "Yezu Wacu", text: PRAYERS.yezuwacu },
  ];

  let slide: React.ReactNode;

  if (slideIndex === 0) {
    slide = (
      <div className="flex flex-col items-center text-center gap-8">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-3">
            Rozari Ntagatifu
          </h1>
          <p className="font-body text-sm text-siyoni-cream/60 italic">
            Hitamo amibukiro, hanyuma ukande &ldquo;Ibikurikira&rdquo; kugira ngo utangire.
          </p>
        </div>

        <div className="w-full max-w-sm text-left">
          <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-3">
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
                  className={`text-left w-full px-5 py-4 rounded-card border transition-all duration-200 ${
                    isSelected
                      ? "border-siyoni-ochre bg-black/25"
                      : "border-white/10 bg-black/10 hover:border-siyoni-ochre/40"
                  }`}
                >
                  {isToday && (
                    <span className="inline-block font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
                      ✓ Uyu munsi
                    </span>
                  )}
                  <p className="font-body text-xs text-siyoni-cream/50 mb-1">{m.days}</p>
                  <h3 className="font-heading text-lg font-bold text-siyoni-cream leading-snug">
                    {m.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (slideIndex === 1) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gutangira
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />
          <DarkPrayerBlock name="Indangakwemera" text={PRAYERS.imigenzo} />
          <DarkPrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakwibuka} repeat="Inshuro 3" />
          <DarkPrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex >= 2 && slideIndex <= 6) {
    const i = slideIndex - 2;
    slide = (
      <DarkDecadeSlide
        decadeNumber={i + 1}
        mysteryName={mystery.name}
        mysteryItem={mystery.items[i]}
        meditation={meditations[i]}
        prayers={decadePrayers(i)}
      />
    );
  } else if (slideIndex === 7) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gusoza
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Bikira Mariya Nyirimpuhwe" text={PRAYERS.hailHolyQueen} />
          <DarkPrayerBlock name="Dusabe" text={PRAYERS.closing} />
          <DarkPrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />
        </DarkCard>
      </div>
    );
  } else {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-2" />
        <p className="font-heading text-xl text-siyoni-cream">Rozari irarangiye. 🙏</p>
        <Link
          href="/rozari"
          className="inline-block font-body text-sm text-siyoni-cream/60 hover:text-siyoni-cream transition-colors underline underline-offset-2"
        >
          Subira ku yandi mashapure
        </Link>
      </div>
    );
  }

  return (
    <DarkSlideshowShell
      bgColor={BG_COLOR}
      backHref="/rozari"
      slideIndex={slideIndex}
      direction={direction}
      footer={<SlideNav index={slideIndex} total={TOTAL_SLIDES} onPrev={prev} onNext={next} />}
    >
      {slide}
    </DarkSlideshowShell>
  );
}
