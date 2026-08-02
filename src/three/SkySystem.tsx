"use client";

import React from "react";
import { Sky } from "@react-three/drei";
import { useSceneStore } from "@/store/sceneStore";

export const SkySystem: React.FC = () => {
  const timeOfDay = useSceneStore((state) => state.timeOfDay);
  const isNightMode = useSceneStore((state) => state.isNightMode);

  // Compute sun position vector based on time of day (0-24h)
  const rad = (timeOfDay / 24) * Math.PI * 2;
  const sunPosition: [number, number, number] = [
    Math.cos(rad) * 100,
    Math.sin(rad) * 100,
    30,
  ];

  return (
    <Sky
      distance={450000}
      sunPosition={sunPosition}
      turbidity={isNightMode ? 20 : 8}
      rayleigh={isNightMode ? 0.2 : 1.5}
      mieCoefficient={0.005}
      mieDirectionalG={0.8}
    />
  );
};

SkySystem.displayName = "SkySystem";
export default SkySystem;
