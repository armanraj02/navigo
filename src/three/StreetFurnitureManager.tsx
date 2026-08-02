"use client";

import React from "react";

// Road crossing stripes near each major intersection
const CROSSING_POSITIONS: Array<[number, number, number]> = [
  [10, 0.01, 0], [-10, 0.01, 0], [0, 0.01, 10], [0, 0.01, -10],
];

export const PedestrianCrossingGenerator: React.FC = () => {
  return (
    <group>
      {CROSSING_POSITIONS.map((pos, i) => (
        <group key={i} position={pos} rotation={[0, i < 2 ? 0 : Math.PI / 2, 0]}>
          {Array.from({ length: 5 }).map((_, s) => (
            <mesh key={s} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, s * 0.6 - 1.2]}>
              <planeGeometry args={[3.5, 0.35]} />
              <meshStandardMaterial color="#e4e4e7" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

// Road sign poles scattered through the city
const SIGN_POSITIONS: Array<[number, number, number]> = [
  [9, 0, 9], [-9, 0, 9], [9, 0, -9], [-9, 0, -9],
  [25, 0, 0], [-25, 0, 0],
];

export const RoadSignGenerator: React.FC = () => {
  return (
    <group>
      {SIGN_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 3, 5]} />
            <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 3.1, 0]}>
            <boxGeometry args={[0.5, 0.3, 0.06]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Benches scattered in open areas
const BENCH_POSITIONS: Array<[number, number, number]> = [
  [8, 0, -8], [-8, 0, -8], [15, 0, -15],
  [-15, 0, -15], [22, 0, 5],
];

export const BenchGenerator: React.FC = () => {
  return (
    <group>
      {BENCH_POSITIONS.map((pos, i) => (
        <group key={i} position={pos} rotation={[0, (i * 0.8) % (Math.PI * 2), 0]}>
          {/* Seat */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.5, 0.08, 0.45]} />
            <meshStandardMaterial color="#854d0e" roughness={0.8} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.7, -0.18]}>
            <boxGeometry args={[1.5, 0.4, 0.06]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          {/* Legs */}
          {[-0.6, 0.6].map((x) => (
            <mesh key={x} position={[x, 0.2, 0]} castShadow>
              <boxGeometry args={[0.06, 0.4, 0.45]} />
              <meshStandardMaterial color="#52525b" metalness={0.7} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

export const StreetFurnitureManager: React.FC = () => {
  return (
    <group>
      <PedestrianCrossingGenerator />
      <RoadSignGenerator />
      <BenchGenerator />
    </group>
  );
};

StreetFurnitureManager.displayName = "StreetFurnitureManager";
PedestrianCrossingGenerator.displayName = "PedestrianCrossingGenerator";
RoadSignGenerator.displayName = "RoadSignGenerator";
BenchGenerator.displayName = "BenchGenerator";

export default StreetFurnitureManager;
