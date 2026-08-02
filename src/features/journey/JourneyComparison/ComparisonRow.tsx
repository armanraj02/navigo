"use client";

import React from "react";

interface ComparisonRowProps {
  label: string;
  values: string[] | React.ReactNode[];
  winnerIndex?: number;
}

export const ComparisonRow: React.FC<ComparisonRowProps> = ({
  label,
  values,
  winnerIndex,
}) => {
  return (
    <div className="grid grid-cols-4 items-center border-b border-white/5 py-2.5 text-xs">
      <span className="font-bold text-text-muted text-[10px] uppercase font-mono tracking-wider">
        {label}
      </span>
      {values.map((val, idx) => {
        const isWinner = winnerIndex === idx;
        return (
          <div
            key={idx}
            className={`text-center font-semibold px-2 ${
              isWinner
                ? "text-blue-400 font-extrabold shadow-[inset_0_0_12px_rgba(59,130,246,0.06)] bg-blue-500/5 rounded-lg py-1 border border-blue-500/10"
                : "text-text-secondary"
            }`}
          >
            {val}
          </div>
        );
      })}
    </div>
  );
};

ComparisonRow.displayName = "ComparisonRow";
export default ComparisonRow;
