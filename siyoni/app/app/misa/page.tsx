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
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
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
  return addDays(new Date(year, 11, 25 - daysBack), -21);
}

type Season = {
  nameRw: string;
  accent: string;       // full season color — for badges and small accents
  pageBg: string;       // very light tint — used as the page background
  topLine: string;      // Tailwind class for the 2px line
  badgeText: string;
};

// pageBg is a very desaturated, light tint of the season color.
// Visible enough to notice, not bold enough to fight the text.
const SEASONS: Record<string, Season> = {
  ordinary:  { nameRw: "Igihe gisanzwe", accent: "#2D6A4F", pageBg: "#C8E2D5", topLine: "bg-[#2D6A4F]", badgeText: "#2D6A4F" },
  advent:    { nameRw: "Agatasi",         accent: "#4A235A", pageBg: "#CDBFDA", topLine: "bg-[#4A235A]", badgeText: "#4A235A" },
  christmas: { nameRw: "Noheli",          accent: "#8B6914", pageBg: "#DDD0A0", topLine: "bg-[#C9A235]", badgeText: "#8B6914" },
  lent:      { nameRw: "Igisibo",         accent: "#3B1F5E", pageBg: "#C9BBDA", topLine: "bg-[#3B1F5E]", badgeText: "#3B1F5E" },
  holyweek:  { nameRw: "Icyumweru Cyera", accent: "#7A0C2E", pageBg: "#D9B0BC", topLine: "bg-[#7A0C2E]", badgeText: "#7A0C2E" },
  easter:    { nameRw: "Pasika",          accent: "#8B6914", pageBg: "#DDD0A0", topLine: "bg-[#D4A017]", badgeText: "#8B6914" },
  pentecost: { nameRw: "Ipentekosite",    accent: "#8B1A1A", pageBg: "#D9AEAC", topLine: "bg-[#B22222]", badgeText: "#8B1A1A" },
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

// ── Readings placeholders ─────────────────────────────────────────────────────

const READINGS = [
  { label: "Isomo rya mbere",      ref: "[PLACEHOLDER — e.g. Iz 6:1-8]",  text: "[PLACEHOLDER — isomo rya mbere ry'uyu munsi]" },
  { label: "Zaburi yo gusubiza",   ref: "[PLACEHOLDER — e.g. Zb 138]",    text: "[PLACEHOLDER — zaburi yo gusubiza]" },
  { label: "Isomo rya kabiri",     ref: "[PLACEHOLDER — e.g. Rm 5:1-5]",  text: "[PLACEHOLDER — isomo rya kabiri (Ku cyumweru gusa)]" },
  { label: "Ubutumwa bwiza",       ref: "[PLACEHOLDER — e.g. Lk 3:15-22]",text: "[PLACEHOLDER — ubutumwa bwiza bw'uyu munsi]" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MisaPage() {
  const today = new Date();
  const season = getLiturgicalSeason(today);
  const dateLabel = formatDateRw(today);

  const [videoId, setVideoId] = useState<string | null | undefined>(undefined);
  const [saintName, setSaintName] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    // Pacis TV morning mass
    fetch("/api/pacistv")
      .then((r) => r.json())
      .then((data) => setVideoId(data.videoId ?? null))
      .catch(() => setVideoId(null));

    // Saint of the day — fetched via our own server route to avoid CORS
    fetch("/api/saint")
      .then((r) => r.json())
      .then((data) => setSaintName(data.name ?? null))
      .catch(() => setSaintName(null));
  }, []);

  return (
    // Seasonal background — very light tint, changes each liturgical season
    <div className="min-h-screen font-body pb-20 md:pb-0" style={{ backgroundColor: season.pageBg }}>
      <Navbar />

      {/* Thin season color line at the very top */}
      <div className={`h-1 w-full ${season.topLine} opacity-70`} />

      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      {/* ── TOP INFO — season badge, then date, then saint ──────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" as const }}
        className="max-w-5xl mx-auto px-4 pt-4 pb-2"
      >
        {/* Season badge — top */}
        <span
          className="inline-block font-body text-xs font-medium px-2.5 py-1 rounded-full mb-2"
          style={{ backgroundColor: season.accent + "22", color: season.accent }}
        >
          {season.nameRw}
        </span>

        {/* Date — its own line, heading font */}
        <p className="font-heading text-2xl font-semibold text-siyoni-brown leading-snug">
          {dateLabel}
        </p>

        {/* Saint — below date, accent color */}
        {saintName && (
          <p className="font-heading text-lg font-medium mt-0.5" style={{ color: season.accent }}>
            {saintName}
          </p>
        )}
      </motion.div>

      {/* ── VIDEO — large, fills most of the width ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="w-full max-w-5xl mx-auto px-4 pt-6 pb-4"
      >
        <div className="rounded-card overflow-hidden shadow-card-hover border border-siyoni-border">
          {videoId === undefined && (
            <div className="flex items-center justify-center bg-siyoni-card" style={{ aspectRatio: "16/9" }}>
              <p className="font-body text-sm text-siyoni-mid">Gushakisha amashusho...</p>
            </div>
          )}

          {videoId === null && (
            <div className="flex flex-col items-center justify-center gap-3 bg-siyoni-card px-6 text-center" style={{ aspectRatio: "16/9" }}>
              <p className="font-body text-sm text-siyoni-mid">
                Misa y'uyu munsi ntiyashyizweho kuri YouTube. Subira nyuma cyangwa fungura channel ya Pacis TV.
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
              <div className="bg-siyoni-card px-4 py-3 flex items-center justify-between">
                <p className="font-body text-xs text-siyoni-mid">Pacis TV — Regina Pacis Remera</p>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-xs text-siyoni-mid hover:text-siyoni-brown transition-colors"
                >
                  Fungura kuri YouTube <ExternalLink size={11} />
                </a>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* ── TITLE below video ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <h1 className="font-heading text-2xl font-bold text-siyoni-brown">
          Misa y'Umunsi
        </h1>
      </div>

      {/* ── READINGS ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl font-semibold text-siyoni-brown">
            Amasomo y'uyu munsi
          </h2>
          <span className="font-body text-xs text-siyoni-mid border border-siyoni-border px-3 py-1 rounded-full">
            Phase 3
          </span>
        </div>
        <p className="font-body text-sm text-siyoni-mid mb-6">
          Amasomo azabonahana iyo twunganye API y'Itorero Gatorika.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {READINGS.map((reading, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" as const }}
              className="bg-white/60 border border-siyoni-border rounded-card p-5"
            >
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-body text-xs font-medium tracking-widest uppercase" style={{ color: season.accent }}>
                  {reading.label}
                </p>
                <p className="font-body text-xs text-siyoni-mid ml-3">{reading.ref}</p>
              </div>
              <p className="prayer-text text-siyoni-brown text-sm">{reading.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
