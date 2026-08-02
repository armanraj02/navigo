"use client";

import React from "react";

interface OriginInputProps {
  value: string;
  onChange: (val: string) => void;
  onFocus: () => void;
}

export const OriginInput: React.FC<OriginInputProps> = ({
  value,
  onChange,
  onFocus,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3 text-emerald-400 pointer-events-none">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="5" className="fill-emerald-400/20" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Starting location..."
        value={value}
        aria-label="Starting location"
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 pl-9 pr-3 text-xs font-semibold rounded-xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:bg-white/10 focus:ring-1 focus:ring-emerald-500/30 text-text-primary placeholder:text-text-muted outline-none transition-all"
      />
    </div>
  );
};

OriginInput.displayName = "OriginInput";
export default OriginInput;
