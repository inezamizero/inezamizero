import { NextResponse } from "next/server";
import { getSaintOfDay } from "@/lib/saints";

// Returns today's saint from the built-in static calendar.
// No external API needed — works offline and never goes down.

export async function GET() {
  const name = getSaintOfDay(new Date());
  return NextResponse.json({ name });
}
