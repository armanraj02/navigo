"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";

export const DestinationMarker: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const meshRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = 4.5 + Math.sin(t * 4) * 0.25;
      meshRef.current.rotation.y = t * 1.5;
    }
    if (beaconRef.current) {
      const scale = 1.0 + Math.sin(t * 3) * 0.25;
      beaconRef.current.scale.set(scale, scale, 1);
    }
  });

  if (!selectedJourney) return null;

  const endStop = MOCK_STOPS.find((s) => s.id === selectedJourney.toStopId);
  if (!endStop) return null;

  return (
    <group position={[endStop.position[0], 0, endStop.position[2]]}>
      {/* Target Floor Pulse */}
      <mesh ref={beaconRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.5, 1.8, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Diamond Pin */}
      <mesh ref={meshRef} position={[0, 4.5, 0]} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

DestinationMarker.displayName = "DestinationMarker";
export default DestinationMarker;
