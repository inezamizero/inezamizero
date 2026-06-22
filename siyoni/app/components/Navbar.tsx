"use client";

// Client component — needs usePathname (active tab) and a scroll listener (nav shadow).
// Renders two layouts from one component:
//   - md and up: sticky top bar
//   - below md: fixed bottom tab bar

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Heart,
  Home,
  Mail,
  Music,
  Sun,
} from "lucide-react";

// The five prayer sections — used in both desktop center links and mobile tabs.
const sections = [
  { name: "Isengesho",          mobileLabel: "Isengesho",  href: "/isengesho", icon: BookOpen },
  { name: "Rozari n'amashapure", mobileLabel: "Rozari n'…", href: "/rozari",    icon: Heart },
  { name: "Noveni",              mobileLabel: "Noveni",     href: "/novena",    icon: CalendarDays },
  { name: "Misa",                mobileLabel: "Misa",       href: "/misa",      icon: Sun },
  { name: "Indirimbo",           mobileLabel: "Indirimbo",  href: "/indirimbo", icon: Music },
];

// Mobile tab bar includes Home and Contact in addition to the five sections.
const mobileTabs = [
  { name: "Gusenga",    mobileLabel: "Gusenga",    href: "/",        icon: Home },
  ...sections,
  { name: "Tuvugishe", mobileLabel: "Tuvugishe",  href: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showShadow = scrolled || !isHome;

  // The whole site is now dark, so the nav is dark everywhere.
  const headerBg     = "bg-siyoni-brown";
  const headerBorder = "border-white/10";
  const logoColor    = "text-siyoni-cream hover:text-siyoni-ochre";
  const linkActive   = "text-siyoni-ochre border-siyoni-ochre";
  const linkInactive = "text-siyoni-cream/85 border-transparent hover:text-siyoni-cream";
  const mobileBarBg  = "bg-siyoni-brown border-white/10";
  const mobileTabActive = "text-siyoni-ochre";
  const mobileTabIdle   = "text-siyoni-cream/75";

  return (
    <>
      {/* ── Desktop: sticky top bar ──────────────────────────────────────── */}
      <header
        className={`
          hidden md:flex items-center justify-between
          sticky top-0 z-50
          px-8 h-16
          ${headerBg}
          border-b ${headerBorder}
          transition-all duration-300
          ${showShadow ? "shadow-nav" : ""}
        `}
      >
        {/* Left: site name */}
        <Link
          href="/"
          className={`font-heading text-2xl font-bold tracking-wide transition-colors ${logoColor}`}
        >
          Siyoni
        </Link>

        {/* Center: five section links */}
        <nav className="flex items-center gap-8">
          {sections.map((s) => {
            const active = pathname.startsWith(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`
                  font-body text-sm font-medium
                  transition-colors duration-200
                  border-b-2 pb-0.5
                  ${active ? linkActive : linkInactive}
                `}
              >
                {s.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Contact link */}
        <Link
          href="/contact"
          className={`font-body text-sm font-medium transition-colors duration-200 border-b-2 pb-0.5 ${
            pathname === "/contact"
              ? linkActive
              : linkInactive
          }`}
        >
          Tuvugishe
        </Link>
      </header>

      {/* ── Mobile: fixed bottom tab bar ─────────────────────────────────── */}
      <nav
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          ${mobileBarBg}
          border-t
          flex items-stretch
          pb-[env(safe-area-inset-bottom)]
        `}
      >
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          // For the home tab, exact match. For sections, startsWith.
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex-1 flex flex-col items-center justify-center
                gap-0.5 py-2
                font-body text-[10px] font-medium
                transition-colors duration-200
                ${active ? "text-siyoni-ochre" : "text-siyoni-mid"}
              `}
            >
              {/* Icon scales up slightly when active */}
              <Icon
                size={active ? 22 : 20}
                strokeWidth={active ? 2 : 1.5}
                className="transition-all duration-200"
              />
              <span className="truncate max-w-[52px] text-center leading-tight">
                {tab.mobileLabel}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
