"use client";

import React from "react";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";
import { Card, Button } from "@/components/ui";

export const JourneyPreviewPanel: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const previewMode = useJourneyStore((s) => s.previewMode);

  if (!selectedJourney) return null;

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          Active Preview Mode: {previewMode}
        </span>
        <button
          onClick={() => JourneyCoordinator.clearJourney()}
          className="text-text-muted hover:text-text-primary transition-colors text-xs font-semibold"
          aria-label="Close journey preview"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded text-white font-mono"
            style={{ backgroundColor: selectedJourney.primaryRouteColor }}
          >
            {selectedJourney.primaryRouteId}
          </span>
          <span className="text-xs font-extrabold text-text-primary">
            {selectedJourney.fromStopName} to {selectedJourney.toStopName}
          </span>
        </div>

        <p className="text-[11px] text-text-secondary font-semibold mt-1">
          Travel time estimated at <strong className="text-blue-400 font-extrabold">{selectedJourney.totalDurationMinutes} mins</strong>.
          Requires <strong className="text-text-primary">{selectedJourney.transfers} transfers</strong> and <strong className="text-text-primary">{selectedJourney.walkingMinutes} mins</strong> walking.
        </p>
      </div>

      <div className="flex gap-2 border-t border-white/5 pt-3 mt-1 w-full">
        <Button
          variant="primary"
          onClick={() => JourneyCoordinator.enterFollowMode()}
          className="flex-1 text-xs h-9 justify-center font-bold"
        >
          Follow Route
        </Button>
        <Button
          variant="ghost"
          onClick={() => JourneyCoordinator.enterOverviewMode()}
          className="flex-1 text-xs h-9 justify-center bg-white/5 border border-white/5 font-bold hover:bg-white/10"
        >
          Overview
        </Button>
      </div>
    </Card>
  );
};

JourneyPreviewPanel.displayName = "JourneyPreviewPanel";
export default JourneyPreviewPanel;
