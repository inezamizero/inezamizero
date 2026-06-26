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
  intangiriro: `Nyagasani, bumbura umunwa wanjye.
Maze ururimi rwanjye ruzatangaze ibisingizo byawe.`,

  ikuzoIntangiriro: `Nk'uko bisanzwe iteka, bubahwe n'ubu n'iteka ryose. Amen.`,

  alleluya: `Alleluya`,

  // ── 2. Indirimbo ──────────────────────────────────────────────────────────
  inyikirizoIndirimbo: `Nimuze dusingize Nyagasani, Imana yacu.`,
  // Zab 95 is the morning invitatory psalm — add the full psalm text here
  indirimbo: `Zab 95
[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi 95 (Indirimbo yo mu gitondo)]`,

  // ── 3. Igisingizo ─────────────────────────────────────────────────────────
  // This is a responsive morning canticle, not just the Glory Be
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

  // ── 4. Zaburi ─────────────────────────────────────────────────────────────
  // Three antiphon options — the reader picks one
  inyikirizo1: `Ndashaka kugusingiza Mana yanjye
Ku bw'izina ryawe, nzamuye ibiganza.`,

  inyikirizo2: `Nimumukuze kandi mumurate ubuziraherezo.`,

  inyikirizo3: `Mahanga yose, nimusingize Uhoraho.`,

  // Psalm texts — add the full psalm for each reference above
  zaburiWeekday: `[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi (Iminsi isanzwe: Zab 63, Zab 148, Zab 117)]`,
  zaburiSunday: `[PLACEHOLDER — Shyiramo hano inyandiko ya Zaburi (Ku Cyumweru: Zab 63, Zab 148, Zab 117)]`,

  // Isomo — short reading within the Zaburi section
  // Weekday reading: Philippians 4:8-9
  isomoWeekday: `Abanyafilipi 4, 8-9

Ahasigaye, bavandimwe, icyitwa icy'ukuri cyose kimwe n'igikwiye kubahwa, igitunganye, ikitagira inenge, igikwiye gukundwa no kuratwa, mbese icyitwa ingeso nziza cyose kandi gikwiriye ishimwe, abe ari cyo muharanira. Ibyo nabigishije kandi mwemeye, ibyo mwanyumvanye kandi mwambonanye, mujye mubikora, maze Imana y'amahoro izahorane namwe.`,

  // Sunday reading: Matthew 28:1-10 (or Luke 24:1-12)
  isomoSunday: `Matayo 28, 1-10

Isabato irangiye, ku wa mbere wayo mu museso, Mariya Madalena na Mariya wundi bazindukira ku mva. Ubwo isi ihinda umushyitsi mwinshi; umumalayika wa Nyagasani amanuka mu ijuru aregera, ahirika ibuye, aryicara hejuru. Yari ameze nk'umurabyo, umwambaro we wera nk'urubura. Abarinzi bamurabutswe bakuka umutima, bamera nk'abapfuye. Ariko wa mumalayika araterura, abwira abagore ati 'Mwebweho mwitinya! Nzi ko mushaka Yezu wabambwe ku musaraba. Ntari hano, yazutse nk'uko yari yabivuze; nimuze mwirebere aho yari arambitse. None rero, nimugende mwihuta, mubwire abigishwa be ko yazutse, kandi ko agiye kubatanga mu Galileya; ni ho muzamubonera. Ngibyo ibyo nari mfite kubabwira.' Ubwo abagore bava ku mva bafite ubwoba buvanze n'ibyishimo byinshi, bihutira kubwira abigishwa be iyo nkuru. Ni bwo Yezu ahuye na bo ati: 'Nimugire amahoro!' Baramwegera, bahobera ibirenge bye, bamupfukamye imbere. Nuko Yezu arababwira ati: 'Mwitinya! Ahubwo nimugende mubwire abavandimwe banjye bajye mu Galileya; ni ho bazambonera'

cyangwa Luka 24, 1-12, n'ahandi.`,

  igisubizo: `Nzasingiza Nyagasani, iteka n'ahantu hose (2).`,
  zaburiSentence: `Ibisingizo bye bizahora ubudatuza mu munwa wanjye, iteka n'ahantu hose.`,
  ikuzoZaburi: `Nzasingiza Nyagasani, iteka n'ahantu hose.`,

  // ── 5. Indirimbo ya Zakariya (Benedictus — Lk 1:68-79) ───────────────────
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

  // ── 6. Amasengesho yo gusaba ──────────────────────────────────────────────
  gusabaIntro: `Dusabe Imana, Umubyeyi wacu ushobora byose, We wumvana ubwuzu ukwinginga kw'abana be, tumusingize tugira tuti: "NYAGASANI, UTWUMVE UTUBABARIRE."`,

  gusaba1: `Mana ihoraho kandi ishobora byose, muri Batisimu waduhaye urumuri rushya; uyu munsi udufashe tugendere muri urwo rumuri. Tubisabe Imana.`,
  gusaba2: `Tugabire ubwitonzi bwawe, kugira ngo buherekeze imirimo yacu yose kandi buyikomeze. Tubisabe Imana.`,
  gusaba3: `Nyagasani, uyu munsi uduhe ingabire zawe kandi uturinde icyaha. Tubisabe Imana.`,
  gusaba4: `Uratubere umuvunyi n'umurengezi, kandi uduhe ubwumvikane n'amahoro. Tubisabe Imana.`,

  // ── 7. Dawe uri mu ijuru ──────────────────────────────────────────────────
  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,

  // ── 8. Isengesho risoza ───────────────────────────────────────────────────
  risozaWeekday: `Nyagasani, ineza yawe nimurikire ibikorwa byacu byose, maze amasengesho n'imirimo yacu bigire isoko muri wowe, kandi bihabwe nawe indunduro nziza. Ibyo tubigusabye ku bwa Yezu Kristu, Umwami wacu. Amen.`,
  risozaSunday: `Mana, wowe ushyira ibyishimo by'ukuri mu mbaga yawe, ugaha umuryango wawe umunezero utazashira, turagusaba ngo uduhe guhorana ubwuzu mu byawe, maze tukogeze, tukumenyeshe n'abatakuzi. Ibyo tubigusabye ku bwa Yezu Kristu, Umwami wacu. Amen.`,

  // ── 9. Umusozo ────────────────────────────────────────────────────────────
  umusozo: `Imana niduhe umugisha, iturinde ikibi cyose, kandi izatugeze mu bugingo bw'iteka. Amen.`,
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

export default function MugitondoPage() {
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
            Amasengesho ya Mugitondo
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            {isSunday ? "Ku Cyumweru" : "Iminsi isanzwe"}
            {inLent && " · Igisibo"}
          </p>

          {/* ── 1. Intangiriro ─────────────────────────────────────────────── */}
          <SectionHeader title="Intangiriro" />
          <PrayerBlock text={PRAYERS.intangiriro} />
          <SubBlock label="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoIntangiriro} />

          {/* ── 2. Indirimbo ───────────────────────────────────────────────── */}
          <SectionHeader title="Indirimbo" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoIndirimbo} />
          {!inLent && <SubBlock label="Alleluya" text={PRAYERS.alleluya} />}

          {/* ── 3. Igisingizo ──────────────────────────────────────────────── */}
          <SectionHeader title="Igisingizo" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoIgisingizo} />
          <PrayerBlock text={PRAYERS.igisingizo} />
          <SubBlock label="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoIntangiriro} />
          

          {/* ── 4. Zaburi ──────────────────────────────────────────────────── */}
          <SectionHeader title={isSunday ? "Zaburi — Ku Cyumweru" : "Zaburi — Iminsi Isanzwe"} />
          <SubBlock label="Inyikirizo 1" text={PRAYERS.inyikirizo1} />
          <SubBlock label="Inyikirizo 2" text={PRAYERS.inyikirizo2} />
          <SubBlock label="Inyikirizo 3" text={PRAYERS.inyikirizo3} />
          

          {/* ── 5. Isomo ───────────────────────────────────────────────────── */}
          <SectionHeader title={isSunday ? "Isomo — Ku Cyumweru" : "Isomo — Ku Mibyizi"} />
          <PrayerBlock text={isSunday ? PRAYERS.isomoSunday : PRAYERS.isomoWeekday} />
          <SubBlock label="Igisubizo" text={PRAYERS.igisubizo} />
          <SubBlock label="" text={PRAYERS.zaburiSentence} />
          <SubBlock label="Hubahwe Imana Data na Mwana na Roho Mutagatifu" text={PRAYERS.ikuzoZaburi} />

          {/* ── 5. Indirimbo ya Zakariya ───────────────────────────────────── */}
          <SectionHeader title="Indirimbo ya Zakariya — Lk 1, 68-79" />
          <SubBlock label="Inyikirizo" text={PRAYERS.inyikirizoZakariya} />
          <PrayerBlock text={PRAYERS.zakariya} />
          <SubBlock label="Ikuzo ry'Imana" text={PRAYERS.ikuzoZakariya} />

          {/* ── 6. Amasengesho yo gusaba ───────────────────────────────────── */}
          <SectionHeader title="Amasengesho yo Gusaba" />
          <PrayerBlock text={PRAYERS.gusabaIntro} />
          <SubBlock label="" text={PRAYERS.gusaba1} />
          <SubBlock label="" text={PRAYERS.gusaba2} />
          <SubBlock label="" text={PRAYERS.gusaba3} />
          <SubBlock label="" text={PRAYERS.gusaba4} />

          {/* ── 7. Dawe uri mu ijuru ───────────────────────────────────────── */}
          <SectionHeader title="Dawe Uri mu Ijuru" />
          <PrayerBlock text={PRAYERS.dawe} />

          {/* ── 8. Isengesho risoza ────────────────────────────────────────── */}
          <SectionHeader title="Isengesho Risoza" />
          <PrayerBlock text={isSunday ? PRAYERS.risozaSunday : PRAYERS.risozaWeekday} />

          {/* ── 9. Umusozo ─────────────────────────────────────────────────── */}
          <SectionHeader title="Umusozo" />
          <PrayerBlock text={PRAYERS.umusozo} />
          <SubBlock label="Umusaseridoti" text="Dusingize Nyagasani." />
          <SubBlock label="Abantu" text="Dushimiye Imana." />

          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Imana iguhe umunsi mwiza. 🙏
            </p>
            <Link href="/isengesho" className="inline-block mt-6 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors underline underline-offset-2">
              Subira ku masengesho
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
