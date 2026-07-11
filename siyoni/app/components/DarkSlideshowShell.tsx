"use client";

// Common chrome for a dark, slide-by-slide prayer page: Navbar, a per-page
// background shade, a faint recolored Imigongo texture, the back link, and
// the animated slide transition. Each page supplies its own bgColor (a
// distinct "dark chocolate" shade) and slide content — this only owns the
// parts that are identical across pages.

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

export default function DarkSlideshowShell({
  bgColor,
  backHref,
  backLabel = "Subira",
  slideIndex,
  direction,
  children,
  footer,
  backdrop,
}: {
  bgColor: string;
  backHref: string;
  backLabel?: string;
  slideIndex: number;
  direction: number;
  children: React.ReactNode;
  footer: React.ReactNode;
  // Optional decorative layer behind the content, above the base color —
  // e.g. the sun on the morning prayer page. Unused by every other page.
  backdrop?: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen font-body pb-24 md:pb-0 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <Navbar />

      {backdrop}

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <ImigongoPattern className="w-full h-full" bgColor={bgColor} fgColor="#C4882A" />
      </div>

      <main className="relative max-w-xl mx-auto px-6 py-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-siyoni-cream/50 text-sm mb-8 hover:text-siyoni-cream transition-colors"
        >
          ← {backLabel}
        </Link>

        <div className="min-h-[55vh] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slideIndex}
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={{ duration: 0.35, ease: "easeOut" as const }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {footer}
      </main>
    </div>
  );
}
