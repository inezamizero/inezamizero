import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

const options = [
  {
    name: "Amasengesho ya Mugitondo",
    desc: "Tangira umunsi wawe uherekejwe n'Imana",
    href: "/isengesho/mugitondo",
    available: true,
  },
  {
    name: "Amasengesho ya Nimugoroba",
    desc: "Soza umunsi wawe neza mbere yo kuryama",
    href: "/isengesho/nimugoroba",
    available: true,
  },
  {
    name: "Andi Masengesho",
    desc: "Amasengesho atandukanye; gusenga imbere y'isakramentu, n'ibindi",
    href: "/isengesho/andi",
    available: false,
  },
];

export default function IsengeshoPage() {
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

        <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-2">
          Amasengesho
        </h1>
        <p className="font-body text-siyoni-mid mb-10">
          Hitamo igihe cy'isengesho.
        </p>

        <div className="flex flex-col gap-4">
          {options.map((option) =>
            option.available ? (
              <Link
                key={option.href}
                href={option.href}
                className="group flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="w-8 h-0.5 bg-siyoni-ochre mb-3" />
                  <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                    {option.name}
                  </h2>
                  <p className="font-body text-sm text-siyoni-mid">{option.desc}</p>
                </div>
                <ChevronRight
                  size={20}
                  className="text-siyoni-ochre ml-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            ) : (
              <div
                key={option.href}
                className="flex items-center justify-between bg-siyoni-card border border-siyoni-border rounded-card p-6 opacity-50"
              >
                <div>
                  <div className="w-8 h-0.5 bg-siyoni-border mb-3" />
                  <h2 className="font-heading text-xl font-semibold text-siyoni-brown mb-1">
                    {option.name}
                  </h2>
                  <p className="font-body text-sm text-siyoni-mid">{option.desc}</p>
                </div>
                <span className="font-body text-xs text-siyoni-mid ml-4 flex-shrink-0 whitespace-nowrap">
                  Vuba
                </span>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
