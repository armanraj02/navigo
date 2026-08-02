"use client";

import React from "react";

interface FareChipProps {
  amount: number;
}

export const FareChip: React.FC<FareChipProps> = ({ amount }) => {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full select-none font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
      ${amount.toFixed(2)}
    </span>
  );
};

FareChip.displayName = "FareChip";
export default FareChip;
