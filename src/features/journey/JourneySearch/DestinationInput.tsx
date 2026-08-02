"use client";

import React from "react";

interface DestinationInputProps {
  value: string;
  onChange: (val: string) => void;
  onFocus: () => void;
}

export const DestinationInput: React.FC<DestinationInputProps> = ({
  value,
  onChange,
  onFocus,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3 text-blue-400 pointer-events-none">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
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
      </div>
      <input
        type="text"
        placeholder="Search destination stop..."
        value={value}
        aria-label="Destination stop"
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 pl-9 pr-3 text-xs font-semibold rounded-xl bg-white/5 border border-white/5 focus:border-blue-500/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/30 text-text-primary placeholder:text-text-muted outline-none transition-all"
      />
    </div>
  );
};

DestinationInput.displayName = "DestinationInput";
export default DestinationInput;
