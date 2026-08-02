"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";

export const StopHighlights: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const scale = 1.0 + Math.sin(t * 3.5) * 0.15;
      ringRef.current.scale.set(scale, scale, 1);
    }
  });

  if (!selectedJourney) return null;

  const startStop = MOCK_STOPS.find((s) => s.id === selectedJourney.fromStopId);
  if (!startStop) return null;

  return (
    <group position={[startStop.position[0], 0.05, startStop.position[2]]}>
      {/* Origin Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.0}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

StopHighlights.displayName = "StopHighlights";
export default StopHighlights;
