import React from "react";

function fmtPct(p) {
  if (p == null) return "—";
  return `${(p * 100).toFixed(1)}%`;
}
function fmtNum(n) {
  if (n == null) return "—";
  return Math.round(n);
}
function zBadge(z) {
  if (z == null) return "—";
  const s = z >= 0 ? `+${z.toFixed(2)}σ` : `${z.toFixed(2)}σ`;
  return s;
}

export default function ScopeCard({ label, scope, line }) {
  const n = scope?.n ?? 0;
  const disabled = n === 0;

  return (
    <div className={`rounded-2xl p-4 shadow bg-ghostWhite text-spaceCadet border border-ghostWhite/30 ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{label}</div>
        {n < 5 && n > 0 ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-saffron text-spaceCadet">small sample</span>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-verdigris font-medium">{fmtNum(scope.mean)}</div>
          <div className="text-xs text-gray-500">mean</div>
        </div>
        <div>
          <div className="text-verdigris font-medium">{fmtNum(scope.median)}</div>
          <div className="text-xs text-gray-500">median</div>
        </div>
        <div>
          <div className="text-verdigris font-medium">{fmtPct(scope.p_over)}</div>
          <div className="text-xs text-gray-500">P(Over {line ?? "—"})</div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-ghostWhite border px-2 py-0.5">n={n}</span>
        <span className="rounded-full bg-ghostWhite border px-2 py-0.5">z: {zBadge(scope.z_score)}</span>
        {scope.seasons_used?.length ? (
          <span className="text-gray-500">seasons: {scope.seasons_used.join(", ")}</span>
        ) : null}
      </div>
    </div>
  );
}
