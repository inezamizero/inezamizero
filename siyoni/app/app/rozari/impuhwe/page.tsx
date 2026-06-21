import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImigongoPattern from "@/components/ImigongoPattern";

// Chaplet of Divine Mercy — content coming soon
export default function IshapureImpuhwe() {
  return (
    <div className="min-h-screen bg-siyoni-cream font-body pb-20 md:pb-0">
      <Navbar />
      <div className="h-10 overflow-hidden">
        <ImigongoPattern className="w-full h-full" />
      </div>
      <main className="max-w-xl mx-auto px-6 py-12">
        <Link href="/rozari" className="inline-flex items-center gap-1 text-siyoni-mid text-sm mb-8 hover:text-siyoni-brown transition-colors">
          ← Subira
        </Link>
        <h1 className="font-heading text-4xl font-bold text-siyoni-brown mb-4">
          Ishapure y'Impuhwe z'Imana
        </h1>
        <p className="font-body text-siyoni-mid">
          Iri sengesho rizashyirwaho vuba. Subira uyisure.
        </p>
      </main>
    </div>
  );
}
