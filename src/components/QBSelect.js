import React, { useEffect, useState } from "react";

import { YGGDRASIL_URL } from '../config';  // Import backend address

const DEFAULT_QUICK_SLUGS = [
  "mahomes-patrick",
  "allen-joshua",
  "jackson-lamar",
  "burrow-joe",
  "daniels-jayden",
  "herbert-justin",
  "prescott-rayne",
];

export default function QBSelect({ onPick, quickPicks = DEFAULT_QUICK_SLUGS }) {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [selectedId, setSelectedId] = useState("");

  async function load() {
    try {
      setStatus("loading");
      const base = YGGDRASIL_URL || "";
      const res = await fetch(`${base}/api/nfl/qbs`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setPlayers(json.players || []);
      setSelectedId((json.players?.[0]?.id) || "");
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => { load(); }, []);

  if (status === "loading") {
    return <div className="text-sm text-gray-600">Loading QBs…</div>;
  }

  if (status === "error") {
    return (
      <div className="text-sm text-red-700">
        Couldn’t load QBs.{" "}
        <button className="underline" onClick={load}>Retry</button>
      </div>
    );
  }
  
  const bySlug = Object.fromEntries(players.map(p => [p.slug, p]));
  const selected = players.find(p => p.id === selectedId);

   return (
    <div className="w-full">
      {/* Quick picks row */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {quickPicks
        .map(slug => bySlug[slug])
          .filter(Boolean)
          .map(p => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedId(p.id);
                onPick?.(p);
              }}
              className="text-sm rounded-full px-3 py-1 bg-saffron text-spaceCadet
                hover:bg-saffronDark focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ghostWhite/40"
              title={`${p.name} • ${p.team_abbr}`}
            >
              {p.name.split(" ").slice(-1)[0]} {/* shows last name */}
            </button>
          ))}
      </div>

      {/* The original dropdown */}
      <div className="flex items-center gap-3 justify-center">
        <select
          className="rounded-lg border px-3 py-2"
          value={selectedId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedId(id);
            const qb = players.find(p => p.id === id);
            onPick?.(qb);
          }}
        >
          {players.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} • {p.team_abbr}
            </option>
          ))}
        </select>

        {selected && (
          <span className="text-sm text-verdigris">
            Selected: <b>{selected.name}</b> ({selected.team_abbr})
          </span>
        )}
      </div>
    </div>
  );
}

