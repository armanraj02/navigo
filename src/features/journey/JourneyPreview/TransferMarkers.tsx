"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";

export const TransferMarkers: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const scale = 0.9 + Math.sin(t * 4.5) * 0.1;
      ringRef.current.scale.set(scale, scale, 1);
    }
  });

  if (!selectedJourney) return null;

  // Filter transfer segments
  const transferSegments = selectedJourney.segments.filter(
    (seg) => seg.type === "transfer"
  );

  return (
    <group>
      {transferSegments.map((seg, idx) => {
        const stop = MOCK_STOPS.find((s) => s.id === seg.fromStopId);
        if (!stop) return null;

        return (
          <group
            key={idx}
            position={[stop.position[0], 0.05, stop.position[2]]}
          >
            {/* Transfer Orange Ring */}
            <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.0, 1.3, 24]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={1.2}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

TransferMarkers.displayName = "TransferMarkers";
export default TransferMarkers;
