// The daily Gospel reading always comes from one of the four evangelists,
// so this is a small, fixed translation rather than a full Bible book list.
const GOSPEL_NAMES_RW: Record<string, string> = {
  Matthew: "Matayo",
  Mark: "Mariko",
  Luke: "Luka",
  John: "Yohana",
};

export function translateGospelRef(ref: string): string {
  const spaceIdx = ref.indexOf(" ");
  if (spaceIdx === -1) return ref;

  const book = ref.slice(0, spaceIdx);
  const rest = ref.slice(spaceIdx + 1);
  const bookRw = GOSPEL_NAMES_RW[book];

  return bookRw ? `${bookRw} ${rest}` : ref;
}
