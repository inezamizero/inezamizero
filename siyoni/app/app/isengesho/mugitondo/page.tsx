"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSlideshow } from "@/lib/useSlideshow";
import DarkSlideshowShell from "@/components/DarkSlideshowShell";
import { DarkCard, DarkPrayerBlock, SlideNav } from "@/components/DarkPrayerUI";

// Morning prayer stays in the same dark-chocolate family as the other
// devotions, but noticeably lighter and warmer — people are waking up, not
// settling in for the night. A rich dawn amber instead of near-black.
const BG_COLOR = "#4A2A12";

// Plays once when the page loads: a burst of light from the top-right
// corner floods the whole screen, then fades away to reveal the page
// already settled underneath. No sun stays on screen after this — the
// flash is the whole effect. Same overlay-then-reveal technique as the
// novena's knot-untying transition.
function SunriseFlash() {
  return (
    <motion.div
      key="sunrise-flash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
      style={{ backgroundColor: BG_COLOR }}
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0.7 }}
        animate={{ scale: 16, opacity: [0.7, 1, 1] }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
        className="absolute -right-10 -top-10 md:right-2 md:-top-12 w-40 h-40 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFF6DE 0%, #FFD25C 45%, #E8752E 100%)",
        }}
      />
    </motion.div>
  );
}

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
  intangiriro: `Nyagasani, bumbura umunwa wanjye.
Maze ururimi rwanjye ruzatangaze ibisingizo byawe.`,
  ikuzoIntangiriro: `Nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose. Amen.`,
  alleluya: `Alleluya`,
  inyikirizoIndirimbo: `Nimuze dusingize Nyagasani, Imana yacu.`,
  indirimbo: `Zab 95
[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi 95 (Indirimbo yo mu gitondo)]`,
  inyikirizoIgisingizo: `Nimusingize Rurema wuzuye urukundo waduhaye ubugingo bw'iteka.`,
  igisingizo: `Imana yaremye byose ibiha umugisha
uko yari yabitekereje kuva kera.
Akira amasengesho yacu Turagusenga.

Yaremye abantu irema abamalayika
Nk'uko yari yabitekereje kuva kera.
Akira amasengesho yacu Turagusingiza.

Ibintu byose yabikuye mu busa
Ibisenderezamo urukundo n'ubwenge bwinshi.
Akira amasengesho yacu turagushimira.

Hubahwe Imana Data na Mwana na Roho Mutagatifu
Nk'uko bisanzwe iteka bubahwe n'ubu n'iteka ryose. Amen.`,
  igisingizoSentence: `Horana impundu Rurema iteka ryose. Amen.`,
  inyikirizo1: `Ndashaka kugusingiza Mana yanjye
Ku bw'izina ryawe, nzamuye ibiganza.`,
  inyikirizo2: `Nimumukuze kandi mumurate ubuziraherezo.`,
  inyikirizo3: `Mahanga yose, nimusingize Uhoraho.`,
  zaburiWeekday: `[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi (Iminsi isanzwe: Zab 63, Zab 148, Zab 117)]`,
  zaburiSunday: `[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi (Ku Cyumweru: Zab 63, Zab 148, Zab 117)]`,
  isomoWeekday: `Abanyafilipi 4, 8-9

Ahasigaye, bavandimwe, icyitwa icy'ukuri cyose kimwe n'igikwiye kubahwa, igitunganye, ikitagira inenge, igikwiye gukundwa no kuratwa, mbese icyitwa ingeso nziza cyose kandi gikwiriye ishimwe, abe ari cyo muharanira. Ibyo nabigishije kandi mwemeye, ibyo mwanyumvanye kandi mwambonanye, mujye mubikora, maze Imana y'amahoro izahorane namwe.`,
  isomoSunday: `Matayo 28, 1-10

Isabato irangiye, ku wa mbere wayo mu museso, Mariya Madalena na Mariya wundi bazindukira ku mva. Ubwo isi ihinda umushyitsi mwinshi; umumalayika wa Nyagasani amanuka mu ijuru aregera, ahirika ibuye, aryicara hejuru. Yari ameze nk'umurabyo, umwambaro we wera nk'urubura. Abarinzi bamurabutswe bakuka umutima, bamera nk'abapfuye. Ariko wa mumalayika araterura, abwira abagore ati 'Mwebweho mwitinya! Nzi ko mushaka Yezu wabambwe ku musaraba. Ntari hano, yazutse nk'uko yari yabivuze; nimuze mwirebere aho yari arambitse. None rero, nimugende mwihuta, mubwire abigishwa be ko yazutse, kandi ko agiye kubatanga mu Galileya; ni ho muzamubonera. Ngibyo ibyo nari mfite kubabwira.' Ubwo abagore bava ku mva bafite ubwoba buvanze n'ibyishimo byinshi, bihutira kubwira abigishwa be iyo nkuru. Ni bwo Yezu ahuye na bo ati: 'Nimugire amahoro!' Baramwegera, bahobera ibirenge bye, bamupfukamye imbere. Nuko Yezu arababwira ati: 'Mwitinya! Ahubwo nimugende mubwire abavandimwe banjye bajye mu Galileya; ni ho bazambonera'

cyangwa Luka 24, 1-12, n'ahandi.`,
  igisubizo: `Nzasingiza Nyagasani, iteka n'ahantu hose (2).`,
  zaburiSentence: `Ibisingizo bye bizahora ubudatuza mu munwa wanjye, iteka n'ahantu hose.`,
  ikuzoZaburi: `Nzasingiza Nyagasani, iteka n'ahantu hose.`,
  inyikirizoZakariya: `Amahanga yose azaza apfukame imbere yawe,
kuko wowe wenyine uri Nyir'Ubutagatifu.`,
  zakariya: `Nihasingizwe Nyagasani, Imana ya Israheli,
kuko yasuye umuryango we kandi akawukiza.
Yatugoboreye ububasha budukiza,
mu nzu ya Dawudi umugaragu we,
nk'uko abahanuzi be batagatifu
bari barabitumenyesheje kuva kera
ko azadukiza abanzi bacu,
akatugobotora mu nzara z'abatwanga bose.
Yagiriye impuhwe ababyeyi bacu,
maze yibuka isezerano rye ritagatifu
ya ndahiro yarahiriye Abrahamu umubyeyi wacu,
avuga ko namara kutugobotora mu maboko y'abanzi bacu,
azaduha kumukorera nta cyo twikanga,
turangwa n'ubuyoboke hamwe n'ubutungane,
iminsi yose y'ukubaho kwacu.
Nawe rero wa kana we, uzitwa umuhanuzi
w'Umusumbabyose, Kuko uzabanziriza
Nyagasani ngo umutegurire amayira,
ukamenyesha umuryango we umukiro,
bazakesha kubabarirwa ibyaha byabo.
Koko Imana yacu igira impuhwe zihebuje,
ari zo zatumye Zubarirashe
amanuka mu ijuru aje kudusura,
akabonekera abari batuye mu mwijima
no mu gicuku cy'urupfu,
kugira ngo atuyobore mu nzira y'amahoro.`,
  ikuzoZakariya: `Hubahwe Imana Data na Mwana na Roho Mutagatifu,
nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose. Amen.`,
  gusabaIntro: `Dusabe Imana, Umubyeyi wacu ushobora byose, We wumvana ubwuzu ukwinginga kw'abana be, tumusingize tugira tuti: "NYAGASANI, UTWUMVE UTUBABARIRE."`,
  gusaba1: `Mana ihoraho kandi ishobora byose, muri Batisimu waduhaye urumuri rushya; uyu munsi udufashe tugendere muri urwo rumuri. Tubisabe Imana.`,
  gusaba2: `Tugabire ubwitonzi bwawe, kugira ngo buherekeze imirimo yacu yose kandi buyikomeze. Tubisabe Imana.`,
  gusaba3: `Nyagasani, uyu munsi uduhe ingabire zawe kandi uturinde icyaha. Tubisabe Imana.`,
  gusaba4: `Uratubere umuvunyi n'umurengezi, kandi uduhe ubwumvikane n'amahoro. Tubisabe Imana.`,
  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,
  risozaWeekday: `Nyagasani, ineza yawe nimurikire ibikorwa byacu byose, maze amasengesho n'imirimo yacu bigire isoko muri wowe, kandi bihabwe nawe indunduro nziza. Ibyo tubigusabye ku bwa Yezu Kristu, Umwami wacu. Amen.`,
  risozaSunday: `Mana, wowe ushyira ibyishimo by'ukuri mu mbaga yawe, ugaha umuryango wawe umunezero utazashira, turagusaba ngo uduhe guhorana ubwuzu mu byawe, maze tukogeze, tukumenyeshe n'abatakuzi. Ibyo tubigusabye ku bwa Yezu Kristu, Umwami wacu. Amen.`,
  umusozo: `Imana niduhe umugisha, iturinde ikibi cyose, kandi izatugeze mu bugingo bw'iteka. Amen.`,
};

const TOTAL_SLIDES = 11; // cover, 9 sections, outro

export default function MugitondoPage() {
  const today = new Date();
  const isSunday = today.getDay() === 0;
  const inLent = isLent(today);
  const { slideIndex, direction, next, prev } = useSlideshow(TOTAL_SLIDES);

  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 1000);
    return () => clearTimeout(t);
  }, []);

  let slide: React.ReactNode;

  if (slideIndex === 0) {
    slide = (
      <div className="flex flex-col items-center text-center gap-3">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-siyoni-cream mb-1">
          Amasengesho ya Mugitondo
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
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 2) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Indirimbo</p>
        <DarkCard>
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoIndirimbo} />
          {!inLent && <DarkPrayerBlock name="Alleluya" text={PRAYERS.alleluya} />}
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 3) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Igisingizo</p>
        <DarkCard>
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoIgisingizo} />
          <DarkPrayerBlock text={PRAYERS.igisingizo} />
          <DarkPrayerBlock name="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoIntangiriro} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 4) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          {isSunday ? "Zaburi — Ku Cyumweru" : "Zaburi — Iminsi Isanzwe"}
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Inyikirizo 1" text={PRAYERS.inyikirizo1} />
          <DarkPrayerBlock name="Inyikirizo 2" text={PRAYERS.inyikirizo2} />
          <DarkPrayerBlock name="Inyikirizo 3" text={PRAYERS.inyikirizo3} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 5) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          {isSunday ? "Isomo — Ku Cyumweru" : "Isomo — Ku Mibyizi"}
        </p>
        <DarkCard>
          <DarkPrayerBlock text={isSunday ? PRAYERS.isomoSunday : PRAYERS.isomoWeekday} />
          <DarkPrayerBlock name="Igisubizo" text={PRAYERS.igisubizo} />
          <DarkPrayerBlock text={PRAYERS.zaburiSentence} />
          <DarkPrayerBlock name="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoZaburi} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 6) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
          Indirimbo ya Zakariya — Lk 1, 68-79
        </p>
        <DarkCard>
          <DarkPrayerBlock name="Inyikirizo" text={PRAYERS.inyikirizoZakariya} />
          <DarkPrayerBlock text={PRAYERS.zakariya} />
          <DarkPrayerBlock name="Ikuzo ry'Imana" text={PRAYERS.ikuzoZakariya} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 7) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Amasengesho yo Gusaba</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.gusabaIntro} />
          <DarkPrayerBlock text={PRAYERS.gusaba1} />
          <DarkPrayerBlock text={PRAYERS.gusaba2} />
          <DarkPrayerBlock text={PRAYERS.gusaba3} />
          <DarkPrayerBlock text={PRAYERS.gusaba4} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 8) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Dawe Uri mu Ijuru</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.dawe} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 9) {
    slide = (
      <div className="flex flex-col gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Isengesho Risoza</p>
        <DarkCard>
          <DarkPrayerBlock text={isSunday ? PRAYERS.risozaSunday : PRAYERS.risozaWeekday} />
        </DarkCard>
      </div>
    );
  } else if (slideIndex === 10) {
    slide = (
      <div className="flex flex-col items-center text-center gap-4">
        <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">Umusozo</p>
        <DarkCard>
          <DarkPrayerBlock text={PRAYERS.umusozo} />
          <DarkPrayerBlock name="Umusaseridoti" text="Dusingize Nyagasani." />
          <DarkPrayerBlock name="Abantu" text="Dushimiye Imana." />
        </DarkCard>
        <div className="mt-4">
          <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
          <p className="font-heading text-xl text-siyoni-cream">Imana iguhe umunsi mwiza. 🙏</p>
          <Link
            href="/isengesho"
            className="inline-block mt-6 font-body text-sm text-siyoni-cream/60 hover:text-siyoni-cream transition-colors underline underline-offset-2"
          >
            Subira ku masengesho
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>{entering && <SunriseFlash />}</AnimatePresence>
      <DarkSlideshowShell
        bgColor={BG_COLOR}
        backHref="/isengesho"
        slideIndex={slideIndex}
        direction={direction}
        footer={<SlideNav index={slideIndex} total={TOTAL_SLIDES} onPrev={prev} onNext={next} />}
      >
        {slide}
      </DarkSlideshowShell>
    </>
  );
}
