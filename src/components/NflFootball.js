import React, { useState } from "react";
import { Link } from "react-router-dom";
import QBSelect from "../components/QBSelect";
import OddsCard from "../components/OddsCard";
import ScopeCard from "../components/ScopeCard";
import HistogramMini from "../components/HistogramMini";
import { YGGDRASIL_URL } from "../config";



export default function NflFootball() {
    const [picked, setPicked] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [status, setStatus] = useState("idle"); // idle | loading | ready | error
    const [errorMsg, setErrorMsg] = useState("");
    const [activeScope, setActiveScope] = useState("last_season"); // 'career' | 'last_season' | 'current_season'

    async function runAnalysis({ refreshOdds = false } = {}) {
    if (!picked) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const base = YGGDRASIL_URL || "";
      const url = new URL(`${base}/api/nfl/qb/analysis`);
      url.searchParams.set("playerId", picked.id || picked.slug);
      if (refreshOdds) url.searchParams.set("refreshOdds", "true");
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setAnalysis(json);
      // choose a sensible default scope
      const scopes = json?.distributions?.scopes || {};
      const pick =
        (scopes.last_season?.n || 0) > 0 ? "last_season" :
        (scopes.career?.n || 0) > 0 ? "career" :
        "current_season";
      setActiveScope(pick);
      setStatus("ready");
    } catch (e) {
      setErrorMsg(e.message || "Failed to analyze");
      setStatus("error");
    }
  }

  const activeBins = analysis?.distributions?.scopes?.[activeScope]?.histogram || [];
  const line = analysis?.odds?.consensus_line ?? null;


return (
    <div className="flex flex-col items-center min-h-screen py-10 gap-6 bg-spaceCadet">
      <div className="text-center flex flex-col items-center gap-6">
        <h1 className="text-naplesYellow text-5xl font-bold">NFL QB Analysis</h1>

        <div className="mx-auto max-w-md">
          <QBSelect onPick={setPicked} />
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-full px-6 py-2 bg-bittersweet text-white hover:bg-ghostWhite hover:text-verdigris disabled:opacity-50"
            onClick={() => runAnalysis()}
            disabled={!picked || status === "loading"}
          >
            {status === "loading" ? "Analyzing…" : "Analyze"}
          </button>

          <button
            className="rounded-full px-6 py-2 bg-saffron text-white hover:bg-saffronDark disabled:opacity-50"
            onClick={() => runAnalysis({ refreshOdds: true })}
            disabled={!picked || status === "loading" || !analysis}
            title="Manual refresh (spends 1 credit)"
          >
            Refresh odds
          </button>

          <Link to="/">
            <button className="rounded-full px-6 py-2 bg-ghostWhite text-spaceCadet hover:bg-bittersweet hover:text-white">
              Go Home
            </button>
          </Link>
        </div>

        {/* Errors */}
        {status === "error" && (
          <div className="text-sm text-red-300">Error: {errorMsg} — <button className="underline" onClick={() => runAnalysis()}>Retry</button></div>
        )}

        {/* Results */}
        {status === "ready" && analysis && (
          <div className="w-full flex flex-col items-center gap-6">
            <OddsCard odds={analysis.odds} event={analysis.event} />

            {/* Scope cards */}
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ScopeCard label="Career" scope={analysis.distributions.scopes.career} line={line} />
              <ScopeCard label="Last Season" scope={analysis.distributions.scopes.last_season} line={line} />
              <ScopeCard label="Current Season" scope={analysis.distributions.scopes.current_season} line={line} />
            </div>

            {/* Histogram + scope toggle */}
            <div className="w-full max-w-3xl flex flex-col gap-2  mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-ghostWhite/80">
                  Histogram • <span className="text-ghostWhite">line: <b>{line ?? "—"}</b></span>
                </div>
                <div className="flex items-center gap-2">
                  {["career", "last_season", "current_season"].map(key => (
                    <button
                      key={key}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeScope === key
                          ? "bg-verdigris text-white"
                          : "bg-ghostWhite text-spaceCadet hover:bg-verdigris/10"
                      }`}
                      onClick={() => setActiveScope(key)}
                    >
                      {key === "career" ? "Career" : key === "last_season" ? "Last" : "Current"}
                    </button>
                  ))}
                </div>
              </div>

              <HistogramMini bins={activeBins} line={line} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}