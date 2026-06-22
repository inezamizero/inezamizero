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
  const ashWed = new Date(easter); ashWed.setDate(easter.getDate() - 46);
  const palmSunday = new Date(easter); palmSunday.setDate(easter.getDate() - 7);
  return date >= ashWed && date < palmSunday;
}

// ── Prayer content ────────────────────────────────────────────────────────────

const PRAYERS = {

  // ── 1. Intangiriro ────────────────────────────────────────────────────────
  intangiriro: `Mana ngwino unyikirize. Nyagasani banguka undengere.`,

  ikuzoIntangiriro: `nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose. Amen.`,

  alleluya: `Alleluya`,

  // ── 2. Indirimbo ──────────────────────────────────────────────────────────
  // References to the physical hymn book — add the hymn text here when available
  indirimboRef: `D 54 cyangwa X 4, X 6, X 13`,
  indirimbo: `[PLACEHOLDER — Shyiramo hano inyandiko y'indirimbo yo mu mugoroba]`,

  // ── 3. Igisingizo cya Kristu ──────────────────────────────────────────────
  // Canticle of Christ — Colossians 1:12-20 (primary option)
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

  // Alternative canticle — Ephesians 1:3-10
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

  // Antiphons after the canticle
  inyikirizoKristu1: `Habwa ikuzo Nyagasani, icyubahiro, ububasha n'ishema.`,
  inyikirizoKristu2: `Uragasingizwa Mubyeyi wacu, Wowe waduhereye umugisha muri Kristu.`,

  // ── 4. Zaburi ─────────────────────────────────────────────────────────────
  inyikirizoZab1: `Nihasingizwe izina rya Nyagasani, ubu n'iteka ryose.`,
  inyikirizoZab2: `Ubuvunyi n'ingabire bituruka kuri Uhoraho.`,

  // ── 5. Isomo ──────────────────────────────────────────────────────────────
  // Reading — 1 Peter 3:8-9
  isomo: `Ahasigaye, nimutekereze ibihuje, mugirirane impuhwe, mukundane urwa kivandimwe, mube abanyambabazi kandi mwicishe bugufi. Ntimukiture undi inabi yabagiriye, cyangwa ngo nabatuka mumusubize; ahubwo mwifurizanye umugisha, kuko ari cyo mwahamagariwe, kugira ngo muzahabwe umugisha ho umurage.`,

  igisubizo: `Nishyize mu biganza byawe, Nyagasani.
Ni wowe uducungura Nyagasani, Mana y'ukuri.`,

  // ── 6. Indirimbo ya Bikira Mariya (Magnificat — Lk 1:47-55) ──────────────
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

  // ── 7. Amasengesho yo gusaba ──────────────────────────────────────────────
  gusabaIntro: `Dusabe Imana, Umubyeyi wacu, We ukunda abana be kandi ntiyirengagize amasezerano yabo, tumubwire twiyoroheje tuti: "NYAGASANI UTWIYEGEREZE."`,

  gusaba1: `Mana y'urukundo, wowe wagiranye n'umuryango wawe isezerano ry'iteka, dufashe kwibuka ibitangaza byawe. Tubisabe Imana.`,
  gusaba2: `Kiliziya yawe uyihe kujya mbere mu rukundo, kandi abakwemera ubakomeze mu bumwe no mu mahoro. Tubisabe Imana.`,
  gusaba3: `Nyagasani, duhe kutakwirengagiza mu mitunganyirize y'iyi si, maze imigirire yacu ihuze n'ugushaka kwawe. Tubisabe Imana.`,
  gusaba4: `Ohereza abakozi mu murima wawe, kugira ngo izina ryawe rimenyekane mu miryango yose. Tubisabe Imana.`,
  gusaba5: `Abapfuye bahe kureba uruhanga rwawe, natwe uduhe kuzasangira na bo umunezero w'ubwiza bwawe. Tubisabe Imana.`,

  // ── 8. Dawe uri mu ijuru ──────────────────────────────────────────────────
  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,

  // ── 9. Isengesho risoza ───────────────────────────────────────────────────
  risozaWeekday: `Mana itumurikira, duhe gutsinda imitego y'umwanzi muri iri joro, maze ejo mu gitondo tuzahimbarirwe imbere yawe, tugushimira muri Yezu Kristu Umwana wawe n'Umwami wacu. Amen.`,
  risozaSunday: `Nyagasani, gumana natwe kuko bwije n'umunsi ukaba uciye ikibu; susurutsa imitima yacu iyoboke inzira zawe, tuguhishure mu Byanditswe bitagatifu. Ibyo turabigusaba ku bwa Yezu Kristu, Umwana wawe n'Umwami wacu. Amen.`,

  // ── 10. Umusozo ───────────────────────────────────────────────────────────
  umusozo: `Imana iduhe umugisha, iturinde ikibi cyose, kandi izatugeze mu bugingo bw'iteka. Amen.`,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-siyoni-border" />
      <span className="font-body text-sm font-medium text-siyoni-mid tracking-widest uppercase whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-siyoni-border" />
    </div>
  );
}

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

export default function NimugorobaPage() {
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
        <Link href="/isengesho" className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors">
          ← Subira
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
        >
          <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-1">
            Amasengesho ya Nimugoroba
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            {isSunday ? "Ku Cyumweru" : "Iminsi isanzwe"}
            {inLent && " · Igisibo"}
          </p>

          {/* ── 1. Intangiriro ─────────────────────────────────────────────── */}
          <SectionHeader title="Intangiriro" />
          <PrayerBlock text={PRAYERS.intangiriro} />
          <SubBlock label="Ikuzo ry'Imana" text="Hubahwe Imana Data na Mwana na Roho Mutagatifu" />
          <SubBlock label="" text={PRAYERS.ikuzoIntangiriro} />
          {!inLent && <SubBlock label="Alleluya" text={PRAYERS.alleluya} />}

          {/* ── 2. Igisingizo cya Kristu ───────────────────────────────────── */}
          <SectionHeader title="Igisingizo cya Kristu" />
          <PrayerBlock text={PRAYERS.igisingizoKristu} />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoKristu1} />

          {/* ── 4. Zaburi ──────────────────────────────────────────────────── */}
          <SectionHeader title="Zaburi" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoZab1} />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoZab2} />

          {/* ── 5. Isomo ───────────────────────────────────────────────────── */}
          <SectionHeader title="Isomo — 1 Petero 3, 8-9" />
          <PrayerBlock text={PRAYERS.isomo} />
          <SubBlock label="Igisubizo" text={PRAYERS.igisubizo} />

          {/* ── 6. Indirimbo ya Bikira Mariya (Magnificat) ─────────────────── */}
          <SectionHeader title="Indirimbo ya Bikira Mariya — Lk 1, 47-55" />
          <SubBlock
            label={isSunday ? "Inyikirizo yo ku cyumweru" : "Inyikirizo yo ku mibyizi"}
            text={isSunday ? PRAYERS.inyikirizoMariyaSunday : PRAYERS.inyikirizoMariyaWeekday}
          />
          <PrayerBlock text={PRAYERS.magnificat} />
          <SubBlock label="Ikuzo ry'Imana" text="Hubahwe Imana Data na Mwana na Roho Mutagatifu" />
          <SubBlock label="" text={PRAYERS.ikuzoMariya} />

          {/* ── 7. Amasengesho yo gusaba ───────────────────────────────────── */}
          <SectionHeader title="Amasengesho yo Gusaba" />
          <PrayerBlock text={PRAYERS.gusabaIntro} />
          <SubBlock label="" text={PRAYERS.gusaba1} />
          <SubBlock label="" text={PRAYERS.gusaba2} />
          <SubBlock label="" text={PRAYERS.gusaba3} />
          <SubBlock label="" text={PRAYERS.gusaba4} />
          <SubBlock label="" text={PRAYERS.gusaba5} />
          <SubBlock label="" text="(Bashobora kongeraho andi)" />

          {/* ── 8. Dawe uri mu ijuru ───────────────────────────────────────── */}
          <SectionHeader title="Dawe Uri mu Ijuru" />
          <PrayerBlock text={PRAYERS.dawe} />

          {/* ── 9. Isengesho risoza ────────────────────────────────────────── */}
          <SectionHeader title="Isengesho Risoza" />
          <PrayerBlock text={isSunday ? PRAYERS.risozaSunday : PRAYERS.risozaWeekday} />

          {/* ── 10. Umusozo ─────────────────────────────────────────────────── */}
          <SectionHeader title="Umusozo" />
          <PrayerBlock text={PRAYERS.umusozo} />
          <SubBlock label="Umusaseridoti" text="Dusingize Nyagasani." />
          <SubBlock label="Abantu" text="Dushimiye Imana." />

          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">Imana iguhe ijoro ryiza. 🙏</p>
            <Link href="/isengesho" className="inline-block mt-6 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors underline underline-offset-2">
              Subira ku masengesho
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
