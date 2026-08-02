"use client";

import React from "react";
import { useSearchStore } from "../SearchState";

interface RecentSearchesProps {
  onSelect: (dest: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ onSelect }) => {
  const recentSearches = useSearchStore((s) => s.recentSearches);

  if (recentSearches.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
        Recent Searches
      </span>
      <div className="flex flex-col gap-1">
        {recentSearches.map((term, i) => (
          <button
            key={i}
            className="flex items-center gap-2.5 text-xs text-text-secondary hover:text-text-primary py-1.5 px-2 rounded-md hover:bg-white/5 transition-colors text-left w-full"
            onClick={() => onSelect(term)}
          >
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
            <span className="font-medium truncate">{term}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

RecentSearches.displayName = "RecentSearches";
export default RecentSearches;
