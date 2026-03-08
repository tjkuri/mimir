import React from "react";

// Tailwind tokens can't be used inside SVG, so colours are named here.
const COLORS = {
  bar:   "#48a9a6", // verdigris
  line:  "#f25f5c", // bittersweet
  axis:  "#e5e7eb",
  label: "#6b7280",
  labelText: "#fbf9ff", // ghostWhite (line label bubble text)
};

/**
 * Compact SVG histogram with axes and an optional vertical marker for the line.
 * bins: [{ start:number, end:number, count:number }]
 * line: number | null
 */
export default function HistogramMini({
  bins = [],
  line = null,
  className = "",
  width = 480,
  height = 140,
}) {
  if (!bins || bins.length === 0) {
    return (
      <div className={`rounded-2xl border border-ghostWhite/20 p-4 text-sm text-ghostWhite/70 ${className}`}>
        No histogram data.
      </div>
    );
  }

  // Padding to make room for axis labels/ticks
  const pad = { top: 8, right: 12, bottom: 28, left: 26 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  const xMin = bins[0].start;
  const xMax = bins[bins.length - 1].end;
  const denom = (xMax - xMin) || 1; // guard against zero-width domain
  const maxCount = Math.max(...bins.map((b) => b.count), 1);

  const x = (v) => pad.left + ((v - xMin) / denom) * W;
  const y = (c) => pad.top + H - (c / maxCount) * H; // maps count -> pixel Y

  // Bar width in pixels (clamped)
  const binWidth = Math.max(1, x(bins[0].end) - x(bins[0].start));
  // Show each bucket label only if there’s enough room
  const showBinLabels = bins.length <= 16 && binWidth >= 18;

  // Line position (clamped to chart)
  const hasLine = typeof line === "number" && Number.isFinite(line);
  const lineX = hasLine ? Math.min(pad.left + W, Math.max(pad.left, x(line))) : null;

  return (
    <div className={`rounded-2xl bg-ghostWhite text-spaceCadet p-3 shadow ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Passing yards histogram"
      >
        {/* Axes */}
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + H} stroke={COLORS.axis} />
        <line x1={pad.left} y1={pad.top + H} x2={pad.left + W} y2={pad.top + H} stroke={COLORS.axis} />

        {/* Y ticks & light grid */}
        {(() => {
          const step = Math.max(1, Math.ceil(maxCount / 4));
          const ticks = [];
          for (let v = 0; v <= maxCount; v += step) ticks.push(v);
          if (ticks[ticks.length - 1] !== maxCount) ticks.push(maxCount);
          return ticks.map((v, i) => (
            <g key={`yt-${i}`}>
              <line
                x1={pad.left}
                y1={y(v)}
                x2={pad.left + W}
                y2={y(v)}
                stroke={COLORS.axis}
                opacity="0.5"
              />
              <text
                x={pad.left - 6}
                y={y(v) + 3}
                fontSize="10"
                textAnchor="end"
                fill={COLORS.label}
              >
                {v}
              </text>
            </g>
          ));
        })()}

        {/* Bars */}
        {bins.map((b, i) => {
          const x0 = x(b.start);
          const y0 = y(b.count);
          const h = Math.max(1, pad.top + H - y0);
          return (
            <rect
              key={i}
              x={x0}
              y={y0}
              width={binWidth - 1}
              height={h}
              rx="2"
              fill={COLORS.bar}
            />
          );
        })}

        {/* Vertical line marker for the prop line */}
        {hasLine && (
          <>
            <line
              x1={lineX}
              y1={pad.top}
              x2={lineX}
              y2={pad.top + H}
              stroke={COLORS.line}
              strokeWidth="2"
            />
            {/* Label bubble */}
            <rect
              x={Math.min(lineX + 6, width - 78)}
              y={pad.top + 6}
              width="72"
              height="20"
              rx="10"
              fill={COLORS.line}
            />
            <text
              x={Math.min(lineX + 6, width - 78) + 36}
              y={pad.top + 20}
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.labelText}
            >
              line: {line}
            </text>
          </>
        )}

        {/* X labels: per-bucket centers if space allows; else min/mid/max */}
        {showBinLabels ? (
          bins.map((b, i) => {
            const xm = (x(b.start) + x(b.end)) / 2;
            const mid = Math.round((b.start + b.end) / 2);
            return (
              <text
                key={`xb-${i}`}
                x={xm}
                y={pad.top + H + 12}
                fontSize="9"
                textAnchor="middle"
                fill={COLORS.label}
              >
                {mid}
              </text>
            );
          })
        ) : (
          <>
            <text
              x={pad.left}
              y={height - 4}
              fontSize="10"
              fill={COLORS.label}
            >
              {Math.round(xMin)}
            </text>
            <text
              x={pad.left + W / 2}
              y={height - 4}
              fontSize="10"
              textAnchor="middle"
              fill={COLORS.label}
            >
              {Math.round((xMin + xMax) / 2)}
            </text>
            <text
              x={pad.left + W}
              y={height - 4}
              fontSize="10"
              textAnchor="end"
              fill={COLORS.label}
            >
              {Math.round(xMax)}
            </text>
          </>
        )}

        {/* Axis titles */}
        <text
          x={pad.left + W / 2}
          y={height - 2}
          fontSize="10"
          textAnchor="middle"
          fill={COLORS.label}
        >
          yards
        </text>
        <text
          x={6}
          y={pad.top + H / 2}
          fontSize="10"
          fill={COLORS.label}
          transform={`rotate(-90 6 ${pad.top + H / 2})`}
          textAnchor="middle"
        >
          games
        </text>
      </svg>
    </div>
  );
}
