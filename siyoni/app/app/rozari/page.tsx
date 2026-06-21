"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

const devotions = [
  {
    name: "Rozari ya Bikira Mariya",
    // Traditional Rosary
    desc: "Ambibukiro y'ishavu, ibyishimo, ikuzo n'urumuri buri munsi",
    href: "/rozari/bikiramariya",
    available: true,
  },
  {
    name: "Ishapure y'Impuhwe z'Imana",
    // Chaplet of Divine Mercy
    desc: "Isengesho ry'impuhwe z'Imana ryatanzwe na Mutagatifu Mama Faustina",
    href: "/rozari/impuhwe",
    available: false,
  },
  {
    name: "Ishapure y'Ububabare Burindwi",
    // Chaplet of Suffering / Sorrowful
    desc: "Gusenga uzirikana ububabare bwa Yezu Kristu",
    href: "/rozari/ububabare",
    available: false,
  },
];

export default function RozariLanding() {
  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors"
        >
          ← Subira ahabanza
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
        >
          <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-2">
            Rozari n'Ishapure
          </h1>
          <p className="font-body text-siyoni-mid mb-10">
            Hitamo isengesho ushaka gusenga.
          </p>

          <div className="flex flex-col gap-4">
            {devotions.map((d, i) => (
              <motion.div
                key={d.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" as const }}
              >
                {d.available ? (
                  <Link
                    href={d.href}
                    className="group flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div>
                      <div className="w-8 h-0.5 bg-siyoni-ochre mb-3" />
                      <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                        {d.name}
                      </h2>
                      <p className="font-body text-sm text-siyoni-mid">{d.desc}</p>
                    </div>
                    <ChevronRight size={20} className="text-siyoni-ochre ml-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                ) : (
                  // Not yet available — shown but not clickable
                  <div className="flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card p-6 opacity-50">
                    <div>
                      <div className="w-8 h-0.5 bg-siyoni-border mb-3" />
                      <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                        {d.name}
                      </h2>
                      <p className="font-body text-sm text-siyoni-mid">{d.desc}</p>
                    </div>
                    <span className="font-body text-xs text-siyoni-mid ml-4 flex-shrink-0 whitespace-nowrap">
                      Vuba
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
