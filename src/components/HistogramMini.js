import React from "react";

/**
 * Compact SVG histogram with an optional vertical marker for the line.
 * bins: [{ start, end, count }]
 * line: number | null
 */
export default function HistogramMini({ bins = [], line = null, className = "", width = 480, height = 140 }) {
  if (!bins || bins.length === 0) {
    return (
      <div className={`rounded-xl border border-ghostWhite/20 p-4 text-sm text-ghostWhite/70 ${className}`}>
        No histogram data.
      </div>
    );
  }

  const pad = { top: 8, right: 12, bottom: 20, left: 12 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  const xMin = bins[0].start;
  const xMax = bins[bins.length - 1].end;
  const maxCount = Math.max(...bins.map(b => b.count), 1);
  const x = (v) => pad.left + ((v - xMin) / (xMax - xMin)) * W;
  const y = (c) => pad.top + H - (c / maxCount) * H; // maps count -> pixel Y
  
  // Bar width in pixels (clamped)
  const binWidth = Math.max(1, (x(bins[0].end) - x(bins[0].start)));

  // Line position (clamped to chart)
  const hasLine = typeof line === "number" && Number.isFinite(line);
  const lineX = hasLine ? Math.min(pad.left + W, Math.max(pad.left, x(line))) : null;

  return (
    <div className={`rounded-2xl bg-ghostWhite text-spaceCadet p-3 shadow ${className}`}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Passing yards histogram">
        {/* Axes baseline */}
        <line x1={pad.left} y1={pad.top + H} x2={pad.left + W} y2={pad.top + H} stroke="#e5e7eb" />

        {/* Bars */}
        {bins.map((b, i) => {
          const x0 = x(b.start);
          const y0 = y(b.count);
          const h  = Math.max(1, (pad.top + H) - y0);
          return (
            <rect
              key={i}
              x={x0}
              y={y0}
              width={binWidth - 1}
              height={h}
              rx="2"
              fill="#48a9a6" // verdigris
            />
          );
        })}

        {/* Vertical line marker for the prop line */}
        {hasLine && (
          <>
            <line x1={lineX} y1={pad.top} x2={lineX} y2={pad.top + H} stroke="#f25f5c" strokeWidth="2" />
            {/* Label bubble */}
            <rect x={Math.min(lineX + 6, width - 78)} y={pad.top + 6} width="72" height="20" rx="10" fill="#f25f5c" />
            <text x={Math.min(lineX + 6, width - 78) + 36} y={pad.top + 20} textAnchor="middle" fontSize="11" fill="#fbf9ff">
              line: {line}
            </text>
          </>
        )}

        {/* X tick labels (min / median-ish / max) */}
        <text x={pad.left} y={height - 4} fontSize="10" fill="#6b7280">{Math.round(xMin)}</text>
        <text x={pad.left + W / 2} y={height - 4} fontSize="10" textAnchor="middle" fill="#6b7280">
          {Math.round((xMin + xMax) / 2)}
        </text>
        <text x={pad.left + W} y={height - 4} fontSize="10" textAnchor="end" fill="#6b7280">{Math.round(xMax)}</text>
      </svg>
    </div>
  );
}
