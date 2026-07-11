// Content for the Novena to Mary, Undoer of Knots — sourced directly from the
// user's own text. {{PFUNDO}} marks exactly where the personal "knot" (the
// intention someone types in) is woven into the prayer, matching the blank in
// the original. Any other stray "……" in the source (e.g. Day 3's second blank,
// which names people to forgive rather than the knot) is left as-is on purpose.

export const HOW_TO_PRAY = [
  "Gukora ikimenyetso cy'umusaraba",
  "Kuvuga isengesho ryo kwicuza ibyaha, gusaba imbabazi, cyane cyane gufata icyemezo cyo kutongera kubisubira",
  "Kuvuga amadizeni 3 ya mbere y'ishapure",
  "Gusoma igisabisho cy'umunsi (buri munsi ufite isengesho ryawo, guhera ku munsi wa mbere kugeza kuwa cyenda)",
  "Kuvuga amadizeni abiri akurikira (igice cy'ishapure gisigaye)",
  "Kurangiza uvuga isengesho rya Mariya upfundura amapfundo",
  "Gukora ikimenyetso cy'umusaraba",
];

export const HOW_TO_PRAY_NOTE =
  "Kuri buri pfundo ry'ubuzima bwacu, dukora noveni imwe — buri pfundo rero rigomba gukorerwa noveni ukwaryo!";

export const CANDLE_NOTE = "Ubishoboye ucana bougie ihawe umugisha.";

export const ACT_OF_CONTRITION = `Mana yanjye, ndicuza cyane ko nagucumuyeho, kubera ubwiza bwawe n'uburyo wanga icyaha. Mfashe icyemezo cyo kutongera kugucumuraho no kwisubiraho mbifashijwe n'inema zawe.`;

// Prayed as the closing step every day of the novena.
export const KNOT_PRAYER = `Mariya mubyeyi w'isugi, mubyeyi w'urukundo rwiza, Mubyeyi utarigeze utererana umwana umwitabaje, Mubyeyi ibiganza bikora ubutitsa bikorera abana bawe ukunda cyane, ibiganza byawe bikoreshwa n'urukundo rw'Imana hamwe n'impuhwe zidashira zisendereye umutima wawe, hindukira unyerekezeho amaso yawe yuzuye impuhwe n'urukundo. Reba isanduku y'amapfundo apfukiranye ubuzima bwanjye. Uzi ukwiheba kwanjye, n'ububabare mfite. Uzi uburyo iri pfundo rinziritse. Mariya, Mubyeyi Imana yashinze gupfundura amapfundo yo mu buzima bw'abana bawe, nkuhereje umugozi w'amapfundo yo mu buzima bwanjye mu biganza byawe. Nta numwe yawe na sekibi, wabasha gukura uwo mugozi mu biganza byawe byuzuye impuhwe. Mu biganza byawe, nta pfundo na rimwe ridashobora gupfundurwa. Mubyeyi ufite ububasha, kubera inema zawe nyinshi, no kubera ububasha bwabwe bw'umuvugizi iruhande rw'umwana wawe Yezu, umucungunzi wanjye, akira uyu munsi iri pfundo {{PFUNDO}}. Kugirango Imana Iheshwe Ikuzo ngusabyae kuripfundura, kandi ukaripfundura kuri ubu n'iteka ryose.

Ndakwiringiye. Ni wowe wenyine muhoza Imana yampaye, ni wowe ukomeza imbaraga zanjye zijegajega, ni wowe mukiro w'ubukene bwanjye ni wowe unkura mu bimbuza byose kugumana na Kristu. Umva uguhamagara kwanjye, menya, undagire kandi undinde. Uri ubuhungiro bwanjye butajegajega. „Mariya upfundura amapfundo", unsabire.`;

export type NovenaDay = {
  day: number;
  text: string;
  quote?: string;
};

export const NOVENA_DAYS: NovenaDay[] = [
  {
    day: 1,
    text: `Mubyeyi mutagatifu nkunda cyane, Mariya mutagatifu, wowe upfundura amapfundo abuza ubuhumekero abana bawe, ndamburira ibiganza byawe byuzuye impuhwe. Nguhereje uyu munsi iri pfundo {{PFUNDO}}, hamwe n'ibibi byose biriturukaho byuzuye mu buzima bwanjye. Nguhaye iri pfundo rimbuza amahoro, rikantera kubabara kandi rikambuza rwose, kwifatanya nawe hamwe n'umwana wawe Yezu, umukiza wanjye. Nje ngutakambira „Mariya upfundura amapfundo", kuko nkwizeye kandi nkaba nzi yuko utigeze utererana umwana w'umunyabyaha ugutakambira ngo umufashe. Nemera ko ushobora gupfundura iri pfundo kuko Yezu aguha ububasha bwose. Nizeye ko uzemera gupfundura iri pfundo kubera ko uri umubyeyi wanjye. Nzi yuko uzabikora kuko unkunda urukundo rumwe nk'urw'Imana: Urakoze Mubyeyi wanjye nkunda cyane. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Ushakisha inema azazikura mu biganza bya Mariya.",
  },
  {
    day: 2,
    text: `Mariya, mubyeyi nkunda cyane, soko y'ingabire zose, umutima wanjye nywukwerekejeho uyu munsi. Nemeye ko ndi umunyabyaha, kandi ko nkeneye ko umfasha. Kubera ukwikunda kwanjye, inzika zanjye, kutagira ubuntu kwanjye no kwibona kwanjye, nasuzuguye kenshi ingabire undonkera. „Mariya upfundura amapfundo", Ndagarutse uyu munsi, kugirango unsabire ku mwana wawe Yezu ubutungane bw'umutima, kumvira, gucisha bugufi no kwizera. Uno munsi ndawubaho mu butungane bw'umutima, kumvira, gucisha bugufi no kwizera. Ndabikora mbigutura nk'ikimenyetse cy'urukundo ngufitiye. Nongeye kuguhereza mu biganza byawe iri pfundo {{PFUNDO}}, rimbuza kugaragaza ikuzo ry'Imana. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Mariya yaturaga Imana buri kanya k'umunsi we.",
  },
  {
    day: 3,
    text: `Mubyeyi muvugizi, mwamikazi w'ijuru, Wowe ibiganza byawe byakira kandi bigatanga ubukire bwose bw'umwami, nyerekezaho amaso yawe yuzuye impuhwe. Nkushyize mu biganza iri pfundo ryo mu buzima bwanjye {{PFUNDO}}. Inzika zose, n'imyifatire yose ritera mu buzima bwanjye. Ngusabye imbabazi, Mana Data, kubera amakosa yanjye. Mfasha kubabarira abantu bose bateye ku bushake cyangwa batabishaka iri pfundo. Ni mu bwitange bwanjye uzabasha kuripfundura: Imbere yawe, Mubyeyi nkunda, no mu izina ry'umwana wawe Yezu umukiza wanjye, wababajwe cyane kandi akamenya kubabarira, mbabariye aba bantu………. nanjye kandi ndibabariye, ubu n'iteka ryose. Urakoze, „Mariya upfundura amapfundo", gupfundura mu mutima wanjye ipfundo ry'inzika, hamwe n'iri ipfundo nguherejke ubu. Amina. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Ushaka ingabire wese yegera Bikira Mariya.",
  },
  {
    day: 4,
    text: `Mariya mutagatifu mukundwa, wowe wakira abagushaka bose, ngirira impuhwe. Nguhereje mu biganza byawe iri pfundo {{PFUNDO}} rimbuza kugira amahoro, rikagagaza roho yanjye, rikambuza kugera ku Mana yanjye no kuyikorera mu buzima bwanjye. Pfundura iri pfundo riri mu buzima bwanjye, ndakutakambiye mubyeyi wanjye. Unsabire kuri Yezu ankirize ukwemera kwanjye kugagazwa n'amabuye yo muri uru rugendo, Gendana nanjye, mubyeyi nkunda, kugirango nige ko ayo mabuye ahubwo ari inshutu zanjye, ndeke guhora nitotomba kandi nige gushima Imana buri kanya k'ubuzima bwanjye, no guhora nseka nishimye nzi neza ko niringye byuzuye ububasha bwawe. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Mariya ni izuba, kandi isi yose yota ku mirasire y'ubushyuhe bwaryo.",
  },
  {
    day: 5,
    text: `Mubyeyi upfundura amapfundo, ugira ubuntu kandi ukaba usendereye impuhwe, nje nkugana kugirango nongere kandi na none kuguhereza mu biganza byawe iri pfundo {{PFUNDO}}. Ndagusaba, ubuhanga n'ubushishozi buturutse ku Mana kugirango nkoreshwe n'urumuri rwa Roho mutagatifu maze mbashe gutsinda ingorane zose. Nta numwe wigeze akubona urakaye ahubwo amagambo yawe ahora yuzuye iteka imbabazi n'urukundo bigatuma ubonekamo umutima w'Imana. Nkiza ubugome, umujinya, n'urwango iri pfundo ryazanye mu buzima bwanjye. Mubyeyi nkunda cyane, mpa ukwihangana nk'ukwawe, ubuhanga n'ubushishozi nk'ubwawe, kandi umpe kwiga gutekereza kuri byose mu bwitonzi mu mutima wanjye. Maze nk'uko wabigize ku munsi Roho mutagatifu yamanukiye mu mitima y'intumwa, unsabire kuri Yezu kugirango nuzure bundi bushya mu buzima bwanjye Roho Mutagatifu. Roho Mutagatifu, manukira kuri jye. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Mariya akize mu bubasha iruhande rw'Imana.",
  },
  {
    day: 6,
    text: `Mwamikazi w'impuhwe, nongeye kuguhereza iri pfundo {{PFUNDO}} ry'ubuzima bwanjye, kandi ngusabye umutima uzi kwihangana igihe ugipfundura iri pfundo. Nyigisha kwihangana numva ijambo ry'umwana wawe, kwihana, no kwakira Yezu kandi ugumane nanjye. Tegura umutima wanjye kugirango uzahimbazanye n'abamarayika ingabire urimo kundonkera ubu. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Uri mwiza uri umuziranege Mariya, nta bwandu na bumwe bwigeza bugukora.",
  },
  {
    day: 7,
    text: `Mubyeyi mutagatifu rwose, nje nkugana uyu munsi, ndagutakambiye ngo upfundure iri pfundo {{PFUNDO}} mu buzima bwanjye kandi unkize imitego yose ya sekibi. Imana yaguhaye ububasha bunini kuri sekibi yose. Kuva ubu nanze sekibi, n'ibyo twagiye duhuriraho byose. Ndanguruye ijwi mvuga ko Yezu ari we mukiza wanjye wenyine, Umwami wanjye kandi Imana yanjye yonyine. „Mariya upfundura amapfundo" ndagusabye, honyora umutwe wa sekibi. Shwanyaguza imitego yatumye iri pfundo rivuka mu buzima bwanjye. Urakoze Mubyeyi nkunda cyane. Mana nyoza kandi umbohore na maraso yawe! „Mariya upfundura amapfundo", unsabire.`,
    quote: "Uri ikuzo rya Isilayeli, uri icyubahiro cy'umuryango wa Isilayeli.",
  },
  {
    day: 8,
    text: `Mubyeyi w'Imana, Mubyeyi w'isugi, wowe usendereye impuhwe, girira impuhwe umwana wawe upfundure iri pfundo {{PFUNDO}} mu buzima bwanjye. Nkeneye ko unsura nk'uko wasuye Elisabeti. Unzanire Yezu kugirango anzanire Roho Mutagatifu. Nyigisha gukora ibikorwa by'ubutwari, ibyishimo, gucisha bugufi, kwemera, kandi nka Elisabeti undonkere kuzura Roho mutagatifu. Ndashaka ko umbera mama, umwamikazi n'inshuti. Nguhaye umutima wanjye, n'ibyange byose: urugo rwanjye, umuryango wanjye, ibyange byose ibyo mfite muri jye n'ibitandiho. Ndi uwawe ubu n'iteka ryose. Nshyiramo umutima wawe kugirango mbashe gukora ibyo Yezu ansaba byose gukora. „Mariya upfundura amapfundo", unsabire.`,
    quote: "Tugende, twuzuye ukwemera, tugane intebe y'ingabire.",
  },
  {
    day: 9,
    text: `Mubyeyi Mutagatifu rwose, muvugizi wacu, wowe upfundura amapfundo, nje uyu munsi kugushimira ko wemeye gupfundura iri pfundo {{PFUNDO}} mu buzima bwanjye. Uzi imibabaro rintera. Urakoze mubyeyi mama wanjye kumisha amarira yanjye mu mpuhwe zawe. Urakoze kunyakira mu maboko yawe no kumfasha kwakira indi ngabire y'Imana. „Mariya upfundura amapfundo", Mubyeyi wanjye nkunda rwose, ndagushimira ko upfundura amapfundo yo mu buzima bwanjye. Mfubika mu gishura cy'urukundo rwawe, ngumana undinde, murikira n'amahoro yawe. „Mariya upfundura amapfundo", udusabire.`,
  },
];

export function fillKnot(template: string, knot: string): string {
  const filled = knot.trim() ? `„${knot.trim()}“` : "riri mu mutima wanjye";
  return template.replaceAll("{{PFUNDO}}", filled);
}
