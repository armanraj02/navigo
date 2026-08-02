"use client";

import React from "react";

interface ETASectionProps {
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
}

export const ETASection: React.FC<ETASectionProps> = ({
  departureTime,
  arrivalTime,
  durationMinutes,
}) => {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/5 p-2 rounded-xl text-[11px]">
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">DEP</span>
        <span className="font-bold text-text-primary font-mono">{departureTime}</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 px-3 border-x border-white/5">
        <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">DURATION</span>
        <span className="font-bold text-blue-400 font-mono">{durationMinutes}m</span>
      </div>
      <div className="flex flex-col gap-0.5 items-end">
        <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">ARR</span>
        <span className="font-bold text-text-primary font-mono">{arrivalTime}</span>
      </div>
    </div>
  );
};

ETASection.displayName = "ETASection";
export default ETASection;
