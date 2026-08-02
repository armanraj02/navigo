"use client";

import React from "react";
import { Card } from "@/components/ui";

interface TransferCardProps {
  fromStopName: string;
  durationMinutes: number;
}

export const TransferCard: React.FC<TransferCardProps> = ({
  fromStopName,
  durationMinutes,
}) => {
  return (
    <Card className="p-3 bg-amber-500/5 border-amber-500/20 rounded-xl flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-amber-400">
        <svg
          className="w-4 h-4 shrink-0 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <div className="flex flex-col gap-0.5">
          <span className="font-extrabold text-[10px] uppercase font-mono tracking-wider">
            Transfer Point
          </span>
          <span className="text-text-secondary font-medium">
            Change route at <strong className="text-text-primary">{fromStopName}</strong>
          </span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded font-mono">
        {durationMinutes}m layover
      </span>
    </Card>
  );
};

TransferCard.displayName = "TransferCard";
export default TransferCard;
