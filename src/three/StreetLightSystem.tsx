"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LIGHT_POSITIONS: Array<[number, number, number]> = [
  [10, 0, 10], [-10, 0, 10], [10, 0, -10], [-10, 0, -10],
  [30, 0, 0],  [-30, 0, 0],  [0, 0, 30],   [0, 0, -30],
  [30, 0, 30], [-30, 0, 30], [30, 0, -30], [-30, 0, -30],
  [50, 0, 10], [-50, 0, 10], [50, 0, -10], [-50, 0, -10],
];

const POLE_HEIGHT = 7;

export const StreetLightSystem: React.FC = () => {
  const emissiveRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (emissiveRef.current) {
      // Subtle flicker on night lights
      const t = clock.elapsedTime;
      emissiveRef.current.emissiveIntensity = 0.8 + Math.sin(t * 4.3) * 0.05;
    }
  });

  return (
    <group>
      {LIGHT_POSITIONS.map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[2]]}>
          {/* Pole */}
          <mesh position={[0, POLE_HEIGHT / 2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, POLE_HEIGHT, 6]} />
            <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.3} />
          </mesh>

          {/* Lamp arm */}
          <mesh position={[0.6, POLE_HEIGHT - 0.2, 0]}>
            <boxGeometry args={[1.2, 0.06, 0.06]} />
            <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.3} />
          </mesh>

          {/* Lamp head */}
          <mesh position={[1.1, POLE_HEIGHT - 0.3, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.3]} />
            <meshStandardMaterial
              ref={i === 0 ? emissiveRef : undefined}
              color="#fef3c7"
              emissive="#fde68a"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Point light from lamp */}
          <pointLight
            position={[1.1, POLE_HEIGHT - 0.5, 0]}
            intensity={12}
            distance={20}
            decay={2}
            color="#fde68a"
          />
        </group>
      ))}
    </group>
  );
};

StreetLightSystem.displayName = "StreetLightSystem";
export default StreetLightSystem;
