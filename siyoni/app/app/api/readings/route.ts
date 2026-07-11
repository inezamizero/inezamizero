import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Readings = {
  firstReading: string | null;
  psalm: string | null;
  secondReading: string | null;
  gospel: string | null;
};

export async function GET(request: Request) {
  // Date comes from the client's browser to match the user's local timezone.
  const { searchParams } = new URL(request.url);
  const now = new Date();
  const yyyy = searchParams.get("year") ?? String(now.getFullYear());
  const mm = (searchParams.get("month") ?? String(now.getMonth() + 1)).padStart(2, "0");
  const dd = (searchParams.get("day") ?? String(now.getDate())).padStart(2, "0");

  try {
    const url = `https://cpbjr.github.io/catholic-readings-api/readings/${yyyy}/${mm}-${dd}.json`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ readings: null });
    }

    const data = await res.json();
    const readings: Readings = {
      firstReading: data.readings?.firstReading ?? null,
      psalm: data.readings?.psalm ?? null,
      secondReading: data.readings?.secondReading ?? null,
      gospel: data.readings?.gospel ?? null,
    };

    return NextResponse.json({ readings });
  } catch {
    return NextResponse.json({ readings: null });
  }
}
