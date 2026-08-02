"use client";

import React, { useState } from "react";
import { useSearchStore } from "@/features/search/SearchState";
import { SearchController } from "@/features/search/SearchController";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { OriginInput } from "./OriginInput";
import { DestinationInput } from "./DestinationInput";
import { SwapButton } from "./SwapButton";
import { SearchSuggestions } from "@/features/search/components/SearchSuggestions";
import { Card, Button } from "@/components/ui";

export const JourneySearchPanel: React.FC = () => {
  const fromQuery = useSearchStore((s) => s.fromQuery);
  const toQuery = useSearchStore((s) => s.toQuery);
  const setFromQuery = useSearchStore((s) => s.setFromQuery);
  const setToQuery = useSearchStore((s) => s.setToQuery);
  const clearSearchStore = useSearchStore((s) => s.clearSearch);

  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const isSearching = useJourneyStore((s) => s.isSearching);

  const [activeInput, setActiveInput] = useState<"from" | "to" | null>(null);
  const [sugs, setSugs] = useState<string[]>([]);

  const handleInputChange = async (val: string, type: "from" | "to") => {
    if (type === "from") {
      setFromQuery(val);
    } else {
      setToQuery(val);
    }
    const matches = await SearchController.getSuggestions(val);
    setSugs(matches);
  };

  const handleSelectSuggestion = (dest: string) => {
    if (activeInput === "from") {
      setFromQuery(dest);
    } else if (activeInput === "to") {
      setToQuery(dest);
    }
    setSugs([]);
    setActiveInput(null);
  };

  const handleSwap = () => {
    const fromVal = fromQuery;
    const toVal = toQuery;
    setFromQuery(toVal);
    setToQuery(fromVal);
  };

  const handleSearch = async () => {
    if (!fromQuery || !toQuery) return;
    setActiveInput(null);
    setSugs([]);
    await JourneyCoordinator.search(fromQuery, toQuery);
  };

  const handleClear = () => {
    clearSearchStore();
    JourneyCoordinator.clearJourney();
  };

  return (
    <Card className="flex flex-col gap-4.5 p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full select-none relative">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          {selectedJourney ? "Selected Route Details" : "Plan Your Journey"}
        </span>
        {(fromQuery || toQuery || selectedJourney) && (
          <button
            onClick={handleClear}
            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {!selectedJourney && (
        <div className="flex flex-col gap-3 relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex flex-col gap-2">
              <OriginInput
                value={fromQuery}
                onFocus={async () => {
                  setActiveInput("from");
                  setSugs(await SearchController.getSuggestions(fromQuery));
                }}
                onChange={(val) => handleInputChange(val, "from")}
              />
              <DestinationInput
                value={toQuery}
                onFocus={async () => {
                  setActiveInput("to");
                  setSugs(await SearchController.getSuggestions(toQuery));
                }}
                onChange={(val) => handleInputChange(val, "to")}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <SwapButton onSwap={handleSwap} />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {activeInput && sugs.length > 0 && (
            <SearchSuggestions
              suggestions={sugs}
              onSelect={handleSelectSuggestion}
            />
          )}

          <Button
            variant="primary"
            disabled={isSearching || !fromQuery || !toQuery}
            onClick={handleSearch}
            className="w-full text-xs h-9 justify-center font-bold mt-1.5"
          >
            {isSearching ? "Calculating Options..." : "Find Routes"}
          </Button>
        </div>
      )}

      {selectedJourney && (
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex justify-between items-center text-xs text-text-secondary">
            <span>Origin:</span>
            <span className="font-bold text-text-primary">{selectedJourney.fromStopName}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-text-secondary">
            <span>Destination:</span>
            <span className="font-bold text-text-primary">{selectedJourney.toStopName}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-text-secondary border-t border-white/5 pt-2 mt-1">
            <span>Total Duration:</span>
            <span className="font-bold text-text-primary">{selectedJourney.totalDurationMinutes} mins</span>
          </div>
          <div className="flex justify-between items-center text-xs text-text-secondary">
            <span>Estimated Fare:</span>
            <span className="font-bold text-text-primary text-emerald-400 font-mono">${selectedJourney.fare.toFixed(2)}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

JourneySearchPanel.displayName = "JourneySearchPanel";
export default JourneySearchPanel;
