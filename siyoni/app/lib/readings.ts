// English book names as keys, matching the exact strings the Catholic Readings API
// returns (verified against a full year of live data — not guessed). Kinyarwanda
// values are a first-pass attempt, not verified against a physical Kinyarwanda Bible —
// treat every entry as needing a human check, not just the empty ones.
const BOOK_NAMES_RW: Record<string, string> = {
  // Old Testament
  "Genesis": "Itangiriro",
  "Exodus": "Kuva",
  "Leviticus": "Abalewi",
  "Numbers": "Kubara",
  "Deuteronomy": "Gutegeka kwa Kabiri",
  "Joshua": "Yosuwa",
  "Judges": "Abacamanza",
  "Ruth": "Rusi",
  "1 Samuel": "1 Samweli",
  "2 Samuel": "2 Samweli",
  "1 Kings": "1 Abami",
  "2 Kings": "2 Abami",
  "1 Chronicles": "1 Ngoma",
  "2 Chronicles": "2 Ngoma",
  "Ezra": "Ezira",
  "Nehemiah": "Nehemiya",
  "Tobit": "Tobiti",
  "Judith": "Yuditi",
  "Esther": "Esiteri",
  "1 Maccabees": "1 Macabayo",
  "2 Maccabees": "2 Macabayo",
  "Job": "Yobu",
  "Psalm": "Zaburi",
  "Proverbs": "Imigani",
  "Ecclesiastes": "Umubwiriza",
  "Song of Songs": "Indirimbo ry'Indirimbo",
  "Wisdom": "Ubwenge",
  "Sirach": "Sira",
  "Isaiah": "Izaya",
  "Jeremiah": "Yeremiya",
  "Lamentations": "Amaganya",
  "Baruch": "Baruki",
  "Ezekiel": "Ezekiyeli",
  "Daniel": "Daniyeli",
  "Hosea": "Hoseya",
  "Joel": "Yoweli",
  "Amos": "Amosi",
  "Obadiah": "Obadiya",
  "Jonah": "Yona",
  "Micah": "Mika",
  "Nahum": "Nahumu",
  "Habakkuk": "Habakuki",
  "Zephaniah": "Zefaniya",
  "Haggai": "Hagayi",
  "Zechariah": "Zekariya",
  "Malachi": "Malaki",

  // New Testament
  "Matthew": "Matayo",
  "Mark": "Mariko",
  "Luke": "Luka",
  "John": "Yohana",
  "Acts": "Ibyakozwe n'Intumwa",
  "Romans": "Abaroma",
  "1 Corinthians": "1 Abakorinto",
  "2 Corinthians": "2 Abakorinto",
  "Galatians": "Abagalatiya",
  "Ephesians": "Abefeso",
  "Philippians": "Abafilipi",
  "Phiippians": "Abafilipi", // typo present in the upstream API data — mapped defensively so it doesn't silently fall through
  "Colossians": "Abakolosayi",
  "1 Thessalonians": "1 Abatesalonike",
  "2 Thessalonians": "2 Abatesalonike",
  "1 Timothy": "1 Timoteyo",
  "2 Timothy": "2 Timoteyo",
  "Titus": "Tito",
  "Philemon": "Filemoni",
  "Hebrews": "Abaheburayo",
  "James": "Yakobo",
  "1 Peter": "1 Petero",
  "2 Peter": "2 Petero",
  "1 John": "1 Yohana",
  "2 John": "2 Yohana",
  "3 John": "3 Yohana",
  "Jude": "Yuda",
  "Revelation": "Ibyahishuwe",
};

export function translateBibleRef(ref: string): string {
  const spaceIdx = ref.indexOf(" ");
  if (spaceIdx === -1) return ref;

  const book = ref.slice(0, spaceIdx);
  const rest = ref.slice(spaceIdx + 1);
  const bookRw = BOOK_NAMES_RW[book];

  return bookRw ? `${bookRw} ${rest}` : ref;
}
