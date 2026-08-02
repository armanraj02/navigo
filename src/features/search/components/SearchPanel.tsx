"use client";

import React, { useState } from "react";
import { useSearchStore, MockJourney } from "../SearchState";
import { SearchController } from "../SearchController";
import { PopularDestinations } from "./PopularDestinations";
import { RecentSearches } from "./RecentSearches";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchResults } from "./SearchResults";
import { Card, Button } from "@/components/ui";

interface SearchPanelProps {
  onSelectJourney: (journey: MockJourney) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSelectJourney }) => {
  const fromQuery = useSearchStore((s) => s.fromQuery);
  const toQuery = useSearchStore((s) => s.toQuery);
  const setFromQuery = useSearchStore((s) => s.setFromQuery);
  const setToQuery = useSearchStore((s) => s.setToQuery);

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

  const handleSelectSuggestion = async (dest: string) => {
    if (activeInput === "from") {
      setFromQuery(dest);
    } else if (activeInput === "to") {
      setToQuery(dest);
    }
    setSugs([]);
    setActiveInput(null);
    await SearchController.executeSearch();
  };

  const handleSwap = async () => {
    await SearchController.swapFromTo();
  };

  return (
    <Card className="flex flex-col gap-4 p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-sm select-none">
      <div className="flex flex-col gap-2 relative">
        {/* From Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="From where?"
            value={fromQuery}
            aria-label="Starting location"
            onFocus={async () => {
              setActiveInput("from");
              setSugs(await SearchController.getSuggestions(fromQuery));
            }}
            onChange={(e) => handleInputChange(e.target.value, "from")}
            className="w-full h-10 px-3 pr-10 text-xs font-semibold rounded-xl bg-white/5 border border-white/5 focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/30 text-text-primary placeholder:text-text-muted outline-none transition-all"
          />
        </div>

        {/* Swap Button */}
        <div className="absolute right-2 top-7 z-10">
          <Button
            variant="ghost"
            onClick={handleSwap}
            aria-label="Swap starting and ending locations"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center p-0"
          >
            <svg
              className="w-4 h-4 text-text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </Button>
        </div>

        {/* To Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search destination stop..."
            value={toQuery}
            aria-label="Destination stop"
            onFocus={async () => {
              setActiveInput("to");
              setSugs(await SearchController.getSuggestions(toQuery));
            }}
            onChange={(e) => handleInputChange(e.target.value, "to")}
            className="w-full h-10 px-3 pr-10 text-xs font-semibold rounded-xl bg-white/5 border border-white/5 focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/30 text-text-primary placeholder:text-text-muted outline-none transition-all"
          />
        </div>

        {/* Suggestions Popover */}
        {activeInput && sugs.length > 0 && (
          <SearchSuggestions
            suggestions={sugs}
            onSelect={handleSelectSuggestion}
          />
        )}
      </div>

      {/* Suggested endpoints when no results yet */}
      {fromQuery === "" && toQuery === "" ? (
        <>
          <PopularDestinations onSelect={(dest) => handleInputChange(dest, "to")} />
          <RecentSearches onSelect={(dest) => handleInputChange(dest, "to")} />
        </>
      ) : (
        <SearchResults onSelectJourney={onSelectJourney} />
      )}
    </Card>
  );
};

SearchPanel.displayName = "SearchPanel";
export default SearchPanel;
