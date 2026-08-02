"use client";

import React from "react";
import * as THREE from "three";
import { useSearchStore } from "@/features/search/SearchState";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";

export const WalkingPath: React.FC = () => {
  const selectedJourney = useSearchStore((s) => s.selectedJourney);

  if (!selectedJourney) return null;

  const startStop = MOCK_STOPS.find((s) => s.id === selectedJourney.fromStopId);
  if (!startStop) return null;

  // Draw walking connector to startStop from offset location
  const walkStart = new THREE.Vector3(
    startStop.position[0] - 6,
    0.15,
    startStop.position[2] - 6
  );
  const walkEnd = new THREE.Vector3(
    startStop.position[0],
    0.15,
    startStop.position[2]
  );

  const points = [walkStart, walkEnd];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <lineSegments>
      <primitive object={geometry} />
      <lineDashedMaterial
        color="#a1a1aa"
        dashSize={0.5}
        gapSize={0.3}
        linewidth={2}
        transparent
        opacity={0.7}
      />
    </lineSegments>
  );
};

WalkingPath.displayName = "WalkingPath";
export default WalkingPath;
