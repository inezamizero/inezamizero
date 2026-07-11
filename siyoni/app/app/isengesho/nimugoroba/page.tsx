"use client";

import Link from "next/link";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, SlideNav } from "@/components/DarkPrayerUI";

// A distinct dark-chocolate shade for evening prayer — deep cacao with a
// cooler, duskier undertone than morning's warm coffee brown.
const BG_COLOR = "#12100E";

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
  const ashWed = new Date(easter); ashWed.setDate(easter.getDate() - 46);
  const palmSunday = new Date(easter); palmSunday.setDate(easter.getDate() - 7);
  return date >= ashWed && date < palmSunday;
}

// ── Prayer content ────────────────────────────────────────────────────────────

const PRAYERS = {
  intangiriro: `Mana ngwino unyikirize. Nyagasani banguka undengere.`,
  ikuzoIntangiriro: `nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose. Amen.`,
  alleluya: `Alleluya`,
  indirimboRef: `D 54 cyangwa X 4, X 6, X 13`,
  indirimbo: `[PLACEHOLDER — Shyiramo hano inyandiko y'indirimbo yo mu mugoroba]`,
  igisingizoKristu: `Nimunezerwe kandi mushimire Imana Data watumye mugira umugabane ku murage w'abatagatifujwe bari mu mucyo. Koko rero, yatugobotoye ku ngoyi y'umwijima, atujyana mu Ngoma y'Umwana we akunda byimazeyo, ari na We dukesha gucungurwa no kubabarirwa ibyaha.
Ni We shusho ry'Imana itagaragara,
Umuvukambere mu byitwa ikiremwa cyose,
kuko byose byaremewe muri We,
ari ibiri mu ijuru, ari n'ibiri ku isi.
Ibigaragara n'ibitagaragara,
Ibinyabubasha n'Inganji, Ibikomangoma n'Ibihangange:
byose byaremwe na We, kandi ni We byaremewe;
yariho mbere ya byose, kandi byose bibeshwaho na We.
Ni We kandi Mutwe w'umubiri, ari wo Kiliziya,
akaba n'Ishingiro, n'Umuvukambere mu bapfuye,
kugira ngo ahorane muri byose umwanya w'ibanze;
kuko Imana yizihijwe no kumusenderezamo ibyiza byose,
kandi muri We yiyunga n'ibiriho byose, ndetse ari We ibigirira, ari ibiri ku isi, ari n'ibiri mu ijuru, byose ibisakazaho amahoro aturutse ku maraso ye yameneye ku musaraba.`,
  igisingizoAlt: `Nihasingizwe Imana, Se w'Umwami wacu Yezu Kristu,
Yo yadusakajemo imigisha y'amoko yose, ituruka kuri Roho, mu ijuru, ku bwa Kristu.
Nguko uko yadutoreye muri We nyine, mbere y'ihangwa ry'ibiriho byose,
kugira ngo tuzayihore imbere mu rukundo, turi intungane n'abaziranenge.
Igena ityo mbere y'igihe, ko tuzayibera abana yihitiyemo, tubikesheje Yezu Kristu.
Uko ni ko yabyishakiye ku buntu bwayo,
kugira ngo izahore isingirizwa ingabire yaduhereye ubuntu mu Mwana wayo w'Inkoramutima.
Ni We dukesha ugucunguzwa amaraso ye, tukamuronkeramo imbabazi z'ibyaha byacu,
ku rugero rw'ubusendere bw'ineza yayo,
ikaba yarabudusesekajemo ibigiranye ubuhanga n'ubumenyi bwose.
Yaduhishuriye ibanga ry'ugushaka kwayo,
wa mugambi wuje urugwiro yari yifitemo kuva kera,
ngo izawuzuze ibihe bigeze: umugambi wo gukoranyiriza ibintu byose
ku Mutware umwe rukumbi, Kristu, ari ibiri mu ijuru, ari n'ibiri ku isi.`,
  inyikirizoKristu1: `Habwa ikuzo Nyagasani, icyubahiro, ububasha n'ishema.`,
  inyikirizoKristu2: `Uragasingizwa Mubyeyi wacu, Wowe waduhereye umugisha muri Kristu.`,
  inyikirizoZab1: `Nihasingizwe izina rya Nyagasani, ubu n'iteka ryose.`,
  inyikirizoZab2: `Ubuvunyi n'ingabire bituruka kuri Uhoraho.`,
  isomo: `Ahasigaye, nimutekereze ibihuje, mugirirane impuhwe, mukundane urwa kivandimwe, mube abanyambabazi kandi mwicishe bugufi. Ntimukiture undi inabi yabagiriye, cyangwa ngo nabatuka mumusubize; ahubwo mwifurizanye umugisha, kuko ari cyo mwahamagariwe, kugira ngo muzahabwe umugisha ho umurage.`,
  igisubizo: `Nishyize mu biganza byawe, Nyagasani.
Ni wowe uducungura Nyagasani, Mana y'ukuri.`,
  inyikirizoMariyaWeekday: `Uhoraho yangiriye ibintu by'agatangaza, izina rye ni ritagatifu.`,
  inyikirizoMariyaSunday: `Ku mugoroba wa Pasika abigishwa bamenye Nyagasani, igihe yamanyuraga umugati.`,
  magnificat: `Umutima wanjye urasingiza Nyagasani,
kandi uhimbajwe n'Imana Umukiza wanjye.
Kuko yibutse umuja we utavugwaga,
rwose, kuva ubu amašekuruza yose azanyita umuhire.
Umushoborabyose yankoreye ibitangaza,
Izina rye ni ritagatifu,
Impuhwe ze zisesekarizwa abamutinya bo mu bihe byose.
Yagaragaje ububasha bw'amaboko ye, atatanya abantu birata;
yahanantuye abakomeye abakura ku ntebe zabo,
maze akuza ab'intamenyekana;
abashonji yabagwirije ibintu, abakungu abasezerera amara masa.
Yagobotoye Israheli umugaragu we,
bityo yibuka impuhwe ze,
nk'uko yari yarabibwiye abakurambere bacu,
agirira Abrahamu n'urubyaro rwe iteka.`,
  ikuzoMariya: `Nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose, Amen.`,
  gusabaIntro: `Dusabe Imana, Umubyeyi wacu, We ukunda abana be kandi ntiyirengagize amasezerano yabo, tumubwire twiyoroheje tuti: "NYAGASANI UTWIYEGEREZE."`,
  gusaba1: `Mana y'urukundo, wowe wagiranye n'umuryango wawe isezerano ry'iteka, dufashe kwibuka ibitangaza byawe. Tubisabe Imana.`,
  gusaba2: `Kiliziya yawe uyihe kujya mbere mu rukundo, kandi abakwemera ubakomeze mu bumwe no mu mahoro. Tubisabe Imana.`,
  gusaba3: `Nyagasani, duhe kutakwirengagiza mu mitunganyirize y'iyi si, maze imigirire yacu ihuze n'ugushaka kwawe. Tubisabe Imana.`,
  gusaba4: `Ohereza abakozi mu murima wawe, kugira ngo izina ryawe rimenyekane mu miryango yose. Tubisabe Imana.`,
  gusaba5: `Abapfuye bahe kureba uruhanga rwawe, natwe uduhe kuzasangira na bo umunezero w'ubwiza bwawe. Tubisabe Imana.`,
  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,
  risozaWeekday: `Mana itumurikira, duhe gutsinda imitego y'umwanzi muri iri joro, maze ejo mu gitondo tuzahimbarirwe imbere yawe, tugushimira muri Yezu Kristu Umwana wawe n'Umwami wacu. Amen.`,
  risozaSunday: `Nyagasani, gumana natwe kuko bwije n'umunsi ukaba uciye ikibu; susurutsa imitima yacu iyoboke inzira zawe, tuguhishure mu Byanditswe bitagatifu. Ibyo turabigusaba ku bwa Yezu Kristu, Umwana wawe n'Umwami wacu. Amen.`,
  umusozo: `Imana iduhe umugisha, iturinde ikibi cyose, kandi izatugeze mu bugingo bw'iteka. Amen.`,
};

const TOTAL_SLIDES = 11; // cover, 9 sections, outro

export default function NimugorobaPage() {
  const today = new Date();
  const isSunday = today.getDay() === 0;
  const inLent = isLent(today);
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);

  let slide: React.ReactNode;

  if (slideIndex === 0) {
    slide = (
      <div className="flex flex-col items-center text-center gap-3">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-1">
          Amasengesho ya Nimugoroba
        </h1>
        <p className="font-body text-sm text-siyoni-cream/50">
          {isSunday ? "Ku Cyumweru" : "Iminsi isanzwe"}
          {inLent && " · Igisibo"}
        </p>
      </div>
    );
  } else if (slideIndex === 1) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Intangiriro</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.intangiriro} />
          <DarkPrayerBlock name="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoIntangiriro} />
          {!inLent && <DarkPrayerBlock name="Alleluya" text={PRAYERS.alleluya} />}
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 2) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Igisingizo cya Kristu</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.igisingizoKristu} />
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoKristu1} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 3) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Zaburi</p>
        <DarkCard>
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoZab1} />
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoZab2} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 4) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Isomo — 1 Petero 3, 8-9</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.isomo} />
          <DarkPrayerBlock name="Igisubizo" text={PRAYERS.igisubizo} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 5) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Indirimbo ya Bikira Mariya — Lk 1, 47-55
        </p>
        <DarkCard>
          <DarkPrayerBlock
            name={isSunday ? "Inyikirizo yo ku cyumweru" : "Inyikirizo yo ku mibyizi"}
            text={isSunday ? PRAYERS.inyikirizoMariyaSunday : PRAYERS.inyikirizoMariyaWeekday}
          />
          <DarkPrayerBlock text={PRAYERS.magnificat} />
          <DarkPrayerBlock name="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoMariya} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 6) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Amasengesho yo Gusaba</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.gusabaIntro} />
          <DarkPrayerBlock text={PRAYERS.gusaba1} />
          <DarkPrayerBlock text={PRAYERS.gusaba2} />
          <DarkPrayerBlock text={PRAYERS.gusaba3} />
          <DarkPrayerBlock text={PRAYERS.gusaba4} />
          <DarkPrayerBlock text={PRAYERS.gusaba5} />
          <DarkPrayerBlock text="(Bashobora kongeraho andi)" />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 7) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Dawe Uri mu Ijuru</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.dawe} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 8) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Isengesho Risoza</p>
        <DarkCard>
          <DarkPrayerBlock text={isSunday ? PRAYERS.risozaSunday : PRAYERS.risozaWeekday} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 9) {
    slide = (
      <div className="flex flex-col items-center text-center gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Umusozo</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.umusozo} />
          <DarkPrayerBlock name="Umusaseridoti" text="Dusingize Nyagasani." />
          <DarkPrayerBlock name="Abantu" text="Dushimiye Imana." />
        </DarkCard>
      </div>
    );
  } else {
    slide = (
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-2" />
        <p className="font-heading text-xl text-siyoni-cream">Imana iguhe ijoro ryiza. 🙏</p>
        <Link
          href="/isengesho"
          className="inline-block font-body text-sm text-siyoni-cream/60 hover:text-siyoni-cream transition-colors underline underline-offset-2"
        >
          Subira ku masengesho
        </Link>
      </div>
    );
  }

  return (
    <DarkSlideshowShell
      bgColor={BG_COLOR}
      backHref="/isengesho"
      slideIndex={slideIndex}
      direction={direction}
      footer={<SlideNav index={slideIndex} total={TOTAL_SLIDES} onPrev={prev} onNext={next} />}
    >
      {slide}
    </DarkSlideshowShell>
  );
}
