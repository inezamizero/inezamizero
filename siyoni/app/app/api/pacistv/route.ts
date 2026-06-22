import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CHANNEL_ID = "UCkKVUyOqvKk1W-QadPy_WHQ";

function findMassVideo(
  items: Array<{ id: { videoId: string }; snippet: { title: string } }>,
  dateStr: string,
  isSunday: boolean
): { videoId: string; title: string } | null {
  const matches = items.filter(({ snippet: { title } }) => {
    const upper = title.toUpperCase().replace(/\s+/g, " ");
    if (!upper.includes(dateStr)) return false;
    if (isSunday) return upper.includes("IGITAMBO CYA MISA YA GATATU");
    return upper.includes("IGITAMBO CYA MISA") && /MU\s*GITONDO/.test(upper);
  });

  if (matches.length === 0) return null;

  const preferred = matches.find(({ snippet: { title } }) =>
    title.toUpperCase().includes("REGINA PACIS REMERA")
  ) ?? matches[0];

  return { videoId: preferred.id.videoId, title: preferred.snippet.title };
}

export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "YOUTUBE_API_KEY not set" }, { status: 500 });
  }

  // Date comes from the client's browser so it matches the user's local timezone.
  // Format: DD/MM/YYYY — same format Pacis TV uses in their video titles.
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date"); // e.g. "21/06/2026"

  if (!dateParam) {
    return NextResponse.json({ videoId: null, title: null });
  }

  // Parse the date to determine day of week for Sunday detection
  const [dd, mm, yyyy] = dateParam.split("/");
  const parsedDate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  const isSunday = parsedDate.getDay() === 0;

  const searchQuery = isSunday
    ? "IGITAMBO CYA MISA YA GATATU"
    : "IGITAMBO CYA MISA YA MU GITONDO";

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", CHANNEL_ID);
    url.searchParams.set("q", searchQuery);
    url.searchParams.set("type", "video");
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", "25");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ videoId: null, title: null });
    }

    const data = await res.json();
    const video = findMassVideo(data.items ?? [], dateParam, isSunday);

    return NextResponse.json({
      videoId: video?.videoId ?? null,
      title: video?.title ?? null,
    });
  } catch {
    return NextResponse.json({ videoId: null, title: null });
  }
}
