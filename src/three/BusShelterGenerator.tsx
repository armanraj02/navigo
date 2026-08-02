"use client";

import React from "react";
import * as THREE from "three";
import { BusStopManager } from "./simulation/BusStopManager";

// Bus shelter near each stop
export const BusShelterGenerator: React.FC = () => {
  const stops = BusStopManager.getAllStops();

  return (
    <group>
      {stops.map((stop) => (
        <group
          key={stop.id}
          position={[stop.position[0] + 2, 0, stop.position[2] + 0.5]}
        >
          {/* Shelter back wall */}
          <mesh castShadow position={[0, 1.5, -0.8]}>
            <boxGeometry args={[3, 3, 0.08]} />
            <meshStandardMaterial
              color="#18181b"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Shelter roof */}
          <mesh castShadow position={[0, 3.05, 0]}>
            <boxGeometry args={[3.2, 0.1, 1.8]} />
            <meshStandardMaterial color="#0071e3" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Side panel left */}
          <mesh position={[-1.55, 1.5, 0]}>
            <boxGeometry args={[0.08, 3, 1.8]} />
            <meshStandardMaterial
              color="#18181b"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Bench */}
          <mesh castShadow position={[0, 0.4, -0.5]}>
            <boxGeometry args={[2.4, 0.1, 0.4]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.7} />
          </mesh>
          <mesh castShadow position={[-0.9, 0.22, -0.5]}>
            <boxGeometry args={[0.08, 0.44, 0.38]} />
            <meshStandardMaterial color="#27272a" />
          </mesh>
          <mesh castShadow position={[0.9, 0.22, -0.5]}>
            <boxGeometry args={[0.08, 0.44, 0.38]} />
            <meshStandardMaterial color="#27272a" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

BusShelterGenerator.displayName = "BusShelterGenerator";
export default BusShelterGenerator;
