"use client";

import React from "react";
import { Grid } from "@react-three/drei";
import { useSceneStore } from "@/store/sceneStore";

export const GridSystem: React.FC = () => {
  const isNightMode = useSceneStore((state) => state.isNightMode);

  return (
    <Grid
      position={[0, -0.01, 0]}
      args={[200, 200]}
      cellSize={4}
      cellThickness={0.5}
      cellColor={isNightMode ? "#0071e3" : "#808080"}
      sectionSize={20}
      sectionThickness={1.0}
      sectionColor={isNightMode ? "#00e3a5" : "#404040"}
      fadeDistance={250}
      infiniteGrid
    />
  );
};

GridSystem.displayName = "GridSystem";
export default GridSystem;
