"use client";

import React from "react";
import { useSettingsStore } from "@/store/settingsStore";

export const DebugRenderer: React.FC = () => {
  const graphicsQuality = useSettingsStore((state) => state.graphicsQuality);

  // Show debug helper lines if graphics quality profile is high
  const showHelpers = graphicsQuality === "high";

  if (!showHelpers) return null;

  return (
    <>
      <axesHelper args={[50]} />
      <gridHelper args={[100, 10, "#888888", "#444444"]} position={[0, 0.05, 0]} />
    </>
  );
};

DebugRenderer.displayName = "DebugRenderer";
export default DebugRenderer;
