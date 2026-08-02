"use client";

import React from "react";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";
import { Card } from "@/components/ui";
import { ComparisonRow } from "./ComparisonRow";
import { EcoScoreBadge } from "./EcoScoreBadge";

export const JourneyComparisonPanel: React.FC = () => {
  const comparisonList = useJourneyStore((s) => s.comparisonJourneys);
  const clearComparison = useJourneyStore((s) => s.clearComparison);

  if (comparisonList.length === 0) return null;

  // Helpers to calculate winner indices
  const getMinValIdx = (arr: number[]) => {
    let min = Infinity;
    let minIdx = -1;
    arr.forEach((v, idx) => {
      if (v < min) {
        min = v;
        minIdx = idx;
      }
    });
    return minIdx;
  };

  const getMaxValIdx = (arr: number[]) => {
    let max = -Infinity;
    let maxIdx = -1;
    arr.forEach((v, idx) => {
      if (v > max) {
        max = v;
        maxIdx = idx;
      }
    });
    return maxIdx;
  };

  const durations = comparisonList.map((j) => j.totalDurationMinutes);
  const fares = comparisonList.map((j) => j.fare);
  const transfers = comparisonList.map((j) => j.transfers);
  const ecoScores = comparisonList.map((j) => j.environmentScore);

  const durationWinnerIdx = getMinValIdx(durations);
  const fareWinnerIdx = getMinValIdx(fares);
  const transferWinnerIdx = getMinValIdx(transfers);
  const ecoWinnerIdx = getMaxValIdx(ecoScores);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          Side-By-Side Comparison ({comparisonList.length}/3)
        </span>
        <button
          onClick={clearComparison}
          className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        {/* Headers */}
        <div className="grid grid-cols-4 border-b border-white/15 pb-2 text-[10px] font-bold text-text-muted uppercase font-mono tracking-wider text-center">
          <span className="text-left">Metric</span>
          {comparisonList.map((j, idx) => (
            <span key={j.id} className="text-center truncate">
              Opt {idx + 1} ({j.primaryRouteId})
            </span>
          ))}
        </div>

        {/* Travel Time Row */}
        <ComparisonRow
          label="Travel Time"
          values={comparisonList.map((j) => `${j.totalDurationMinutes}m`)}
          winnerIndex={durationWinnerIdx}
        />

        {/* Fare Row */}
        <ComparisonRow
          label="Est. Fare"
          values={comparisonList.map((j) => `$${j.fare.toFixed(2)}`)}
          winnerIndex={fareWinnerIdx}
        />

        {/* Transfers Row */}
        <ComparisonRow
          label="Transfers"
          values={comparisonList.map((j) => j.transfers === 0 ? "Direct" : `${j.transfers}`)}
          winnerIndex={transferWinnerIdx}
        />

        {/* Eco Score Row */}
        <ComparisonRow
          label="Eco Rating"
          values={comparisonList.map((j) => (
            <EcoScoreBadge key={j.id} score={j.environmentScore} />
          ))}
          winnerIndex={ecoWinnerIdx}
        />

        {/* Action Quick Select Row */}
        <div className="grid grid-cols-4 pt-3.5 items-center">
          <span className="text-[9px] font-extrabold text-text-muted uppercase font-mono">
            Action
          </span>
          {comparisonList.map((j) => (
            <div key={j.id} className="flex justify-center px-1">
              <button
                onClick={() => JourneyCoordinator.selectJourney(j)}
                className="text-[9px] font-bold uppercase bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded transition-colors active:scale-95 duration-150 shadow-md shadow-blue-500/10"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

JourneyComparisonPanel.displayName = "JourneyComparisonPanel";
export default JourneyComparisonPanel;
