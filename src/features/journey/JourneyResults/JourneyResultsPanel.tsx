"use client";

import React, { useTransition } from "react";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";
import { JourneyCard } from "./JourneyCard";
import { JourneyFilterBar } from "../JourneyFilters/JourneyFilterBar";
import { RouteOptionCard } from "./RouteOptionCard";
import { TransferCard } from "./TransferCard";
import { sortJourneys } from "../RouteEngine/RouteSorter";
import { JourneyOption, JourneySortMode } from "../JourneyState/JourneyTypes";

export const JourneyResultsPanel: React.FC = () => {
  const options = useJourneyStore((s) => s.journeyOptions);
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const comparisonJourneys = useJourneyStore((s) => s.comparisonJourneys);
  const filter = useJourneyStore((s) => s.filter);
  const setSortMode = useJourneyStore((s) => s.setSortMode);
  const addToComparison = useJourneyStore((s) => s.addToComparison);
  const removeFromComparison = useJourneyStore((s) => s.removeFromComparison);

  const [, startTransition] = useTransition();

  const handleSelectJourney = (jrn: JourneyOption) => {
    JourneyCoordinator.selectJourney(jrn);
  };

  const handleCompareToggle = (e: React.MouseEvent, jrn: JourneyOption) => {
    e.stopPropagation();
    const isCompared = comparisonJourneys.some((j) => j.id === jrn.id);
    if (isCompared) {
      removeFromComparison(jrn.id);
    } else {
      addToComparison(jrn);
    }
  };

  const handleSortChange = (mode: JourneySortMode) => {
    startTransition(() => {
      setSortMode(mode);
      const sorted = sortJourneys(options, mode);
      useJourneyStore.getState().setOptions(sorted);
    });
  };

  if (options.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {!selectedJourney ? (
        <>
          <JourneyFilterBar
            currentSort={filter.sortMode}
            onSortChange={handleSortChange}
          />
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
            {options.map((jrn) => {
              const isCompared = comparisonJourneys.some((j) => j.id === jrn.id);
              return (
                <JourneyCard
                  key={jrn.id}
                  journey={jrn}
                  isSelected={false}
                  onSelect={() => handleSelectJourney(jrn)}
                  onCompareToggle={(e) => handleCompareToggle(e, jrn)}
                  isCompared={isCompared}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
              Journey Legs Sequence
            </span>
            <button
              onClick={() => JourneyCoordinator.clearJourney()}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Back to Options
            </button>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
            {selectedJourney.segments.map((seg, idx) => {
              const isTransfer = seg.type === "transfer";
              const isWalk = seg.type === "walk";

              if (isTransfer) {
                return (
                  <TransferCard
                    key={idx}
                    fromStopName={seg.fromStopName}
                    durationMinutes={seg.durationMinutes}
                  />
                );
              }

              return (
                <RouteOptionCard
                  key={idx}
                  type={isWalk ? "walk" : "bus"}
                  routeName={seg.routeName}
                  routeId={seg.routeId}
                  routeColor={seg.routeColor}
                  fromStopName={seg.fromStopName}
                  toStopName={seg.toStopName}
                  durationMinutes={seg.durationMinutes}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

JourneyResultsPanel.displayName = "JourneyResultsPanel";
export default JourneyResultsPanel;
