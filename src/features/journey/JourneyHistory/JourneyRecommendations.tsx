"use client";

import React from "react";
import { useSearchStore } from "@/features/search/SearchState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";

export const JourneyRecommendations: React.FC = () => {
  const setFromQuery = useSearchStore((s) => s.setFromQuery);
  const setToQuery = useSearchStore((s) => s.setToQuery);

  const recommendations = [
    { from: "City Center", to: "Waterfront", label: "Quick Commute" },
    { from: "Market Square", to: "Airport Terminal", label: "Airport Link" },
  ];

  const handleSelectRecommendation = (from: string, to: string) => {
    setFromQuery(from);
    setToQuery(to);
    JourneyCoordinator.search(from, to);
  };

  return (
    <div className="flex flex-col gap-2 pt-1.5 select-none w-full">
      <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Popular Journeys
      </span>
      <div className="flex gap-2 flex-wrap">
        {recommendations.map((rec, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectRecommendation(rec.from, rec.to)}
            className="text-[10px] font-bold text-text-secondary hover:text-text-primary px-2.5 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 rounded-lg transition-colors"
          >
            {rec.label}
          </button>
        ))}
      </div>
    </div>
  );
};

JourneyRecommendations.displayName = "JourneyRecommendations";
export default JourneyRecommendations;
