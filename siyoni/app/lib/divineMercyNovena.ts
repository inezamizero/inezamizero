// Content for the Novena to the Divine Mercy ("Noveni y'Impuhwe z'Imana") —
// transcribed from the user's own book photos, following St. Faustina's
// Diary. Each day is prayed as: the full Chaplet of Divine Mercy (shared
// with /rozari/impuhwe, see divineMercyPrayers.ts), then that day's specific
// intention (a Word from the Lord to Faustina, who to pray for, a prayer,
// and a closing prayer), then the Litany of Divine Mercy.

export const NOVENA_INTRO = `Yezu yantegetse kwandika no kuvuga ayo masengesho mu minsi icyenda ibanziriza umunsi mukuru w'Impuhwe (ku cyumweru cya mbere gikurikira Pasika).

"Agomba gutangirwa ku wa Gatanu mutagatifu. Muri iyo minsi yose uko ari icyenda, nzayitangamo ingabire z'amoko yose. Ndifuza ko muri iyo minsi wayobora roho zose ku isoko y'Impuhwe zanjye, kugira ngo zibone ubuyivomamo imbaraga, ubuhehere n'ingabire zose zikenera, ngo zibashe gutsinda ibizinaniza byose mu buzima, cyane cyane mu gihe cy'urupfu rwazo. Buri munsi, uzajya unzanira mu mutima wanjye roho zitari zimwe, maze uzicubize mu Nyanja y'Impuhwe zanjye. Naho jyewe, nzazinjiza mu Bwami bwa Data. Uzatunganye uwo murimo mu buzima bwawe bwose. Nanjye ntacyo nzima izo roho uzazana ku isoko y'Impuhwe zanjye. Buri munsi, ku bw'ibabara ryanjye rikabije, uzasabire izo roho inema kuri Data."

"Ndasubiza nti 'Yezu, ayo masengesho avugwa ate; muri roho zose, izo nzabanza kugeza ku Mutima wawe w'Impuhwe n'izihe?'" "Aransubiza ati 'Nzajya mbikumenyesha uko iminsi ikurikirana.'"
— Mutagatifu Maman Faustina`;

export type DivineMercyDay = {
  day: number;
  wordOfTheLord: string;
  intentionHeading: string;
  prayer: string;
  closingPrayer: string;
};

export const DIVINE_MERCY_NOVENA_DAYS: DivineMercyDay[] = [
  {
    day: 1,
    wordOfTheLord: `Uyu munsi, unzanire rubanda rwose, cyane cyane abanyabyaha, ubanyuze mu Nyanja y'Impuhwe zanjye. Bityo uraba ugabanije intimba nterwa na roho zazimiye.`,
    intentionHeading: `Dusabire isi yose Impuhwe.`,
    prayer: `Nyagasani Yezu w'Impuhwe nyinshi, urangwa no kutugirira imbabazi kandi utubabarira buri munsi. Ntiwite ku byaha byacu, ahubwo urebe icyizere tukugirira, kubera Impuhwe zawe zitabarika. Twakirire twese muri uwo mutima wawe w'Impuhwe nyinshi, nta n'umwe usubije inyuma. Tubigusabye ku bw'Urukundo ruguhuza n'Imana Data na Roho Mutagatifu.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe isi yose, cyane cyane abanyabyaha bafitiye icyizere Umutima w'Impuhwe w'Umwana wawe, Yezu Kristu. Ku bw'ibabara rye, tugaragarize Impuhwe zawe, kugirango dushobore gusingiza ububasha bwawe ubuziraherezo. Amina.`,
  },
  {
    day: 2,
    wordOfTheLord: `Uyu munsi unzanire roho zose zihaye Imana, maze uzinyuze mu Nyanja y'Impuhwe zanjye zitabarika. Izo roho zanteye imbaraga no kwihangana mu gihe cy'isamba ryanjye, kandi ni na zo miyoboro inyurwamo n'Impuhwe zanjye zikabona kwisesa kuri rubanda rwose.`,
    intentionHeading: `Dusabire abihayimana bose.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe nyinshi, wowe soko y'ibyiza byose, ongera ingabire mu mitima y'abasaserdoti bawe, ndetse n'abandi biyeguriye Imana bose, kugirango bashobore gukora neza ibikorwa by'Impuhwe, no kugira ngo bayoboreshe mugenzi wabo imvugo n'ingiro ku Mana yo mu ijuru, maze na we ayisingize biyikwiye.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe izo ntore witoreye ngo zikore mu mizabibu yawe, abasaserdoti n'abiyeguriyimana bose, maze ubasenderezeho umugisha wawe. Ku bw'ubugwaneza bw'umutima w'Umwana wawe, ubahe urumuri n'imbaraga, kugira ngo bashobore kuyobora abantu bose mu nzira y'uburokorwe, kandi bafatanye na bo gusingiza iteka Impuhwe zawe zitagira umupaka. Amen.`,
  },
  {
    day: 3,
    wordOfTheLord: `Uyu munsi, unzanire roho z'indahemuka n'izikunda gusenga, maze uyinyuze mu Nyanja y'Impuhwe zanjye. Izo roho zanteye inkunga mu nzira y'i Kalvariyo: zambereye nk'agatonyanga gahumuriza mu nyanja y'imibabaro.`,
    intentionHeading: `Dusabire Abakristu bose b'indahemuka.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe zitabarika, wowe usendereza mu bantu inema z'ubukungu bw'Impuhwe zawe, akira abakristu bose b'indahemuka mu mutima wawe w'Impuhwe, kandi ntuzahatwirukane na rimwe. Tubigusabye ku bw'urukundo rutagereranywa Umutima wawe ugirira Umubyeyi wo mu ijuru.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho z'indahemuka, zo murage w'Umwana wawe; kandi ku bw'ububabare bwe, zihe umugisha kandi uzirengere iteka ryose. Ntutume urukundo zifite, ndetse n'ubukungu bw'ukwemera kwazo gutagatifu bitakara, ahubwo zifatanye n'imitwe y'Abamarayika n'Abatagatifu kugusingiza iteka ryose. Amen.`,
  },
  {
    day: 4,
    wordOfTheLord: `Uyu munsi, unzanire abapagani n'abandi bose batari bamenya. Mu ibabara ryanjye nabo narabazirikanye. Ubutwari bwabo mu minsi yari kuzaza bwahozaga umutima wanjye. None rero, ubanyuze mu Nyanja y'Impuhwe zanjye.`,
    intentionHeading: `Dusabire abapagani n'abatemera bose.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe, wowe rumuri rw'isi, akira mu mutima wawe w'Impuhwe roho zose z'abapagani n'abatemera, ndetse n'abatarakumenya. Nibamurikirwe n'ibishashi by'ubuntu bwawe, kugira ngo bifatanye natwe kuririmba ubuziraherezo ibyiza by'Impuhwe zawe.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho z'abatakwemera bose, ndetse n'iz'abandi batarakumenya, kuko nazo ziri mu Mutima w'Impuhwe w'Umwana wawe, Nyagasani Yezu Kristu Umwami wacu. Zihe kukumenya ku bw'urumuri rw'Ivanjili yawe, bityo zimenye ukuntu umunezero wo kugukunda ari mwinshi. Zihe gusingiza igihe cyose ubuntu bw'Impuhwe zawe. Amen.`,
  },
  {
    day: 5,
    wordOfTheLord: `Uyu munsi unzanire roho z'abayobye n'abanyihakanye: uzinyuze mu Nyanja y'impuhwe zanjye. Mu gihe cy'isamba ryanjye, roho zabo nizo zanshwanyagurije umubiri n'umutima, ari byo kiliziya yanjye. Ariko iyo bongeye kwiyunga na Kiliziya, ibikomere byanjye birakira, maze ububabare bwanjye bukagabanuka.`,
    intentionHeading: `Dusabire abayobagurika mu kwemera.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe nyinshi kandi Mugwaneza, wowe utima urumuri abarugusabye bose, akira mu Mutima wawe w'Impuhwe zitabarika roho z'abayobye, abahakanye n'abandi bayobagurika mu kwemera. Kubw'Urumuri rwawe, ziyobore zifatanye n'izindi mu bumwe bwa Kiliziya yawe; ntuzitererane Nyagasani, ahubwo uzimurikire kugira ngo zisingize ubuntu b'ibyiza by'Impuhwe zawe.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho z'abanga inyigisho za Kiliziya Gatolika n'abataye iyo dini bakaba barashinze imizi mu mwijima, bityo bakaba barapfushije ubusa ingabire zawe bahawe. Nyagasani, ntiwite ku buhemu bwabo no ku bujiji bwabo, ahubwo urebe urukundo n'ibabara by'Umwana wawe, we wagusabaga akwinginga ngo "bose bunge ubumwe" (Yh 17, 21). Bahe kongera kunga ubumwe badatinze, maze bafatanye natwe kwizihiza Impuhwe zawe ubuziraherezo. Amen.`,
  },
  {
    day: 6,
    wordOfTheLord: `Uyu munsi, nzanira roho zigwa neza n'iziyoroshya, hamwe n'iz'abana batoya, maze uziyobore mu Nyanja y'Impuhwe zanjye. Izo roho nizo zisa rwose n'umutima wanjye. Ikindi kandi, ni zo zankomezaga nkihangana mu gihe cy'isamba ryanjye. Nazibonye rwose nk'abamarayika b'isi barinda altari zanjye zose. Izo roho nzazisenderezaho imigisha yanjye, kuko umutima wiyoroshya mfitiye icyizere, ari wo wonyine ushobora kwakira ingabire zanjye.`,
    intentionHeading: `Dusabire abana n'abafite umutima woroshya.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe nyinshi, wowe wavuze uti "Mundebereho, kuko ngira umutima ugwa neza kandi nkoroshya" (Mt 11,29), akira mu ngoro y'umutima wawe wiyoroshya imitima igwa neza kandi yiyoroshya, hamwe n'iy'abana batoya. Izo roho zishimisha ijuru ryose kandi zigatwikirwa n'urukundo rudasanzwe rw'Imana Data iri mu ijuru. Zimeze nk'indabyo zihumura neza ziteguye mu Bwami bw'ijuru, aho Imana yishimira iyo mpumuro y'ubutungane bwazo. Zituze igihe cyose mu Mutima wawe, zihore ziririmba igisingizo cy'Urukundo n'Impuhwe by'Imana.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho zicisha bugufi n'iziyoroshya, ndetse n'iz'abana bato, kandi zikundwa cyane n'Umwana wawe Yezu Kristu. Kubera kamere yazo, zisa cyane na Yezu Kristu ku buryo na zo zifite ububasha budasanzwe imbere y'Ubwami bw'Imana Data, "Umubyeyi w'Impuhwe zose" (2 Kor 1,3). Turagusaba rero, Mubyeyi w'Impuhwe zose, kubera urukundo ufitiye izo roho n'ibyishimo zigutera, ngo uhe umugisha isi yose, kugira ngo dushobore gusingiza ubudahwema Impuhwe zawe. Amen.`,
  },
  {
    day: 7,
    wordOfTheLord: `Uyu munsi nzanira roho zisingiza ku buryo bw'umwihariko Impuhwe zanjye. Izo roho zarushije izindi kwifatanya nanjye mu ibabara ryanjye, kandi zazirushije gucengera mu mutima wanjye. Ubu ni zo shusho nyakuri y'umutima wanjye ugira Impuhwe. Mu buzima buzaza, izo roho zizahirwa bihebuje kandi nta n'imwe izajya mu muriro w'iteka; mu gihe cyo gupfa kwazo nzaba nziri iruhande.`,
    intentionHeading: `Dusabire abubaha Impuhwe z'Imana kandi bakazamamaza hose.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe nyinshi, wowe ufite umutima w'urukundo, akira mu Mutima wawe w'Impuhwe roho zisingiza kandi zikamamaza ku buryo bw'umwihariko Impuhwe zawe zitabarika. Zahawe ububasha bw'Imana, zihora ziringiye Impuhwe zawe zirenze urugero, kandi zigakora ugushaka gutagatifu kw'Imana. Ni zo zihora zitakambira isi yose, zikayironkera umugisha n'imbabazi by'Imana iri mu ijuru. Nizikomeze umurava zatangiranye kugeza ku ndunduro, no mugihe cy'urupfu rwazo ntuzaze uzisanga nk'Umucamanza, ahubwo nk'Umukiza w'Umunyampuhwe.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho zubaha kandi zigasingiza bidasanzwe Impuhwe zawe zitagereranywa. Aho ziri mu mutima munyampuhwe w'Umwana wawe, zimeze nk'Ivanjili, ku buryo ndetse zihorana ibikorwa by'Impuhwe, kandi zigahorana ibyishimo ziririmba igisingizo cy'ikuzo ryawe. Turagusaba, Mana Nyir'imbabazi, ngo wereke izo roho Impuhwe zawe, ukurikije icyizere n'ibyiringiro bakugirira, kugirango ryuzuzwe isezerano ry'Umukiza: ko azarengera mu buzima no mugihe cy'urupfu umuntu wese uzaba yarubahirije kandi akamamaza iyobera ry'Impuhwe zawe. Amen.`,
  },
  {
    day: 8,
    wordOfTheLord: `Uyu munsi unzanire roho ziri muri Purugatori, maze uzinyuze mu Nyanja ndende y'Impuhwe zanjye, kugira ngo imivu y'amaraso yanjye ibazimirize ububabare. Izo roho zose zo muri Purugatori, iyo zinejeje ubutabera bw'Imana, nanjye ndizihirwa. Ni mwe mushobora kuzironkera agahenge mwifashishije ibikorwa byiza bya Kiliziya, indulgensiya n'ibitambo byo kwitwara. Iyaba mwari muzi umubabaro wazo, ntimwahwemye kuzifashisha amasengesho yanyu, bityo mukaba murishye umwenda zifitiye ubutabera bwanjye.`,
    intentionHeading: `Dusabire roho ziri muri Purugatori.`,
    prayer: `Nyagasani Yezu Nyir'Impuhwe nyinshi, wowe wavuze uti "Nimube abanyampuhwe" (Lk 6,36), turagusabye ngo wakire mu Mutima wawe ugira Impuhwe roho ziri mu Purugatori, kuko uzikunda kandi zikanyura ubutabera bwo mu ijuru. Imivu y'amaraso n'amazi yasohotse mu mutima wawe, nizimye indimi z'umuriro wo muri Purugatori, kugira ngo ububasha bw'Impuhwe zawe byigaragaze.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho zibabarira muri Purigatori, maze ku bw'ububabare bw'Umwana wawe no ku bw'ishavu ryari ryuzuye Umutima we Mutagatifu muri icyo gihe, ugirire Impuhwe abari imbere y'ubutabera bwawe muri iki gihe. Turagusabye ngo urebe izo roho uzirikana ibikomere by'umwana wawe ukunda cyane, kuko twizera ko ubugwaneza n'Impuhwe byawe bitagira imipaka.`,
  },
  {
    day: 9,
    wordOfTheLord: `Uyu munsi, unzanire roho z'akazuyazi, maze uyinyuze mu Nyanja y'Impuhwe zanjye. Izo roho zibabaza umutima wanjye bikabije. Mu murima w'imizeti zanteye agahinda gakabije, bituma ntakambira Data ngira nti 'Dawe, ubishatse wakwigizayo iyi nkongoro! Ariko ntibibe uko nshaka, ahubwo bibe uko ushaka' (Lk 22,42). Kuri izi roho, amizero ya nyuma ni ugutakambira Impuhwe zanjye.`,
    intentionHeading: `Dusabire roho z'akazuyazi.`,
    prayer: `Nyagasani Yezu, Nyir'Impuhwe nyinshi, Wowe Mugwaneza, akira mu Mutima wawe roho z'akazuyazi. Izo roho zikwirengagiza, n'ubwo mu by'ukuri zimeze nk'izapfuye, nyamara zota umuriro w'urukundo rwawe rusukuye. Nyagasani Yezu Nyir'ibambe, gira Impuhwe maze uzishyire mu ngoro y'urukundo rwawe, kugira ngo nizimara gususurutswa n'imbaraga nshyashya, nazo zitangire kugukorera zishyizeho umwete.`,
    closingPrayer: `Dawe, Mana ihoraho, rebana Impuhwe roho z'akazuyazi, ariko kandi zikunzwe n'Umutima w'Impuhwe w'Umwana wawe, Nyagasani Yezu Kristu. Mana Nyir'Impuhwe kandi Muhoza, turagusaba ngo ku bw'ububabare bw'Umwana wawe ukunda cyane, no ku bw'isamba rye ku musaraba ryamaze amasaha atatu, izo roho zigurumane urukundo, maze zisingize igihe cyose kandi bundi bushya ubuhangare bw'Impuhwe zawe. Amen.`,
  },
];

// Litany of Divine Mercy — every invocation shares the same response.
export const LITANY_RESPONSE = "turakwiringiye";

export const LITANY_OF_DIVINE_MERCY: string[] = [
  "wowe yobera rijimije ry'Ubutatu Butagatifu",
  "wowe ugaragza ububasha bwayo buhanitse",
  "wowe waremye Roho zo mu ijuru",
  "wowe utuvana mu busa ukadushyira mu buzima",
  "wowe ugenzura isi n'ikirere",
  "wowe uduha ubuzima bw'iteka",
  "wowe uturinda ibihano twari dukwiye",
  "wowe udukura mu makuba duterwa n'icyaha",
  "wowe wasakaye ku isi muri Jambo wigize umuntu",
  "wowe wagaragajwe by'umwihariko n'ibikomere bya Kristu",
  "wowe uva mu Mutima Mutagatifu wa Kristu",
  "wowe waduhaye Bikira Mariya Mutagatifu ngo atubere Umubyeyi w'Impuhwe zawe",
  "wowe ugaragarira muri Kiliziya y'isi yose",
  "wowe uboneka mu masakramentu matagatifu",
  "wowe usotse kandi usendereye mu isakramentu rya Batisimu n'iry'Imbabazi",
  "wowe utagira urugero mu isakramentu ry'Ubusaserdoti n'iry'Ukaristiya",
  "wowe uduhamagarira ukwemera gutagatifu",
  "wowe utuma intungane zitagatifuza",
  "wowe utagatifu imitima yuje umurava",
  "wowe mizero y'abarwayi n'imbabare",
  "wowe muhoza w'imitima ifite intimba",
  "wowe mizero y'abihebye",
  "wowe uduhora iruhande",
  "wowe utumenyesha ingabire zawe",
  "wowe mahoro y'abasamba",
  "wowe uturinda umuriro w'iteka",
  "wowe worohereza roho zo muri Purugatori",
  "wowe bwiza buhimbaza abatagatifu bose",
  "wowe banga ridahezwa ry'ukwemera",
  "wowe soko idakoma y'ibitangaza",
];

export const LITANY_VERSICLE = `Imana ni Inyampuhwe kandi ni Nyir'ibambe, itinda kurakara kandi igira urugwiro (Z 144,8).`;
export const LITANY_RESPONSE_VERSE = `Niyo mpamvu nzaririmba impuhwe za Nyagasani ubuziraherezo (Z 88,2).`;

export const LITANY_CLOSING_PRAYER = `Nyagasani Mana, wowe ugira impuhwe zihebuje, ukagira n'imbabazi zidashira, turebane ubwuzu; maze utwongeremo ibikorwa by'Impuhwe zawe; turinde kwiheba, kabone nubwo twaba mu magorwa akabije, ahubwo duharanire ugushaka kwawe gutagatifu, ko Rukundo n'Impuhwe, tubigiranye ukwizera kudahwema kwiyongera.

Tubigusabye ku bwa Nyagasani Yezu Kristu, Umwami w'Impuhwe, we ufatanya nawe na Roho Mutagatifu kutugaragariza Impuhwe iteka ryose. Amen.`;

// "Agasengesho karaswa" — the short aspiration, call and response (the
// response here is "turabiringiye", distinct from the litany's
// "turakwiringiye" above — confirmed wording from the user, not the same word).
export const SHORT_ASPIRATION_CALL = `Maraso n'amazi byavubutse mu mutima wa Yezu we Soko y'Impuhwe atugirira`;
export const SHORT_ASPIRATION_RESPONSE = `turabiringiye`;
