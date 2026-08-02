"use client";

import React from "react";
import { useSceneStore } from "@/store/sceneStore";

export const GroundPlane: React.FC = () => {
  const isNightMode = useSceneStore((state) => state.isNightMode);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        color={isNightMode ? "#09090b" : "#f4f4f5"}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

GroundPlane.displayName = "GroundPlane";
export default GroundPlane;
