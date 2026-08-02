"use client";

import React from "react";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (dest: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background-glass border border-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-1 max-h-48 overflow-y-auto">
      {suggestions.map((sug, i) => (
        <button
          key={i}
          className="flex items-center gap-2.5 text-xs text-text-secondary hover:text-text-primary py-2 px-3 rounded-lg hover:bg-white/5 transition-colors text-left w-full"
          onClick={() => onSelect(sug)}
        >
          <svg
            className="w-3.5 h-3.5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-semibold">{sug}</span>
        </button>
      ))}
    </div>
  );
};

SearchSuggestions.displayName = "SearchSuggestions";
export default SearchSuggestions;
