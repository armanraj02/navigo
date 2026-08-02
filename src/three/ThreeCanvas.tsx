"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Bvh } from "@react-three/drei";
import { RendererConfig } from "./RendererConfig";
import { SceneRoot } from "./SceneRoot";
import { MapCameraSync } from "@/maps/MapCameraSync";

export const ThreeCanvas: React.FC = () => {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: RendererConfig.toneMapping,
        toneMappingExposure: RendererConfig.toneMappingExposure,
      }}
      camera={{
        position: [0, 60, 100],
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
      className="h-full w-full"
    >
      {/* Google Maps camera synchronization loop */}
      <MapCameraSync />

      {/* Raycast optimization using BVH bounding volumes */}
      <Bvh firstHitOnly>
        <SceneRoot />
      </Bvh>

      {/* Adaptive device pixel ratio frame scaling */}
      <AdaptiveDpr />
    </Canvas>
  );
};

ThreeCanvas.displayName = "ThreeCanvas";
export default ThreeCanvas;
