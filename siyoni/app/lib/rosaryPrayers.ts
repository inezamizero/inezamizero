// Shared between /rozari/bikiramariya and any other page that prays a full
// 5-decade Rosary (e.g. the Undoer of Knots novena) — kept in one place so the
// prayer texts and mystery-of-the-day logic don't drift apart between pages.

export const MYSTERIES = {
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

export type MysteryKey = keyof typeof MYSTERIES;

// Individual meditation for each of the 5 mysteries in each set.
export const MEDITATIONS: Record<MysteryKey, string[]> = {
  mishimishije: [
    "Dusabe inema yo koroshya.",
    "Dusabe inema yo gukundana.",
    "Dusabe inema yo kutita ku by 'isi.",
    "Dusabe inema yo kumvira abadutegeka.",
    "Dusabe inema yo kutiganyira kwigisha abantu.",
  ],
  ibuze: [
    "Dusabe inema yo kwanga ibyaha.",
    "Dusabe inema yo kutararikira ingeso mbi.",
    "Dusabe inema yo kutinubira ibyago.",
    "Dusabe inema yo kwemera icyo Imana idutegeka.",
    "Dusabe inema yo gukunda Yezu na Mariya.",
  ],
  yubahwa: [
    "Dusabe inema yo gutunganira Imana.",
    "Dusabe inema yo kwifuza kuzajya mw’ijuru.",
    "Dusabe inema yo gukomera mu by’Imana.",
    "Dusabe inema yo gupfa neza.",
    "Dusabe inema yo kumwizera.",
  ],
  urumuri: [
    "Dusabe inema yo gukomera ku masezerano ya Batisimu.",
    "Dusabe inema yo kubaho mu budahemuka.",
    "Dusabe inema yo kugarukira Imana.",
    "Dusabe inema yo kumurangamira no kumwumvira.",
    "Dusabe inema yo kumuhahwa neza.",
  ],
};

export function getTodaysMystery(): MysteryKey {
  const day = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
  if (day === 1 || day === 6) return "mishimishije";
  if (day === 2 || day === 5) return "ibuze";
  if (day === 3 || day === 0) return "yubahwa";
  return "urumuri";
}

// Fixed prayers used across every decade, regardless of which Rosary devotion.
export const PRAYERS = {
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

  // Hail Holy Queen (Salve Regina)
  hailHolyQueen: `Wibuke ko ntawigeze kumva ko waubije inyuma uwaje aguhungiyeho. Agutakambira ngo umurengere umusabire, ni cyo gituma nkwizera. Ndakugana nkuganyira ngo umpagararire ko ndi umunyabyaha. Mubyeyi w'umukiza ntiwirengagize ibyo nkubwira, ubyumve ubyiteho, Amen.`,

  // Closing Prayer
  closing: `Nyagasani Mana Yacu, turagusaba twe abawe, uduhe guhorana iteka roho nzima n'umubiri udafite indwara, maze kubw'amasengesho ya Mariya Mutagatifu Umubikira iteka, tubone gukira agahinda kariho kuri ubu, no kuzishima iteka mu ijuru. Kubwa yezu Kristu Umwami Wacu, Amen.`,
};
