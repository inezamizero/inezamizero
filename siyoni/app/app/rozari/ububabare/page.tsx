"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Prayers ───────────────────────────────────────────────────────────────────

const PRAYERS = {
  ikimenyetso: `Ku izina ry'Imana Data na Mwana na Roho Mutagatifu`,

  intangiriro: `Mana yanjye, ngutuye iyi shapure y'Ububabare kubera ikuzo ryawe ritagatifu, ngo nubahe Umubyeyi wawe Mutagatifu, mu kuzirikana no gusangira na We ububabare bwe. Ndakwinginze, umpe kwicuza ibyaha nakoze, umfashe kwitonda, umpe no kwicisha bugufi ngomba, ngo nshobore kuronka indulgensiya zose ziyirimo.`,

  kwicuza: `Nyagasani, ibyaha nakugiriye byose ndabyanze kuko binteranya nawe, bikadutandukanya ari Wowe untunga ukandengera iteka; kandi ndabyangira yuko aribyo byicishije Yezu Kristu Umwana wawe ukunda. Dawe ubinkize sinshaka kubisubira, ndashaka kuba uwawe. Amina`,

  ndakuramutsa: `Wuje inema uhorana n'Imana. Wahebuje abagore bose umugisha, na Yezu umwana wabyaye arasingizwa. Mariya Mutagatifu mmubyeyi w'Imana, urajye udusabira twe abanyabyaha, kuri ubu, n'igihe tuzapfira, Amen.`,

  mubyeyi: `Mubyeyi ugira ibambe, jya utwibutsa iminsi yose ibyababaje Yezu`,

  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukiza icyago, Amen.`,

  closing: `Mwamikazi w'abapfiriye Imana, roho yawe yashengukiye mu nyanja y'ububabare, ndakwinginze, kubera amarira wasutse muri cya gihe cy'amayoberane, udonkere hamwe n'abanyabyaha bose ukwicuza gushyitse.`,

  mutimaClosure: `Mutima wa Bikira Mariya wababaye cyane kandi utarasamanywe icyaha, udusabire twe abaguhungiraho`,

  dusabe: `Mana Nyir'ubuzima, rebena impuhwe Umutima utagira inenge wa Bikira Mariya, wahuranyijwe n'inkota y'ububabare mu rupfu rw'Umwana we, maze wakire amasengesho duturishije uwo Mutima wuje ituze, impuhwe n'ubutungane. Amina`,

  nihasingizwe: `Nihasingizwe Umutima utagira inenge wa Bikira Mariya`,
};

// ── Seven Sorrows ─────────────────────────────────────────────────────────────

const SORROWS: { title: string; meditation: string }[] = [
  {
    title: "Umusaza Simewoni ahanurira Bikira Mariya ko inkota izahuranya Umutima we",
    meditation: `Simewoni yari umusaza wari waratowe n'Imana. Igihe Yozefu na Bikira Mariya bagiye gutura Umwana Yezu mu Ngoro, Roho Mutagatifu amuvugiramo ngo abwire Bikira Mariya ko inkota izahuranya Umutima we. Bikira Mariya yakira ubwo buhanuzi kubera ko yari asanzwe azi ibyahanuwe ku Mucunguzi. Ariko ibyo byamuteraga ishavu igihe cyose yabonaga imibabaro ya Yezu.

Mubyeyi dukunda, Wowe wababaye bitavugwa, duhe gushobora kwakira imibabaro yose duhura nayo, tukwisunge ubudatezuka, dusigeho gukomeza kukubabaza.`,
  },
  {
    title: "Yezu bamuhungishiriza mu Misiri",
    meditation: `Yozefu yari umurinzi wa Yezu na Mariya. Igihe basinziriye, Malayika amubwirira mu nzozi ko bagomba guhungisha Umwana kuko Herodi yashakaga kumwica. Yozefu abimubwiye, Bikira Mariya arabyakira kandi yizera ko Umwana w'Imana aza kubarinda ibibi byose. Ariko ntibyamubujije kugira agahinda kenshi bitewe n'uko Umwana w'Imana yahigwaga n'abantu.

Mubyeyi wababaye cyane, duhe natwe kwakira Ugushaka kw'Imana, imibabaro yose duhura nayo tuyakirane umutima mwiza nk'Ugushaka kw'Imana, nkuko wabiduhayemo urugero igihe uhungisha Umwana Yezu utazi iyo werekeza, ukiragiza Imana yonyine. Dufashe natwe tubere abandi urugero.`,
  },
  {
    title: "Ibyababaje Umutima wa Mariya igihe Yezu azimiye",
    meditation: `Igihe bari bagiye mu minsi mikuru y'urugendo nyokokamana i Yeruzalemu, Bikira Mariya na Yozefu baratashye, basiga Umwana Yezu i Yeruzalemu batabizi. Bamaze kubona ko batari kumwe nawe, barababaye cyane, Bikira Mariya we abona isi imuhindukiye ukundi. Bamushakashaka iminsi itatu, hanyuma bamusanga mu Ngoro hagati y'abigisha, abateze amatwi kandi abasiganuza. Nyina amubonye amubazanya agahinda kenshi ati: "Watugenje ute? Jye na so twagushakanye umutima uhagaze". Yezu nawe arabasubiza ati: "Mwanshakiraga iki? Muyobewe ko ngomba kuba mu Nzu ya Data?"

Bikira Mariya Mubyeyi wacu, Wowe wababajwe n'uko Umwana w'Imana abuze, duhe natwe ingabire yo guhora dushakashaka Imana, tubabazwe n'uko tutayibona nk'uko byakubabaje, maze uduhe ukwihangana nk'uko wagize, kugira ngo dushobore gutsinda ibituyobya.`,
  },
  {
    title: "Bikira Mariya ahura na Yezu ahetse umusaraba",
    meditation: `Bikira Mariya yababajwe n'uko bahekesheje Yezu umusaraba kandi nta kibi yigeze akora. Hanyuma azamukana na We umusozi wa Kaluvariyo. Igihe cyose bahuzaga amaso, bombi bagiraga agahinda n'ishavu ryinshi, maze bakiragiza Imana muri iyo mibabaro yabo.

Mubyeyi wababaye cyane, dutoze kwakira ibibabaza byose, tubigiremo urukundo rukomeye n'ukwihangana gushyitse kandi tuzi neza ko uri kumwe natwe igihe cyose. Dusingize Imana hose no muri byose, Yo yabaduhayeho igitambo cyacu. Mudufashe turabisunze.`,
  },
  {
    title: "Bikira Mariya ahagaze munsi y'Umusaraba wa Yezu",
    meditation: `Bikira Mariya yazamukanye na Yezu yikoreye umusaraba agiye kubambwaho. Akomeza kwitegereza ukuntu umusaraba umushengura, awugwana, bamukubita ngo yihute, hanyuma bamubambisha imigera mu bubabare butavugwa. Igihe cyose Yezu yari ku musaraba areba Nyina washegeshwe n'ishavu, nibwo yamuturaze twese ngo tujye tumwisunga mu mibabaro yose tugira.

Mubyeyi mwiza, wowe wihanganiye ubwo bubabare bwose, ukemera no kutubera Umubyeyi, turakwinginze uduhe kudakomeza kubababaza mwembi, ahubwo tujye dukora icyo mutwifuzaho.`,
  },
  {
    title: "Bikira Mariya yakira umurambo wa Yezu mu maboko ye",
    meditation: `Igihe Yezu yari amaze gupfira ku musaraba, umurambo we barawumanuye, bawushyikiriza mu maboko y'Umubyeyi we. Bikira Mariya ababazwa bitavugwa no kureba ibyo bari bagiriye Umwana we, umubiri we bawushwanyaguje. Yitegereza ibikomere byari byuzuye umutwe we, umubiri wose washishimuwe n'ibikomere. Bikira Mariya atura Imana inshuro nyinshi Umwana we kandi asabira abantu bose ngo urwo rupfu rwoye kubapfira ubusa.

Mubyeyi mwiza, tugushimiye iyo neza yo kuduhakirwa ku Mana no kudusabira ngo tuyoboke Imana bishyitse. Aho niho cyane cyane ububyeyi bwawe bugaragarira, Wowe utadutererana ngo ube wadutura umujinya kubera ibyakorewe Umwana wawe. Duhe natwe gushobora kugushimisha dukora icyo udutegeka cyose.`,
  },
  {
    title: "Bikira Mariya ashyira umurambo wa Yezu mu mva",
    meditation: `Igihe Yezu yariamazegupfa, ntakindi cyari gisigaye usibye guhambwa. Icyababazaga Bikira Mariya ni uko yabonaga asigaye wenyine. Nuko, bamaze gushyingura umurambo w'Umwana we, Bikira Mariya arikubura arataha, Intumwa Yohani amujyana iwe yashegeshwe n'inyanja y'ububabare, ariko yizeye izuka rya Yezu.

Turakwiragije Mubyeyi, uturinde iminsi yose, maze twoye kwongera kugushavuza. Ahubwo turusheho kugushimisha kugira ngo tuguhoze ibyakubabaje mu ibabara n'urupfu by'Umwana wawe. Turakwisunze iminsi yose, uhore iteka uturengera.`,
  },
];

// ── Litany ────────────────────────────────────────────────────────────────────

const LITANY_KYRIE: [string, string][] = [
  ["Nyagasani utubabarire", "Nyagasani utubabarire"],
  ["Kristu utubabarire", "Kristu utubabarire"],
  ["Nyagasani utubabarire", "Nyagasani utubabarire"],
  ["Kristu utwumve", "Kristu utwiteho"],
];

const LITANY_TRINITY: [string, string][] = [
  ["Mana Data Nyir'ijuru", "Utubabarire"],
  ["Mana Mwana wakijije abantu", "Utubabarire"],
  ["Mana Roho Mutagatifu", "Utubabarire"],
  ["Butatu Butagatifu uri Imana imwe", "Utubabarire"],
];

const LITANY_MAIN: [string, string][] = [
  ["Mutima wa Mariya witorewe na Nyagasani", "Udusabire"],
  ["Mutima wa Mariya uzira inenge", "Udusabire"],
  ["Mutima wa Mariya usendereye inema", "Udusabire"],
  ["Mutima wa Mariya Ngoro y'Ubutatu Butagatifu", "Udusabire"],
  ["Mutima wa Mariya ugira impuhwe", "Udusabire"],
  ["Mutima wa Mariya warinzwe icyaha cy'inkomoko", "Udusabire"],
  ["Mutima wa Mariya wuzuye impuhwe za kibyeyi", "Udusabire"],
  ["Mutima wa Mariya wuzuye ubusugi", "Udusabire"],
  ["Mutima wa Mariya wanejerejwe Imana Data", "Udusabire"],
  ["Mutima wa Mariya Mizero y'abanyabyaha", "Udusabire"],
  ["Mutima wa Mariya Mirukiro y'abanyabyago", "Udusabire"],
  ["Mutima wa Mariya ugira inama nziza", "Udusabire"],
  ["Mutima wa Mariya ugira ibambe", "Udusabire"],
  ["Mutima wa Mariya ugira ubuntu", "Udusabire"],
  ["Mutima wa Mariya uduha gutona ku Mana", "Udusabire"],
  ["Mutima wa Mariya uduhumuriza", "Udusabire"],
  ["Mutima wa Mariya uhora uturengera", "Udusabire"],
  ["Mutima wa Mariya utubwiriza gukunda Nyagasani", "Udusabire"],
  ["Mutima wa Mariya waduhesheje Umukiza", "Udusabire"],
  ["Wowe Imana yatoreye kurera abo yiremeye", "Udusabire"],
  ["Wowe mpuhwe zihoza abarira", "Udusabire"],
  ["Wowe buruhukiro bw'abarushye", "Udusabire"],
  ["Wowe abaramukwa bambaza bakaruhuka neza", "Udusabire"],
  ["Wowe uduha imbaraga zo gutsinda ubunebwe", "Udusabire"],
  ["Wowe watumye ingoma y'Imana igaruka muri twe", "Udusabire"],
  ["Wowe huriro ry'amasezerano y'Imana Data", "Udusabire"],
  ["Mariya Mubwiriza w'abatunganye bose", "Udusabire"],
  ["Mubyeyi w'imiryango yose y'abantu", "Udusabire"],
  ["Cyishongoro cy'abamalayika", "Udusabire"],
  ["Mubyeyi utugabira ibyiza bya Roho", "Udusabire"],
  ["Ruhimbi rw'ibyiza bya Nyagasani", "Udusabire"],
  ["Kitabashwa cyahetse Mwene Data", "Udusabire"],
  ["Bushyinguro bw'Imana Data", "Udusabire"],
  ["Bwururukiro bw'inema zituzamo", "Udusabire"],
  ["Ngabire y'ubudahinyuka bw'Imana", "Udusabire"],
  ["Mugeni wa Roho Mutagatifu", "Udusabire"],
  ["Mubyeyi wa Jambo uhoraho", "Udusabire"],
  ["Nshumbushanyo y'Imana muri twe", "Udusabire"],
  ["Wowe Ribagiza ry'ubwiza", "Udusabire"],
  ["Wowe Mugenga w'inema zose", "Udusabire"],
];

const LITANY_SORROWS: [string, string][] = [
  ["Mutima wa Mariya warushye uhungisha Umwana wawe Herodi ashaka kumwica", "Udusabire"],
  ["Mutima wa Mariya washigutse umusaraba Umwana wawe yabambweho witikuye mu rwobo", "Udusabire"],
  ["Mutima wa Mariya wahuranyijwe n'inkota y'ububabare wakira umurambo w'Umwana wawe ukawushyira mu mva", "Udusabire"],
];

// ── Steps ─────────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 10;

function stepLabel(step: number): string {
  if (step === 0) return "Gutangira";
  if (step >= 1 && step <= 7) return `Ububabare bwa ${step}`;
  if (step === 8) return "Gusoza";
  return "Ibisingizo";
}

// ── Sorrow step ───────────────────────────────────────────────────────────────
// Desktop: kuzirikana left, amasengesho right — both fill the available height.
// Mobile: tab bar to switch between the two panels.

function SorrowStep({ sorrow }: { sorrow: { title: string; meditation: string } }) {
  const [tab, setTab] = useState<"kuzirikana" | "amasengesho">("kuzirikana");

  return (
    <div className="h-full flex flex-col">

      {/* Mobile tab bar */}
      <div className="md:hidden flex-shrink-0 flex border-b border-siyoni-border">
        {(["kuzirikana", "amasengesho"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 font-body text-sm font-medium transition-colors border-b-2 ${
              tab === t
                ? "text-siyoni-brown border-siyoni-ochre"
                : "text-siyoni-mid border-transparent"
            }`}
          >
            {t === "kuzirikana" ? "Kuzirikana" : "Amasengesho"}
          </button>
        ))}
      </div>

      {/* Two columns — each fills height and clips overflow internally */}
      <div className="flex-1 min-h-0 md:grid md:grid-cols-2">

        {/* Left — meditation */}
        <div className={`h-full overflow-y-auto px-6 py-5 md:border-r border-siyoni-border ${
          tab !== "kuzirikana" ? "hidden md:flex md:flex-col" : "flex flex-col"
        }`}>
          <p className="font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-2 flex-shrink-0">
            Kuzirikana
          </p>
          <h2 className="font-heading text-base font-bold text-siyoni-brown leading-snug mb-4 flex-shrink-0">
            {sorrow.title}
          </h2>
          <p className="font-body text-sm text-siyoni-brown whitespace-pre-line" style={{ lineHeight: "1.7" }}>
            {sorrow.meditation}
          </p>
        </div>

        {/* Right — prayers (compact, no cards) */}
        <div className={`h-full overflow-y-auto px-6 py-5 ${
          tab !== "amasengesho" ? "hidden md:flex md:flex-col" : "flex flex-col"
        }`}>
          <p className="font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase mb-4 flex-shrink-0">
            Amasengesho
          </p>

          {[
            { name: "Dawe uri mu Ijuru", text: PRAYERS.dawe, repeat: "Inshuro 1" },
            { name: "Ndakuramutsa Mariya", text: PRAYERS.ndakuramutsa, repeat: "Inshuro 7" },
            { name: "Mubyeyi ugira ibambe", text: PRAYERS.mubyeyi, note: "Kuyiririmba cyangwa se kuyivuga mu magambo" },
          ].map((p, i) => (
            <div key={i} className={i > 0 ? "mt-4 pt-4 border-t border-siyoni-border" : ""}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-heading text-sm font-semibold text-siyoni-brown">{p.name}</span>
                {"repeat" in p && p.repeat && (
                  <span className="font-body text-xs text-siyoni-ochre ml-3 whitespace-nowrap">{p.repeat}</span>
                )}
              </div>
              <p className="font-body text-sm text-siyoni-brown" style={{ lineHeight: "1.7" }}>{p.text}</p>
              {"note" in p && p.note && (
                <p className="font-body text-xs text-siyoni-mid italic mt-1.5">{p.note}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Non-sorrow step content (scrollable within its area) ──────────────────────

function LitanyRow({ invocation, response }: { invocation: string; response: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="font-body text-sm text-siyoni-brown leading-relaxed">{invocation}</span>
      <span className="font-body text-sm font-medium text-siyoni-ochre italic whitespace-nowrap">{response}</span>
    </div>
  );
}

function PrayerBlock({ name, text, repeat, note }: {
  name: string; text: string; repeat?: string; note?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1.5">
        <h3 className="font-heading text-sm font-semibold text-siyoni-brown">{name}</h3>
        {repeat && <span className="font-body text-xs text-siyoni-ochre ml-3 whitespace-nowrap">{repeat}</span>}
      </div>
      <div className="bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card">
        <p className="font-body text-sm text-siyoni-brown whitespace-pre-line" style={{ lineHeight: "1.7" }}>{text}</p>
        {note && <p className="font-body text-xs text-siyoni-mid italic mt-2 pt-2 border-t border-siyoni-border">{note}</p>}
      </div>
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  if (step === 0) return (
    <>
      <h2 className="font-heading text-xl font-bold text-siyoni-brown mb-5">Gutangira</h2>
      <PrayerBlock name="Ikimenyetso cy'Umusaraba" text={PRAYERS.ikimenyetso} />
      <PrayerBlock name="Intangiriro" text={PRAYERS.intangiriro} />
      <PrayerBlock name="Isengesho ryo kwicuza ibyaha" text={PRAYERS.kwicuza} />
      <PrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakuramutsa} repeat="Inshuro 3" />
      <PrayerBlock name="Mubyeyi ugira ibambe" text={PRAYERS.mubyeyi} note="Kuyiririmba cyangwa se kuyivuga mu magambo" />
    </>
  );

  if (step === 8) return (
    <>
      <h2 className="font-heading text-xl font-bold text-siyoni-brown mb-5">Gusoza</h2>
      <PrayerBlock name="Isengesho risoza" text={PRAYERS.closing} />
      <PrayerBlock name="Mutima wa Bikira Mariya" text={PRAYERS.mutimaClosure} repeat="Inshuro 3" />
    </>
  );

  // Step 9 — litany + final
  return (
    <>
      <h2 className="font-heading text-xl font-bold text-siyoni-brown mb-4">
        Ibisingizo by&apos;Umutima Utagira Inenge wa Bikira Mariya
      </h2>
      <div className="bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card mb-4">
        {LITANY_KYRIE.map(([inv, resp], i) => <LitanyRow key={`k-${i}`} invocation={inv} response={resp} />)}
      </div>
      <div className="bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card mb-4">
        {LITANY_TRINITY.map(([inv, resp], i) => <LitanyRow key={`t-${i}`} invocation={inv} response={resp} />)}
      </div>
      <div className="bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card mb-4">
        {LITANY_MAIN.map(([inv, resp], i) => <LitanyRow key={`m-${i}`} invocation={inv} response={resp} />)}
        {LITANY_SORROWS.map(([inv, resp], i) => <LitanyRow key={`s-${i}`} invocation={inv} response={resp} />)}
      </div>
      <div className="mb-4 bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card space-y-2">
        {([["Ntama w'Imana ukiza abantu ibyaha:", "Udukize Nyagasani"], ["Ntama w'Imana ukiza abantu ibyaha:", "Utwiteho Nyagasani"], ["Ntama w'Imana ukiza abantu ibyaha:", "Utubabarire."]] as [string,string][]).map(([inv, resp], i) => (
          <div key={i} className="flex items-baseline gap-2 flex-wrap">
            <span className="font-body text-sm text-siyoni-brown italic">{inv}</span>
            <span className="font-body text-sm font-medium text-siyoni-ochre italic">{resp}</span>
          </div>
        ))}
      </div>
      <div className="mb-4 bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 shadow-card flex items-baseline gap-2 flex-wrap">
        <span className="font-body text-sm text-siyoni-brown italic">Mubyeyi Mutagatifu w&apos;Imana urajye udusabira:</span>
        <span className="font-body text-sm font-medium text-siyoni-ochre italic">Tubone guhabwa ibyo Yezu Kristu yadusezeranwije</span>
      </div>
      <PrayerBlock name="Dusabe" text={PRAYERS.dusabe} />
      <PrayerBlock name="Nihasingizwe Umutima utagira inenge wa Bikira Mariya" text={PRAYERS.nihasingizwe} repeat="Inshuro 3" />
      <div className="mt-6 text-center">
        <div className="w-10 h-0.5 bg-siyoni-ochre mx-auto mb-3" />
        <p className="font-heading text-lg text-siyoni-brown">Ishapure irarangiye.</p>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IshapureUbubabareBurindwi() {
  const [step, setStep] = useState(0);
  const [dir, setDir]   = useState(1);
  const router = useRouter();

  const goNext = () => {
    if (step === TOTAL_STEPS - 1) { router.push("/rozari"); return; }
    setDir(1);
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const isSorrowStep = step >= 1 && step <= 7;

  return (
    // h-dvh = dynamic viewport height — respects mobile browser chrome
    <div className="h-dvh flex flex-col bg-siyoni-cream font-body overflow-hidden">

      {/* Imigongo strip */}
      <div className="h-8 overflow-hidden flex-shrink-0">
        <ImigongoPattern className="w-full h-full" />
      </div>

      {/* Inner container — horizontal margins so content never touches the edges */}
      <div className="flex-1 min-h-0 flex flex-col max-w-5xl mx-auto w-full px-8">

        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between py-4 border-b border-siyoni-border">
          <Link
            href="/rozari"
            className="flex items-center gap-1 font-body text-sm text-siyoni-mid hover:text-siyoni-brown transition-colors"
          >
            <ChevronLeft size={15} />
            Subira
          </Link>
          <div className="text-center">
            <p className="font-body text-[10px] font-medium text-siyoni-ochre tracking-widest uppercase">
              Ishapure y&apos;Ububabare Burindwi
            </p>
          </div>
          <span className="font-body text-xs text-siyoni-mid w-14 text-right">
            {isSorrowStep ? `${step} / 7` : ""}
          </span>
        </div>

        {/* Animated content area — fills all remaining space */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={`h-full ${isSorrowStep ? "" : "overflow-y-auto py-5"}`}
            >
              {isSorrowStep
                ? <SorrowStep sorrow={SORROWS[step - 1]} />
                : <StepContent step={step} />
              }
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div className="flex-shrink-0 flex items-center justify-between py-4 border-t border-siyoni-border">
          <button
            onClick={goPrev}
            className={`w-11 h-11 rounded-full border border-siyoni-border flex items-center justify-center transition-colors duration-200 ${
              step === 0
                ? "invisible pointer-events-none"
                : "text-siyoni-mid hover:text-siyoni-brown hover:border-siyoni-mid"
            }`}
            aria-label="Inyuma"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={goNext}
            className="w-11 h-11 rounded-full bg-siyoni-brown text-siyoni-cream flex items-center justify-center hover:bg-siyoni-mid transition-colors duration-200"
            aria-label={step === TOTAL_STEPS - 1 ? "Subira" : "Komeza"}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

      </div>
    </div>
  );
}
