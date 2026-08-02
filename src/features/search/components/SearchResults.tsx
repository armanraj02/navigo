"use client";

import React from "react";
import { useSearchStore, MockJourney } from "../SearchState";
import { Card } from "@/components/ui";
import { motion } from "framer-motion";
import { MOCK_ROUTES } from "@/three/simulation/DummyScheduleEngine";

interface SearchResultsProps {
  onSelectJourney: (journey: MockJourney) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ onSelectJourney }) => {
  const searchResults = useSearchStore((s) => s.searchResults);
  const selectedJourney = useSearchStore((s) => s.selectedJourney);

  if (searchResults.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
        Suggested Journeys
      </span>
      <div className="flex flex-col gap-2.5">
        {searchResults.map((jrn) => {
          const route = MOCK_ROUTES.find((r) => r.id === jrn.routeId);
          const isSelected = selectedJourney?.id === jrn.id;

          return (
            <motion.div
              key={jrn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                }`}
                onClick={() => onSelectJourney(jrn)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded text-white font-mono"
                      style={{ backgroundColor: route?.color ?? "#0071e3" }}
                    >
                      {jrn.routeId}
                    </span>
                    <span className="text-[11px] font-semibold text-text-secondary">
                      {route?.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">
                    ${jrn.fare.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <svg
                      className="w-3.5 h-3.5 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-bold text-text-primary">
                      {jrn.durationMinutes} min
                    </span>
                  </div>

                  <span className="text-[10px] font-medium text-text-muted">
                    {jrn.transfers === 0 ? "Direct" : `${jrn.transfers} transfer`}
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

SearchResults.displayName = "SearchResults";
export default SearchResults;
