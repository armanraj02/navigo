"use client";

import React, { useState } from "react";
import { JourneyHistory, HistoryItem } from "./JourneyHistory";
import { useSearchStore } from "@/features/search/SearchState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";

export const RecentJourneys: React.FC = () => {
  const [history] = useState<HistoryItem[]>(() => JourneyHistory.getAll());
  const setFromQuery = useSearchStore((s) => s.setFromQuery);
  const setToQuery = useSearchStore((s) => s.setToQuery);

  const handleSelectHistory = (item: HistoryItem) => {
    setFromQuery(item.fromName);
    setToQuery(item.toName);
    JourneyCoordinator.search(item.fromName, item.toName);
  };

  if (history.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 pt-1.5 select-none w-full">
      <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Recent Journeys
      </span>
      <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
        {history.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectHistory(item)}
            className="flex items-center justify-between text-left text-xs bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 p-2 rounded-xl transition-all w-full"
          >
            <div className="flex items-center gap-1.5 text-text-secondary truncate">
              <span className="font-semibold truncate">{item.fromName.split(" ")[0]}</span>
              <svg
                className="w-3 h-3 text-text-muted shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="font-semibold truncate">{item.toName.split(" ")[0]}</span>
            </div>
            <span className="text-[8px] text-text-muted font-mono uppercase shrink-0">
              Select
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

RecentJourneys.displayName = "RecentJourneys";
export default RecentJourneys;
