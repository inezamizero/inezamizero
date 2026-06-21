import { NextResponse } from "next/server";

// Pacis TV YouTube channel ID
const CHANNEL_ID = "UCkKVUyOqvKk1W-QadPy_WHQ";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface Video {
  id: string;
  title: string;
}

// Extract videos from YouTube's Atom RSS XML using regex.
// No external XML library needed — the feed structure is consistent.
function parseVideos(xml: string): Video[] {
  const videos: Video[] = [];
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryPattern.exec(xml)) !== null) {
    const entry = match[1];
    const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    // YouTube XML-encodes titles — decode &amp; and &quot; just in case
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);

    if (idMatch && titleMatch) {
      const title = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      videos.push({ id: idMatch[1], title });
    }
  }

  return videos;
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function findMassVideo(videos: Video[], date: Date): Video | null {
  const dateStr = formatDate(date);
  const isSunday = date.getDay() === 0;

  const matches = videos.filter((v) => {
    const upper = v.title.toUpperCase();
    if (!upper.includes(dateStr)) return false;

    if (isSunday) {
      // Sunday format: IGITAMBO CYA MISA YA GATATU TALIKI DD/MM/YYYY
      return upper.includes("IGITAMBO CYA MISA YA GATATU TALIKI");
    } else {
      // Weekday format: IGITAMBO CYA MISA YA MBERE YA MUGITONDO DD/MM/YYYY
      // "MBERE YA" sits between MISA and MUGITONDO so we check both separately
      return upper.includes("IGITAMBO CYA MISA") && upper.includes("MUGITONDO");
    }
  });

  if (matches.length === 0) return null;

  // Prefer Regina Pacis Remera — if not found, use the first match
  return (
    matches.find((v) =>
      v.title.toUpperCase().includes("REGINA PACIS REMERA")
    ) ?? matches[0]
  );
}

export async function GET() {
  try {
    // Fetch the RSS feed and cache the result for 1 hour.
    // Next.js revalidates automatically — no one needs to do anything manually.
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not reach YouTube RSS feed" },
        { status: 502 }
      );
    }

    const xml = await res.text();
    const videos = parseVideos(xml);
    const video = findMassVideo(videos, new Date());

    if (!video) {
      return NextResponse.json({ videoId: null, title: null });
    }

    return NextResponse.json({ videoId: video.id, title: video.title });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
