"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WorldClock } from "./simulation/WorldClock";
import { useSceneStore } from "@/store/sceneStore";

export const EnvironmentAnimator: React.FC = () => {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const isNightMode = useSceneStore((s) => s.isNightMode);

  useFrame(() => {
    const { dayProgress } = WorldClock.getTime();

    if (ambientRef.current) {
      // Dawn: 0.25, Day: 0.5, Dusk: 0.75, Night: 0.0/1.0
      const dayBrightness = isNightMode
        ? 0.05
        : Math.max(0.05, Math.sin(dayProgress * Math.PI));
      ambientRef.current.intensity = dayBrightness * 0.6;
    }

    if (dirRef.current) {
      const angle = dayProgress * Math.PI * 2 - Math.PI / 2;
      dirRef.current.position.set(
        Math.cos(angle) * 80,
        Math.sin(angle) * 60,
        30
      );
      dirRef.current.intensity = isNightMode
        ? 0
        : Math.max(0, Math.sin(dayProgress * Math.PI)) * 2.5;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.4} />
      <directionalLight
        ref={dirRef}
        position={[60, 50, 30]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
    </>
  );
};

EnvironmentAnimator.displayName = "EnvironmentAnimator";
export default EnvironmentAnimator;
