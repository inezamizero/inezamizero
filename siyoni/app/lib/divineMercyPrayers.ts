// Shared between /rozari/impuhwe (the standalone Chaplet) and the Divine
// Mercy Novena (/novena/impuhwe) — the Chaplet is prayed in full as part of
// every day of the novena, so its text lives here once rather than twice.
// The Creed / Our Father / Hail Mary that open the Chaplet are the same
// prayers used everywhere else on the site — pull those from rosaryPrayers.ts
// (PRAYERS.imigenzo / DaweUriMuIjuru / ndakwibuka) instead of duplicating them.

export const DECADES = ["Icya Mbere", "Icya Kabiri", "Icya Gatatu", "Icya Kane", "Icya Gatanu"];

export const CHAPLET_PRAYERS = {
  // Eternal Father, I offer You... (prayed once per decade, on the large bead)
  daweMana: `Dawe Mana ihoraho, ngutuye Umubiri n'Amaraso, Roho n'Ubumana by'Umwana wawe ukunda cyane, Umwami wacu Yezu Kristu, ngira ngo mpongerere ibyaha byacu n'iby'isi yose.`,

  // For the sake of His sorrowful Passion... (prayed 10x per decade, on the small beads)
  kubwububabare: `Kubw'ububabare bwe bukabije, tugirire impuhwe kandi uzigirire n'isi yose.`,

  // Holy God, Holy Mighty One, Holy Immortal One... (closing, prayed 3x)
  manaNyir: `Mana Nyir'ubutagatifu, Mana y'imbaraga, Mana ihoraho, tugirire impuhwe.`,
};
