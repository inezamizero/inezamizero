"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Mysteries ─────────────────────────────────────────────────────────────────

const MYSTERIES = {
  mishimishije: {
    // Joyful Mysteries — Monday & Saturday
    name: "Amibukiro yo kwishima",
    days: "Kuwa mbere & Kuwa gatandatu",
    items: [
      "Marayika Gaburiyeri abwira Bikira Mariya ko azabyara umwana w'Imana",
      "Bikira Mariya ajya gusura Elizabeti Mutagatifu",
      "Yezu avukira i Betelehemu",
      "Yezu aturwa Imana mu Hekaru",
      "Bikira mariya abona Yezu yigishiriza mu Hekaru",
    ],
  },
  ibuze: {
    // Sorrowful Mysteries — Tuesday & Friday
    name: "Amibukiro y'ishavu",
    days: "Kuwa kabiri & Kuwa gatanu",
    items: [
      "Yezu asambira mu murima w’i Getsemani",
      "Yezu bamukubita",
      "Yezu bamutamiriza ikizingo cy’amahwa",
      "Yezu aheka umusaraba",
      "Yezu apfira ku musaraba",
    ],
  },
  yubahwa: {
    // Glorious Mysteries — Wednesday & Sunday
    name: "Amibukiro y'ikuzo",
    days: "Kuwa gatatu & Ku cyumweru",
    items: [
      "Yezu azuka",
      "Yezu asubira mw’Ijuru",
      "Roho Mutagatifu aza mu mitima y'intumwa",
      "Bikira Mariya apfa akajyanwa mw’Ijuru",
      "Guhabwa ikamba Bikira Mariya mu ijuru",
    ],
  },
  urumuri: {
    // Luminous Mysteries — Thursday
    name: "Amibukiro y'urumuri",
    days: "Kuwa kane",
    items: [
      "Yezu abatirizwa muri Yorudani",
      "Yezu agaragaza ububasha bwe mu bukwe bw’i Kana",
      "Yezu atangaza Ingoma y'Imana",
      "Yezu atangaza Ingoma y'Imana",
      "Yezu arema Ukaristiya",
    ],
  },
} as const;

type MysteryKey = keyof typeof MYSTERIES;

// Individual meditation for each of the 5 mysteries in each set.
// Fill in one short paragraph per mystery — what to reflect on while praying.
const MEDITATIONS: Record<MysteryKey, string[]> = {
  mishimishije: [
    // Meditation 1 — Marayika Gaburiyeri abwira Bikira Mariya
    "Dusabe inema yo koroshya.",
    // Meditation 2 — Bikira Mariya ajya gusura Elizabeti
    "Dusabe inema yo gukundana.",
    // Meditation 3 — Yezu avukira i Betelehemu
    "Dusabe inema yo kutita ku by 'isi.",
    // Meditation 4 — Yezu aturwa Imana mu Hekaru
    "Dusabe inema yo kumvira abadutegeka.",
    // Meditation 5 — Bikira Mariya abona Yezu mu Hekaru
    "Dusabe inema yo kutiganyira kwigisha abantu.",
  ],
  ibuze: [
    // Meditation 1 — Yezu asambira mu murima w'i Getsemani
    "Dusabe inema yo kwanga ibyaha.",
    // Meditation 2 — Yezu bamukubita
    "Dusabe inema yo kutararikira ingeso mbi.",
    // Meditation 3 — Yezu bamutamiriza ikizingo cy'amahwa
    "Dusabe inema yo kutinubira ibyago.",
    // Meditation 4 — Yezu aheka umusaraba
    "Dusabe inema yo kwemera icyo Imana idutegeka.",
    // Meditation 5 — Yezu apfira ku musaraba
    "Dusabe inema yo gukunda Yezu na Mariya.",
  ],
  yubahwa: [
    // Meditation 1 — Yezu azuka
    "Dusabe inema yo gutunganira Imana.",
    // Meditation 2 — Yezu asubira mw'Ijuru
    "Dusabe inema yo kwifuza kuzajya mw’ijuru.",
    // Meditation 3 — Roho Mutagatifu aza mu mitima y'intumwa
    "Dusabe inema yo gukomera mu by’Imana.",
    // Meditation 4 — Bikira Mariya apfa akajyanwa mw'Ijuru
    "Dusabe inema yo gupfa neza.",
    // Meditation 5 — Guhabwa ikamba Bikira Mariya mu ijuru
    "Dusabe inema yo kumwizera.",
  ],
  urumuri: [
    // Meditation 1 — Yezu abatirizwa muri Yorudani
    "Dusabe inema yo gukomera ku masezerano ya Batisimu.",
    // Meditation 2 — Yezu agaragaza ububasha bwe mu bukwe bw'i Kana
    "Dusabe inema yo kubaho mu budahemuka.",
    // Meditation 3 — Yezu atangaza Ingoma y'Imana
    "Dusabe inema yo kugarukira Imana.",
    // Meditation 4 — Yezu ahinduka ku musozi
    "Dusabe inema yo kumurangamira no kumwumvira.",
    // Meditation 5 — Yezu arema Ukaristiya
    "Dusabe inema yo kumuhahwa neza.",
  ],
};

function getTodaysMystery(): MysteryKey {
  const day = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
  if (day === 1 || day === 6) return "mishimishije";
  if (day === 2 || day === 5) return "ibuze";
  if (day === 3 || day === 0) return "yubahwa";
  return "urumuri";
}

// ── Prayers ───────────────────────────────────────────────────────────────────
// Replace each [PLACEHOLDER] below with the actual Kinyarwanda text.

const PRAYERS = {
  // Sign of the Cross
  ikimenyetso: `Ku izina ry'Imana Data, na Mwana, na Roho Mutagatifu `,

  // Apostles' Creed
  imigenzo: `Ndemera Imana Data ushobora byose waremye ijuru n'isi ndemera n'umwana w'ikinege Yezu Kristu wasamwe ku bwa Roho mutagatifu akabyarwa na Bikira Mariya, akababara ku ngoma ya Ponsiyo Pilato, akabambwa ku musaraba agapfa, agahambwa, akamuka ajya ikuzimu. Ku munsi wa gatatu akazuka, akajya mu ijuru akaba yicaye iburyo bw'Imana Data ishobora byose, niho azava aje gucira imanza abazima n'abapfuye. Nemera Roho Mutagatifu, na Kiliziya gatorika ntagatifu, n'ubumwe bw'abatagatifujwe, n'uko abanyabyaha babikizwa, n'uko abantu bazazuka bakazabaho iteka, Amen.`,

  // Our Father
  DaweUriMuIjuru: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk’uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk’uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,

  // Hail Mary
  ndakwibuka: `Wuje inema uhorana n'Imana. Wahebuje abagore bose umugisha, na Yezu umwana wabyaye arasingizwa. Mariya Mutagatifu mmubyeyi w'Imana, urajye udusabira twebwe abanyabyaha, kuri ubu, n'igihe tuzapfira, Amen.`,

  // Glory Be
  igisingizo: `Na Mwana na Roho Mutagatifu, nk'uko bisanzwe iteka yubahwe n'ubu n'iteka ryose, Amen.`,

  // Oh My Jesus
  yezuwacu: `Tubabarire ibyaha byacu, uturinde umuriro w'iteka. Igarurire roho z'abantu bose kandi uziyobore inzira y'ijuru, cyane cyane wite ku bakeneye impuhwe zawe. Maze ubabarire roho ziri muri Purigatori n'iz'abanyabyaha b'isi yose, Amen.`,

  // Fatima Prayer (O My Jesus)
  fatima: `[PLACEHOLDER — shyiramo hano Isengesho rya Fatima mu Kinyarwanda]`,

  // Hail Holy Queen (Salve Regina)
  hailHolyQueen: `Wibuke ko ntawigeze kumva ko waubije inyuma uwaje aguhungiyeho. Agutakambira ngo umurengere umusabire, ni cyo gituma nkwizera. Ndakugana nkuganyira ngo umpagararire ko ndi umunyabyaha. Mubyeyi w'umukiza ntiwirengagize ibyo nkubwira, ubyumve ubyiteho, Amen.`,

  // Closing Prayer
  closing: `Nyagasani Mana Yacu, turagusaba twe abawe, uduhe guhorana iteka roho nzima n'umubiri udafite indwara, maze kubw'amasengesho ya Mariya Mutagatifu Umubikira iteka, tubone gukira agahinda kariho kuri ubu, no kuzishima iteka mu ijuru. Kubwa yezu Kristu Umwami Wacu, Amen.`,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-siyoni-border" />
      <span className="font-body text-xs font-medium text-siyoni-mid tracking-widest uppercase whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-siyoni-border" />
    </div>
  );
}

function PrayerBlock({
  name,
  text,
  repeat,
}: {
  name: string;
  text: string;
  repeat?: string; // e.g. "Bivuge inshuro 10" (Say it 10 times)
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-heading text-lg font-semibold text-siyoni-brown">{name}</h3>
        {repeat && (
          <span className="font-body text-xs font-medium text-siyoni-ochre ml-4 whitespace-nowrap">
            {repeat}
          </span>
        )}
      </div>

      <div className="bg-siyoni-card border border-siyoni-border rounded-card p-5 shadow-card">
        <p className="prayer-text text-siyoni-brown">{text}</p>

        {/* Audio player — uncomment and wire up when audio files are ready */}
        {/* <div className="mt-4 pt-4 border-t border-siyoni-border">
          <audio controls src={audioSrc} className="w-full" />
        </div> */}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RozariBikiraMariya() {
  const [mysteryKey, setMysteryKey] = useState<MysteryKey>(getTodaysMystery());
  const mystery = MYSTERIES[mysteryKey];

  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-xl mx-auto px-6 py-12">
        <Link
          href="/rozari"
          className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors"
        >
          ← Subira
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
        >
          <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-2">
            Rozari Ntagatifu
          </h1>

          {/* Mystery selector — 4 cards, no items listed inside.
              Today's mystery is pre-selected. Scroll down after selecting to pray. */}
          <div className="mb-2">
            <p className="font-body text-xs font-medium text-siyoni-mid tracking-widest uppercase mb-3">
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
                    className={`
                      text-left w-full px-6 py-5 rounded-card border transition-all duration-200
                      ${isSelected
                        ? "border-siyoni-ochre bg-siyoni-card shadow-card-hover"
                        : "border-siyoni-border bg-siyoni-card shadow-card hover:border-siyoni-mid"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        {isToday && (
                          <span className="inline-block font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
                            ✓ Uyu munsi
                          </span>
                        )}
                        <p className="font-body text-xs text-siyoni-mid mb-1">{m.days}</p>
                        <h3 className="font-heading text-2xl font-bold text-siyoni-brown leading-snug">
                          {m.name}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Opening ───────────────────────────────────────────────────── */}
          <div className="mt-24" />
          <SectionHeader title="Gutangira" />

          <PrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />
          <PrayerBlock name="Indangakwemera" text={PRAYERS.imigenzo} />
          <PrayerBlock name="Dawe Uri Mu ijuru" text={PRAYERS.DaweUriMuIjuru} />
          <PrayerBlock
            name="Ndakuramutsa Mariya"
            text={PRAYERS.ndakwibuka}
            repeat="Inshuro 3"
          />
          <PrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />


          {/* ── 5 Decades ────────────────────────────────────────────────── */}
          {mystery.items.map((mysteryName, i) => (
            <div key={i}>
              <SectionHeader title={`Iyibukiro rya ${i + 1}`} />

              {/* Mystery announcement */}
              <div className="mb-6 p-4 bg-siyoni-card border border-siyoni-ochre/30 rounded-card">
                <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase mb-1">
                  Kuvuga iyibukiro
                </p>
                <p className="font-heading text-lg font-semibold text-siyoni-brown">
                  {mysteryName}
                </p>
                {/* Individual meditation for this specific mystery */}
                <p className="font-body text-sm text-siyoni-mid mt-2">
                  {MEDITATIONS[mysteryKey][i]}
                </p>
              </div>

              <PrayerBlock name="Dawe Uri Mu Ijuru" text={PRAYERS.DaweUriMuIjuru} />
              <PrayerBlock
                name="Ndakuramutsa Mariya"
                text={PRAYERS.ndakwibuka}
                repeat="Inshuro 10"
              />
              <PrayerBlock name="Hubahwe Imana Data" text={PRAYERS.igisingizo} />
              <PrayerBlock name="Yezu Wacu" text={PRAYERS.yezuwacu} />

            </div>
          ))}

          {/* ── Closing ───────────────────────────────────────────────────── */}
          <SectionHeader title="Gusoza" />

          <PrayerBlock name="Bikira Mariya Nyirimpuhwe" text={PRAYERS.hailHolyQueen} />
          <PrayerBlock name="Dusabe" text={PRAYERS.closing} />
          <PrayerBlock name="Ikimenyetso ky'Umusaraba" text={PRAYERS.ikimenyetso} />

          {/* Done */}
          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Rozari irarangiye. 🙏
            </p>
            <Link
              href="/rozari"
              className="inline-block mt-6 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors underline underline-offset-2"
            >
              Subira ku yandi mashapure
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
