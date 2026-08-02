"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/store/sceneStore";

export const LightingSystem: React.FC = () => {
  const isNightMode = useSceneStore((state) => state.isNightMode);
  const timeOfDay = useSceneStore((state) => state.timeOfDay);

  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Smoothly transition light intensities during render loop ticks
  useFrame(() => {
    if (!dirLightRef.current) return;
    
    // Position directional light to simulate sun/moon movement
    const rad = (timeOfDay / 24) * Math.PI * 2;
    const x = Math.cos(rad) * 100;
    const y = Math.sin(rad) * 100;
    const z = 30; // constant offset

    dirLightRef.current.position.set(x, Math.max(y, 10), z); // Keep sun slightly above horizon
  });

  return (
    <>
      {/* Ambient Daylight Fills */}
      <ambientLight intensity={isNightMode ? 0.08 : 0.45} />

      {/* Hemisphere sky colors reflection light */}
      <hemisphereLight
        args={[isNightMode ? "#09091e" : "#80a0ff", isNightMode ? "#020205" : "#303050", 0.4]}
      />

      {/* Directional Sun/Moon light with shadow casting properties */}
      <directionalLight
        ref={dirLightRef}
        intensity={isNightMode ? 0.2 : 0.9}
        color={isNightMode ? "#b0d0ff" : "#fff3e0"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={250}
        shadow-camera-left={-75}
        shadow-camera-right={75}
        shadow-camera-top={75}
        shadow-camera-bottom={-75}
        shadow-bias={-0.0005}
      />
    </>
  );
};

LightingSystem.displayName = "LightingSystem";
export default LightingSystem;
