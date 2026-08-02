"use client";

import React from "react";
import { AnimatedRouteSpline } from "./AnimatedRouteSpline";
import { WalkingPath } from "./WalkingPath";
import { TransferMarkers } from "./TransferMarkers";
import { StopHighlights } from "./StopHighlights";
import { DestinationMarker } from "./DestinationMarker";
import { useJourneyStore } from "../JourneyState/JourneyState";

export const PreviewController: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);

  if (!selectedJourney) return null;

  return (
    <group>
      <AnimatedRouteSpline />
      <WalkingPath />
      <TransferMarkers />
      <StopHighlights />
      <DestinationMarker />
    </group>
  );
};

PreviewController.displayName = "PreviewController";
export default PreviewController;
