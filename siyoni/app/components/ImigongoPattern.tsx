// Server component — pure SVG, no browser APIs needed.
// Used as a narrow decorative strip between sections, never as a full background.
//
// Colors: warm black (#1C1008) and warm white (#FDFAF6) — graphic and traditional,
// sitting against the cream site background without adding a third palette.
//
// Usage: wrap in a div with a fixed height to control how much of the pattern shows.
// e.g. <div className="h-8 overflow-hidden"><ImigongoPattern /></div>

interface ImigongoPatternProps {
  className?: string;
}

export default function ImigongoPattern({ className }: ImigongoPatternProps) {
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
          id="imigongo-tile"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Background — warm white, matches card color */}
          <rect width="40" height="40" fill="#FDFAF6" />

          {/* Corner triangles — warm black, alternating NW/SE vs NE/SW.
              When tiles are placed side by side, opposite corners connect
              and form larger diamond shapes across the grid. */}
          <polygon points="0,0 20,0 0,20" fill="#1C1008" />
          <polygon points="40,0 20,0 40,20" fill="#1C1008" />
          <polygon points="0,40 20,40 0,20" fill="#1C1008" />
          <polygon points="40,40 20,40 40,20" fill="#1C1008" />

          {/* Outer diamond — warm white, punches through the corner fills */}
          <polygon points="20,5 35,20 20,35 5,20" fill="#FDFAF6" />

          {/* Inner diamond ring — warm black, the main band */}
          <polygon points="20,11 29,20 20,29 11,20" fill="#1C1008" />

          {/* Center — warm white, creates the ring effect */}
          <polygon points="20,16 24,20 20,24 16,20" fill="#FDFAF6" />

          {/* Center dot */}
          <circle cx="20" cy="20" r="2.5" fill="#1C1008" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#imigongo-tile)" />
    </svg>
  );
}
