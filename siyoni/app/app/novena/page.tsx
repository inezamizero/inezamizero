"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

const novenas = [
  {
    name: "Noveni ya Mariya Upfundura Amapfundo",
    desc: "Iminsi icyenda yo gutakambira Mariya kugira ngo apfundure amapfundo yo mu buzima bwacu",
    href: "/novena/amapfundo",
    available: true,
  },
  {
    name: "Noveni y'Izina rya Yezu",
    desc: "Iminsi icyenda yubaha Izina Ritagatifu rya Yezu, twiyambaza ubushobozi bwaryo",
    href: "/novena/izina-rya-yezu",
    available: true,
  },
];

export default function NovenaLanding() {
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
            Noveni
          </h1>
          <p className="font-body text-siyoni-mid mb-10">
            Hitamo noveni ushaka gusenga.
          </p>

          <div className="flex flex-col gap-4">
            {novenas.map((n, i) => (
              <motion.div
                key={n.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" as const }}
              >
                {n.available ? (
                  <Link
                    href={n.href}
                    className="group flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div>
                      <div className="w-8 h-0.5 bg-siyoni-ochre mb-3" />
                      <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                        {n.name}
                      </h2>
                      <p className="font-body text-sm text-siyoni-mid">{n.desc}</p>
                    </div>
                    <ChevronRight size={20} className="text-siyoni-ochre ml-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card p-6 opacity-50">
                    <div>
                      <div className="w-8 h-0.5 bg-siyoni-border mb-3" />
                      <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                        {n.name}
                      </h2>
                      <p className="font-body text-sm text-siyoni-mid">{n.desc}</p>
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
