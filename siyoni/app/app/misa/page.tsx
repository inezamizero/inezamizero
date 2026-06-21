"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// ── Date helpers ──────────────────────────────────────────────────────────────

const MONTHS_RW = [
  "Mutarama", "Gashyantare", "Werurwe", "Mata",
  "Gicurasi", "Kamena", "Nyakanga", "Kanama",
  "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza",
];

const DAYS_RW = [
  "Ku cyumweru", "Kuwa mbere", "Kuwa kabiri",
  "Kuwa gatatu", "Kuwa kane", "Kuwa gatanu", "Kuwa gatandatu",
];

function formatDateRw(date: Date): string {
  return `${DAYS_RW[date.getDay()]}, ${date.getDate()} ${MONTHS_RW[date.getMonth()]} ${date.getFullYear()}`;
}

// ── Liturgical season calculator ──────────────────────────────────────────────

function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const dow = christmas.getDay();
  const daysBack = dow === 0 ? 7 : dow;
  const fourthSunday = new Date(year, 11, 25 - daysBack);
  return addDays(fourthSunday, -21);
}

type Season = {
  nameRw: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  topLine: string;
};

const SEASONS: Record<string, Season> = {
  ordinary:  { nameRw: "Igihe gisanzwe", accent: "#2D6A4F", badgeBg: "#EBF4EF", badgeText: "#2D6A4F", topLine: "bg-[#2D6A4F]" },
  advent:    { nameRw: "Agatasi",         accent: "#4A235A", badgeBg: "#F0EBF4", badgeText: "#4A235A", topLine: "bg-[#4A235A]" },
  christmas: { nameRw: "Noheli",          accent: "#8B6914", badgeBg: "#F8F2E2", badgeText: "#8B6914", topLine: "bg-[#C9A235]" },
  lent:      { nameRw: "Igisibo",         accent: "#3B1F5E", badgeBg: "#EEE9F5", badgeText: "#3B1F5E", topLine: "bg-[#3B1F5E]" },
  holyweek:  { nameRw: "Icyumweru Cyera", accent: "#7A0C2E", badgeBg: "#F5E8EC", badgeText: "#7A0C2E", topLine: "bg-[#7A0C2E]" },
  easter:    { nameRw: "Pasika",          accent: "#8B6914", badgeBg: "#F8F2E2", badgeText: "#8B6914", topLine: "bg-[#D4A017]" },
  pentecost: { nameRw: "Ipentekosite",    accent: "#8B1A1A", badgeBg: "#F5EBEB", badgeText: "#8B1A1A", topLine: "bg-[#B22222]" },
};

function getLiturgicalSeason(date: Date): Season {
  const year = date.getFullYear();
  const d = date.getTime();
  const easter = getEaster(year);
  const ashWed = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const pentecost = addDays(easter, 49);
  const adventStart = getAdventStart(year);
  const christmas = new Date(year, 11, 25);
  const christmasEnd = new Date(year, 0, 13);
  const prevChristmas = new Date(year - 1, 11, 25);

  if (d >= prevChristmas.getTime() && d < christmasEnd.getTime()) return SEASONS.christmas;
  if (d >= adventStart.getTime() && d < christmas.getTime()) return SEASONS.advent;
  if (d >= christmas.getTime()) return SEASONS.christmas;
  if (d >= palmSunday.getTime() && d < easter.getTime()) return SEASONS.holyweek;
  if (d >= ashWed.getTime() && d < palmSunday.getTime()) return SEASONS.lent;
  if (d >= pentecost.getTime() && d < addDays(pentecost, 1).getTime()) return SEASONS.pentecost;
  if (d >= easter.getTime() && d < pentecost.getTime()) return SEASONS.easter;
  return SEASONS.ordinary;
}

// ── Reading placeholders ──────────────────────────────────────────────────────

const READINGS = [
  {
    label: "Isomo rya mbere",
    ref: "[PLACEHOLDER — e.g. Iz 6:1-8]",
    text: "[PLACEHOLDER — shyiramo hano isomo rya mbere ry'uyu munsi]",
  },
  {
    label: "Zaburi yo gusubiza",
    ref: "[PLACEHOLDER — e.g. Zb 138]",
    text: "[PLACEHOLDER — shyiramo hano zaburi yo gusubiza]",
  },
  {
    label: "Isomo rya kabiri",
    ref: "[PLACEHOLDER — e.g. Rm 5:1-5]",
    text: "[PLACEHOLDER — shyiramo hano isomo rya kabiri (Ku cyumweru gusa)]",
  },
  {
    label: "Ubutumwa bwiza",
    ref: "[PLACEHOLDER — e.g. Lk 3:15-22]",
    text: "[PLACEHOLDER — shyiramo hano ubutumwa bwiza bw'uyu munsi]",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function MisaPage() {
  const today = new Date();
  const season = getLiturgicalSeason(today);
  const dateLabel = formatDateRw(today);

  // Video state: loading → found (videoId) | not-yet (uploaded later today) | error
  const [videoId, setVideoId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/pacistv")
      .then((r) => r.json())
      .then((data) => setVideoId(data.videoId ?? null))
      .catch(() => setVideoId(null));
  }, []);

  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />

      {/* Thin seasonal color line — the only place the full season color appears */}
      <div className={`h-1 w-full ${season.topLine} opacity-60`} />

      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors"
        >
          ← Subira ahabanza
        </Link>

        {/* ── Section 1: Date, season, saint ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          className="mb-10"
        >
          <p className="font-body text-sm text-siyoni-mid mb-1">{dateLabel}</p>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1 className="font-heading text-4xl font-bold text-siyoni-brown">
              Misa y'Umunsi
            </h1>
            <span
              className="inline-block font-body text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: season.badgeBg, color: season.badgeText }}
            >
              {season.nameRw}
            </span>
          </div>

          {/* Saint of the day */}
          <div className="bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-5">
            <p
              className="font-body text-xs font-medium tracking-widest uppercase mb-2"
              style={{ color: season.accent }}
            >
              Umutagatifu w'uyu munsi
            </p>
            <p className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
              [PLACEHOLDER — Izina ry'umutagatifu]
            </p>
            <p className="font-body text-sm text-siyoni-mid">
              [PLACEHOLDER — Amateka make y'umutagatifu w'uyu munsi]
            </p>
          </div>
        </motion.div>

        {/* ── Section 2: Pacis TV ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          className="mb-10"
        >
          <h2 className="font-heading text-2xl font-semibold text-siyoni-brown mb-4">
            Misa kuri Pacis TV
          </h2>

          <div className="bg-siyoni-card border border-siyoni-border rounded-card shadow-card overflow-hidden">
            {videoId === undefined && (
              // Loading state
              <div className="flex items-center justify-center h-48">
                <p className="font-body text-sm text-siyoni-mid">Gushakisha amashusho...</p>
              </div>
            )}

            {videoId === null && (
              // Not found — either not uploaded yet or no match
              <div className="flex flex-col items-center justify-center gap-3 h-48 px-6 text-center">
                <p className="font-body text-sm text-siyoni-mid">
                  Misa y'uyu munsi ntiyashyizweho kuri YouTube. Subira nyuma cyangwa reba channel ya Pacis TV.
                </p>
                <a
                  href="https://www.youtube.com/@PacisTv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-siyoni-brown border border-siyoni-border rounded-card px-4 py-2 hover:border-siyoni-brown transition-colors"
                >
                  Reba Pacis TV kuri YouTube
                  <ExternalLink size={13} />
                </a>
              </div>
            )}

            {videoId && (
              // Video found — embed using youtube-nocookie.com for privacy
              <>
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="Misa y'Umunsi — Pacis TV"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-body text-sm text-siyoni-mid">Pacis TV — Regina Pacis Remera</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-siyoni-brown hover:text-siyoni-mid transition-colors"
                  >
                    Fungura kuri YouTube
                    <ExternalLink size={13} />
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ── Section 3: Readings ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-semibold text-siyoni-brown">
              Amasomo y'uyu munsi
            </h2>
            <span className="font-body text-xs text-siyoni-mid bg-siyoni-border/50 px-3 py-1 rounded-full">
              Phase 3
            </span>
          </div>

          <p className="font-body text-sm text-siyoni-mid mb-6">
            Amasomo azabonahana iyo twunganye API y'Itorero Gatorika.
          </p>

          <div className="flex flex-col gap-4">
            {READINGS.map((reading, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" as const }}
                className="bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-5"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <p
                    className="font-body text-xs font-medium tracking-widest uppercase"
                    style={{ color: season.accent }}
                  >
                    {reading.label}
                  </p>
                  <p className="font-body text-xs text-siyoni-mid ml-4">{reading.ref}</p>
                </div>
                <p className="prayer-text text-siyoni-brown">{reading.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
