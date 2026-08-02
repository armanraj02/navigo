"use client";

import React from "react";
import { useSceneStore } from "@/store/sceneStore";

export const FogSystem: React.FC = () => {
  const fogDensity = useSceneStore((state) => state.fogDensity);
  const isNightMode = useSceneStore((state) => state.isNightMode);

  // Dynamic fog color depending on daytime
  const fogColor = isNightMode ? "#09090b" : "#f4f4f5";

  return <fogExp2 attach="fog" args={[fogColor, fogDensity]} />;
};

FogSystem.displayName = "FogSystem";
export default FogSystem;
