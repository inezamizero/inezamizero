// Server component — pure SVG, no browser APIs needed.
// Used as a narrow decorative strip between sections, never as a full background.
//
// Default colors: warm black (#1C1008) and warm white (#FDFAF6) — graphic and
// traditional, sitting against the cream site background without adding a third
// palette. bgColor/fgColor let a page swap this to a different pairing (e.g. a
// dark-gold variant) while keeping the same tile geometry — used by the Undoer
// of Knots novena page.
//
// Usage: wrap in a div with a fixed height to control how much of the pattern shows.
// e.g. <div className="h-8 overflow-hidden"><ImigongoPattern /></div>

interface ImigongoPatternProps {
  className?: string;
  bgColor?: string;
  fgColor?: string;
}

export default function ImigongoPattern({
  className,
  bgColor = "#FDFAF6",
  fgColor = "#1C1008",
}: ImigongoPatternProps) {
  // Unique pattern id per instance so multiple recolored copies on one page
  // don't collide (SVG <defs> ids are global to the document).
  const patternId = `imigongo-tile-${bgColor.replace("#", "")}-${fgColor.replace("#", "")}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/*
          40×40 tile — smaller than before so the strip shows complete shapes
          even at a narrow height. patternUnits="userSpaceOnUse" keeps the tile
          at a fixed pixel size regardless of the SVG's dimensions.
        */}
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Background */}
          <rect width="40" height="40" fill={bgColor} />

          {/* Corner triangles — alternating NW/SE vs NE/SW.
              When tiles are placed side by side, opposite corners connect
              and form larger diamond shapes across the grid. */}
          <polygon points="0,0 20,0 0,20" fill={fgColor} />
          <polygon points="40,0 20,0 40,20" fill={fgColor} />
          <polygon points="0,40 20,40 0,20" fill={fgColor} />
          <polygon points="40,40 20,40 40,20" fill={fgColor} />

          {/* Outer diamond — punches through the corner fills */}
          <polygon points="20,5 35,20 20,35 5,20" fill={bgColor} />

          {/* Inner diamond ring — the main band */}
          <polygon points="20,11 29,20 20,29 11,20" fill={fgColor} />

          {/* Center — creates the ring effect */}
          <polygon points="20,16 24,20 20,24 16,20" fill={bgColor} />

          {/* Center dot */}
          <circle cx="20" cy="20" r="2.5" fill={fgColor} />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
