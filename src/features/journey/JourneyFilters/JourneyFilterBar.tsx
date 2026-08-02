"use client";

import React from "react";
import type { JourneySortMode } from "../JourneyState/JourneyTypes";

interface JourneyFilterBarProps {
  currentSort: JourneySortMode;
  onSortChange: (mode: JourneySortMode) => void;
}

export const JourneyFilterBar: React.FC<JourneyFilterBarProps> = ({
  currentSort,
  onSortChange,
}) => {
  const modes: { id: JourneySortMode; label: string }[] = [
    { id: "fastest", label: "Fastest" },
    { id: "cheapest", label: "Cheapest" },
    { id: "eco", label: "Eco-Friendly" },
  ];

  return (
    <div className="flex border-b border-white/5 pb-2 scroll-x gap-1.5 w-full select-none">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => onSortChange(m.id)}
          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
            currentSort === m.id
              ? "bg-white/10 border-white/15 text-text-primary shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
              : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
};

JourneyFilterBar.displayName = "JourneyFilterBar";
export default JourneyFilterBar;
