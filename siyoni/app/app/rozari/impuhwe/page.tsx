"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Prayers (exact text from Igitabo cy'Umukristu) ────────────────────────────

const PRAYERS = {
  // Opening (optional — said before the 5 decades)
  indangakwemera: `Ndemera Imana Data ushobora byose waremye ijuru n'isi ndemera n'umwana w'ikinege Yezu Kristu wasamwe ku bwa Roho mutagatifu akabyarwa na Bikira Mariya, akababara ku ngoma ya Ponsiyo Pilato, akabambwa ku musaraba agapfa, agahambwa, akamuka ajya ikuzimu. Ku munsi wa gatatu akazuka, akajya mu ijuru akaba yicaye iburyo bw'Imana Data ishobora byose, niho azava aje gucira imanza abazima n'abapfuye. Nemera Roho Mutagatifu, na Kiliziya gatorika ntagatifu, n'ubumwe bw'abatagatifujwe, n'uko abanyabyaha babikizwa, n'uko abantu bazazuka bakazabaho iteka, Amen.`,

  dawe: `Izina ryawe ryubahwe Ingoma yawe yogere hose, icyo ushaka gikorwe mu isi nk'uko gikorwa mu ijuru. Ifunguro ridutunga uriduhe none. Utubabarire ibicumuro byacu, nk'uko natwe tubabarira abaducumuyeho. Ntudutererane mu bitwoshya, ahubwo udukize icyago, Amen.`,

  ndakuramutsa: `Wuje inema uhorana n'Imana. Wahebuje abagore bose umugisha, na Yezu umwana wabyaye arasingizwa. Mariya Mutagatifu mmubyeyi w'Imana, urajye udusabira twebwe abanyabyaha, kuri ubu, n'igihe tuzapfira, Amen.`,

  // On each large bead (x1 per decade)
  daweMana: `Dawe Mana ihoraho, ngutuye Umubiri n'Amaraso, Roho n'Ubumana by'Umwana wawe ukunda cyane, Umwami wacu Yezu Kristu, ngira ngo mpongerere ibyaha byacu n'iby'isi yose.`,

  // On each small bead (x10 per decade)
  kubwububabare: `Kubw'ububabare bwe bukabije, tugirire impuhwe kandi uzigirire n'isi yose.`,

  // Closing — said 3 times
  manaNyir: `Mana Nyir'ubutagatifu, Mana y'imbaraga, Mana ihoraho, tugirire impuhwe.`,

  // Fatima prayer
  fatima: `Yezu wacu, tubabarire ibyaha byacu kandi uturinde umuriro w'iteka, igarurire roho z'abantu bose kandi uziyobore inzira y'ijuru, cyane cyane wite ku bakeneye impuhwe zawe.`,

  // Optional addition after Fatima
  purugatori: `Maze ubabarire roho ziri muri purugatori n'abanyabyaha b'isi yose.`,
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
  repeat?: string;
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
      </div>
    </div>
  );
}

function BeadLabel({ text }: { text: string }) {
  return (
    <div className="mb-4 px-4 py-2 bg-siyoni-card border border-siyoni-ochre/30 rounded-card">
      <p className="font-body text-xs font-medium text-siyoni-ochre tracking-widest uppercase">
        {text}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const DECADES = ["Icya Mbere", "Icya Kabiri", "Icya Gatatu", "Icya Kane", "Icya Gatanu"];

export default function IshapureImpuhwe() {
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
            Ishapure y'Impuhwe z'Imana
          </h1>
          <p className="font-body text-sm text-siyoni-mid mb-10">
            Ivugwa nk'ishapure isanzwe, uretse ko amasengesho yihariye avuganwa aho "Dawe uri mu ijuru" na "Ndakuramutsa Mariya" bavugwa.
          </p>

          {/* ── Gutangira (optional) ────────────────────────────────────────── */}
          <SectionHeader title="Gutangira (Bishobora)" />
          <PrayerBlock name="Indangakwemera" text={PRAYERS.indangakwemera} />
          <PrayerBlock name="Dawe Uri mu Ijuru" text={PRAYERS.dawe} />
          <PrayerBlock name="Ndakuramutsa Mariya" text={PRAYERS.ndakuramutsa} repeat="Inshuro 3" />

          {/* ── 5 Decades ──────────────────────────────────────────────────── */}
          {DECADES.map((label, i) => (
            <div key={i}>
              <SectionHeader title={`Igice ${label}`} />
              <BeadLabel text="Ibuye rinini — inshuro imwe" />
              <PrayerBlock name="Dawe Mana Ihoraho" text={PRAYERS.daweMana} />
              <BeadLabel text="Ibuye rito — inshuro icumi" />
              <PrayerBlock
                name="Kubw'Ububabare Bwe"
                text={PRAYERS.kubwububabare}
                repeat="Inshuro 10"
              />
            </div>
          ))}

          {/* ── Gusoza ─────────────────────────────────────────────────────── */}
          <SectionHeader title="Gusoza" />
          <PrayerBlock
            name="Mana Nyir'Ubutagatifu"
            text={PRAYERS.manaNyir}
            repeat="Inshuro 3"
          />
          <PrayerBlock name="Isengesho ry'i Fatima" text={PRAYERS.fatima} />

          <div className="mt-10 text-center">
            <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-4" />
            <p className="font-heading text-xl text-siyoni-brown">
              Ishapure irarangiye. 🙏
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
