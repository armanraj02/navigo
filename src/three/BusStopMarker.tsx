"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { BusStopManager } from "./simulation/BusStopManager";

const MARKER_HEIGHT = 4;

export const BusStopMarker: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const stops = BusStopManager.getAllStops();

  return (
    <group ref={groupRef}>
      {stops.map((stop) => (
        <group
          key={stop.id}
          position={[stop.position[0], 0, stop.position[2]]}
          onClick={() => BusStopManager.selectStop(stop.id)}
        >
          {/* Pole */}
          <mesh castShadow position={[0, MARKER_HEIGHT / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, MARKER_HEIGHT, 6]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Sign cap */}
          <mesh position={[0, MARKER_HEIGHT, 0]}>
            <boxGeometry args={[0.6, 0.3, 0.08]} />
            <meshStandardMaterial color="#0071e3" emissive="#0071e3" emissiveIntensity={0.3} />
          </mesh>

          {/* Ground ring indicator */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[0.6, 0.8, 24]} />
            <meshStandardMaterial
              color="#0071e3"
              emissive="#0071e3"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

BusStopMarker.displayName = "BusStopMarker";
export default BusStopMarker;
