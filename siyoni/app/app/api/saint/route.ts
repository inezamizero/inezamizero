import { NextResponse } from "next/server";
import { getSaintOfDay } from "@/lib/saints";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Month and day come from the client's browser to match the user's local timezone.
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const day = searchParams.get("day");

  // Build a date using the client-provided month/day, or fall back to server date
  const date = month && day
    ? new Date(new Date().getFullYear(), Number(month) - 1, Number(day))
    : new Date();

  const name = getSaintOfDay(date);
  return NextResponse.json({ name });
}
