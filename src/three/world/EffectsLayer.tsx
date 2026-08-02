"use client";

import React from "react";
import { RoadReflectionSystem } from "../RoadReflectionSystem";
import { PostProcessing } from "../PostProcessing";
import { DebugRenderer } from "../DebugRenderer";

import { PreviewController } from "@/features/journey/JourneyPreview/PreviewController";
import { ReplayMarkers } from "@/features/transit/ReplaySystem/ReplayMarkers";
import { TransitDebugger } from "@/features/transit/TransitDebugger/TransitDebugger";

export const EffectsLayer: React.FC = () => {
  return (
    <>
      <RoadReflectionSystem />
      <PostProcessing />
      <DebugRenderer />
      <PreviewController />
      <ReplayMarkers />
      <TransitDebugger />
    </>
  );
};

EffectsLayer.displayName = "EffectsLayer";
export default EffectsLayer;
