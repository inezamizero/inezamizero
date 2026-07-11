"use client";

import Link from "next/link";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, SlideNav } from "@/components/DarkPrayerUI";

// A distinct dark-chocolate shade for this devotion — a deep reddish
// mahogany, separating it visually from the main Rosary's warm neutral brown.
const BG_COLOR = "#200D0D";

const DECADES = ["Icya Mbere", "Icya Kabiri", "Icya Gatatu", "Icya Kane", "Icya Gatanu"];

const PRAYERS = {
  indangakwemera: `Ndemera Imana Data ushobora byose waremye ijuru n'isi ndemera n'umwana w'ikinege Yezu Kristu wasamwe ku bwa Roho mutagatifu akabyarwa na Bikira Mariya, akababara ku ngoma ya Ponsiyo Pilato, akabambwa ku musaraba agapfa, agahambwa, akamuka ajya ikuzimu. Ku munsi wa gatatu akazuka, akajya mu ijuru akaba yicaye iburyo bw'Imana Data ishobora byose, niho azava aje gucira imanza abazima n'abapfuye. Nemera Roho Mutagatifu, na Kiliziya gatorika ntagatifu, n'ubumwe bw'abatagatifujwe, n'uko abanyabyaha babikizwa, n'uko abantu bazazuka bakazabaho iteka, Amen.`,
  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,
  ndakuramutsa: `Wuje inema uhorana n'Imana. Wahebuje abagore bose umugisha, na Yezu umwana wabyaye arasingizwa. Mariya Mutagatifu mmubyeyi w'Imana, urajye udusabira twebwe abanyabyaha, kuri ubu, n'igihe tuzapfira, Amen.`,
  daweMana: `Dawe Mana ihoraho, ngutuye Umubiri n'Amaraso, Roho n'Ubumana by'Umwana wawe ukunda cyane, Umwami wacu Yezu Kristu, ngira ngo mpongerere ibyaha byacu n'iby'isi yose.`,
  kubwububabare: `Kubw'ububabare bwe bukabije, tugirire impuhwe kandi uzigirire n'isi yose.`,
  manaNyir: `Mana Nyir'ubutagatifu, Mana y'imbaraga, Mana ihoraho, tugirire impuhwe.`,
  fatima: `Yezu wacu, tubabarire ibyaha byacu kandi uturinde umuriro w'iteka, igarurire roho z'abantu bose kandi uziyobore inzira y'ijuru, cyane cyane wite ku bakeneye impuhwe zawe.`,
};

const TOTAL_SLIDES = 9; // cover, opening, 5 decades, closing, outro

export default function IshapureImpuhwe() {
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);

  let slide: React.ReactNode;

  if (slideIndex === 0) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-1">
          Ishapure y&apos;Impuhwe z&apos;Imana
        </h1>
        <p className="font-body text-sm text-siyoni-cream/60 italic max-w-sm">
          Ivugwa nk&apos;ishapure isanzwe, uretse ko amasengesho yihariye avuganwa aho &ldquo;Dawe uri mu ijuru&rdquo; na &ldquo;Ndakuramutsa Mariya&rdquo; bavugwa.
        </p>
      </div>
    );
  } else if (slideIndex === 1) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gutangira (Bishobora)
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Indangakwemera" text={PRAYERS.indangakwemera} />
          <DarkPrayerBlock name="Dawe Uri mu Ijuru" text={PRAYERS.dawe} />
          <DarkPrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakuramutsa} repeat="Inshuro 3" />
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
          <DarkPrayerBlock name="Ibuye rinini" text={PRAYERS.daweMana} repeat="Inshuro 1" />
          <DarkPrayerBlock name="Ibuye rito" text={PRAYERS.kubwububabare} repeat="Inshuro 10" />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 7) {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Gusoza
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Mana Nyir'Ubutagatifu" text={PRAYERS.manaNyir} repeat="Inshuro 3" />
          <DarkPrayerBlock name="Isengesho ry'i Fatima" text={PRAYERS.fatima} />
        </DarkCard>
      </div>
    );
  } else {
    slide = (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-2" />
        <p className="font-heading text-xl text-siyoni-cream">Ishapure irarangiye. 🙏</p>
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
