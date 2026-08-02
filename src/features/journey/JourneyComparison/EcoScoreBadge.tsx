"use client";

import React from "react";

interface EcoScoreBadgeProps {
  score: number;
}

export const EcoScoreBadge: React.FC<EcoScoreBadgeProps> = ({ score }) => {
  const isHigh = score >= 80;
  const isMed = score >= 60 && score < 80;

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
        isHigh
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : isMed
          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
      }`}
    >
      {score} Eco
    </span>
  );
};

EcoScoreBadge.displayName = "EcoScoreBadge";
export default EcoScoreBadge;
