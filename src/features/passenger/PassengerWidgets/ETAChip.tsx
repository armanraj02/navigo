"use client";

import React from "react";

interface ETAChipProps {
  minutes: number;
}

export const ETAChip: React.FC<ETAChipProps> = ({ minutes }) => {
  const isDue = minutes <= 1;
  const isDelayed = minutes > 20;

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full select-none font-mono ${
        isDue
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse"
          : isDelayed
          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      }`}
    >
      {isDue ? "Due" : `${minutes} min`}
    </span>
  );
};

ETAChip.displayName = "ETAChip";
export default ETAChip;
