"use client";

import React from "react";
import { Card } from "@/components/ui";
import { ETASection } from "./ETASection";
import type { JourneyOption } from "../JourneyState/JourneyTypes";

interface JourneyCardProps {
  journey: JourneyOption;
  isSelected: boolean;
  onSelect: () => void;
  onCompareToggle: (e: React.MouseEvent) => void;
  isCompared: boolean;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({
  journey,
  isSelected,
  onSelect,
  onCompareToggle,
  isCompared,
}) => {
  const isHighOccupancy = journey.occupancy > 0.7;
  const occupancyText = isHighOccupancy
    ? "Crowded"
    : journey.occupancy > 0.4
    ? "Moderate"
    : "Standing Room";

  return (
    <Card
      onClick={onSelect}
      className={`p-4 bg-background-glass border backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] ${
        isSelected
          ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border-white/10 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {journey.isRecommended && (
              <span className="text-[9px] font-bold text-white bg-blue-500/80 border border-blue-500/30 px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                Recommended
              </span>
            )}
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono tracking-wider">
              {journey.environmentScore} Eco
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded text-white font-mono"
              style={{ backgroundColor: journey.primaryRouteColor }}
            >
              {journey.primaryRouteId}
            </span>
            <span className="text-xs font-bold text-text-primary truncate">
              {journey.fromStopName.split(" ")[0]} to {journey.toStopName.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-sm font-extrabold text-text-primary font-mono">
            ${journey.fare.toFixed(2)}
          </span>
          <span className="text-[9px] text-text-muted font-bold uppercase font-mono tracking-wider mt-0.5">
            {journey.transfers === 0 ? "Direct" : `${journey.transfers} transfer`}
          </span>
        </div>
      </div>

      <ETASection
        departureTime={journey.departureTime}
        arrivalTime={journey.arrivalTime}
        durationMinutes={journey.totalDurationMinutes}
      />

      <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-text-secondary font-medium">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isHighOccupancy ? "bg-rose-500" : "bg-emerald-500"
            }`}
          />
          <span>{occupancyText}</span>
        </div>

        <button
          onClick={onCompareToggle}
          className={`font-semibold border rounded-lg px-2.5 py-1 transition-colors ${
            isCompared
              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
              : "bg-white/5 border-white/5 text-text-muted hover:text-text-primary hover:bg-white/10"
          }`}
        >
          {isCompared ? "Compared" : "Compare"}
        </button>
      </div>
    </Card>
  );
};

JourneyCard.displayName = "JourneyCard";
export default JourneyCard;
