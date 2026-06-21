import { NextResponse } from "next/server";

// Fetches today's saint from the free Catholic liturgical calendar API.
// This runs server-side so it is not subject to browser CORS restrictions.
// Cached for 24 hours — the saint of the day does not change within a day.

export async function GET() {
  try {
    const res = await fetch(
      "https://calapi.inadiutorium.cz/api/v0/en/calendars/default/today",
      { next: { revalidate: 86400 } } // 24 hours
    );

    if (!res.ok) {
      return NextResponse.json({ name: null });
    }

    const data = await res.json();

    // celebrations is sorted by importance — find the first named feast or memorial
    const celebration = (data.celebrations ?? []).find(
      (c: { rank: string }) => c.rank !== "feria"
    );

    if (!celebration) {
      return NextResponse.json({ name: null });
    }

    // Translate common English prefixes to Kinyarwanda
    const name = (celebration.title as string)
      .replace(/^Saints?\s+/i, "Mutagatifu ")
      .replace(/^Blessed\s+/i, "Ukundwa ")
      .replace(/^Our Lady/i, "Bikira Mariya");

    return NextResponse.json({ name });
  } catch {
    return NextResponse.json({ name: null });
  }
}
