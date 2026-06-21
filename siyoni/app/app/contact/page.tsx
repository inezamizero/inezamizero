"use client";

// Contact form — submissions are forwarded to your email via Formspree.
// Setup (one time):
//   1. Go to https://formspree.io and sign up with inezamizero@gmail.com
//   2. Create a new form — Formspree gives you an ID like "xpzgkdlq"
//   3. Replace YOUR_FORM_ID below with that ID
//   4. Formspree will email you every time someone submits this form

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

const FORMSPREE_ID = "mqevzqly";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>

      <main className="max-w-xl mx-auto px-6 py-12">
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
            Tuvugishe
          </h1>
          <p className="font-body text-siyoni-mid mb-10">
            Wifuza gutanga inama, gutuganira, cyangwa gusaba isengesho?
            Twandikire hano.
          </p>

          {status === "success" ? (
            // Success state
            <div className="bg-siyoni-card border border-siyoni-border rounded-card p-8 text-center shadow-card">
              <div className="w-12 h-0.5 bg-siyoni-ochre mx-auto mb-6" />
              <p className="font-heading text-2xl font-semibold text-siyoni-brown mb-2">
                Murakoze!
              </p>
              <p className="font-body text-siyoni-mid">
                Ubutumwa bwawe bwakiriwe. Tuzakugarukaho vuba.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 font-body text-sm text-siyoni-mid underline underline-offset-2 hover:text-siyoni-brown transition-colors"
              >
                Ohereza undi butumwa
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div>
                <label className="block font-body text-sm font-medium text-siyoni-brown mb-1.5">
                  Amazina
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Amazina yawe"
                  className="w-full bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 font-body text-sm text-siyoni-brown placeholder:text-siyoni-mid/50 focus:outline-none focus:border-siyoni-ochre transition-colors"
                />
              </div>

              {/* Email / contact */}
              <div>
                <label className="block font-body text-sm font-medium text-siyoni-brown mb-1.5">
                  Imeyili cyangwa nimero ya telefoni
                </label>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="Aho dushobora kukugarukaho"
                  className="w-full bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 font-body text-sm text-siyoni-brown placeholder:text-siyoni-mid/50 focus:outline-none focus:border-siyoni-ochre transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-body text-sm font-medium text-siyoni-brown mb-1.5">
                  Ubutumwa
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Andika hano icyo ushaka kutubwira..."
                  className="w-full bg-siyoni-card border border-siyoni-border rounded-card px-4 py-3 font-body text-sm text-siyoni-brown placeholder:text-siyoni-mid/50 focus:outline-none focus:border-siyoni-ochre transition-colors resize-none"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="font-body text-sm text-red-600">
                  Habaye ikosa. Ongera ugerageze cyangwa utwandikire kuri imeyili.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 rounded-card bg-siyoni-brown text-siyoni-cream font-body text-sm font-medium hover:bg-siyoni-mid disabled:opacity-50 transition-colors duration-200"
              >
                {status === "submitting" ? "Ohereza..." : "Ohereza ubutumwa"}
              </button>

            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}
