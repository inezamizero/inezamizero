import { NextResponse } from "next/server";

// Pacis TV YouTube channel ID
const CHANNEL_ID = "UCkKVUyOqvKk1W-QadPy_WHQ";

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function findMassVideo(
  items: Array<{ id: { videoId: string }; snippet: { title: string } }>,
  date: Date
): { videoId: string; title: string } | null {
  const dateStr = formatDate(date);
  const isSunday = date.getDay() === 0;

  const matches = items.filter(({ snippet: { title } }) => {
    const upper = title.toUpperCase();
    if (!upper.includes(dateStr)) return false;
    if (isSunday) return upper.includes("IGITAMBO CYA MISA YA GATATU TALIKI");
    return upper.includes("IGITAMBO CYA MISA") && upper.includes("MUGITONDO");
  });

  if (matches.length === 0) return null;

  // Prefer Regina Pacis Remera, fall back to any match
  const preferred = matches.find(({ snippet: { title } }) =>
    title.toUpperCase().includes("REGINA PACIS REMERA")
  );

  const winner = preferred ?? matches[0];
  return { videoId: winner.id.videoId, title: winner.snippet.title };
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY not set" },
      { status: 500 }
    );
  }

  try {
    // Search only within Pacis TV's completed live streams for today.
    // eventType=completed returns past live streams — exactly what the Live tab shows.
    // Cached for 1 hour so we don't burn through the daily quota.
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", CHANNEL_ID);
    url.searchParams.set("type", "video");
    url.searchParams.set("eventType", "completed"); // live streams only
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", "10");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("YouTube API error:", err);
      return NextResponse.json({ videoId: null, title: null });
    }

    const data = await res.json();
    const video = findMassVideo(data.items ?? [], new Date());

    if (!video) {
      return NextResponse.json({ videoId: null, title: null });
    }

    return NextResponse.json({ videoId: video.videoId, title: video.title });
  } catch (err) {
    console.error("pacistv route error:", err);
    return NextResponse.json({ videoId: null, title: null });
  }
}
