"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simplified tree wind — scales tree canopies on a sine wave
const TREE_POSITIONS: Array<[number, number, number]> = [
  [15, 0, 15], [-15, 0, 15], [25, 0, -5], [-25, 0, -10],
  [5, 0, 30],  [-5, 0, 30],  [40, 0, 20], [-40, 0, 20],
];

export const TreeWindAnimator: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      // Only animate the canopy (second child = index 1)
      const canopy = child.children[1] as THREE.Mesh | undefined;
      if (!canopy) return;
      const phase = i * 0.7;
      const sway = Math.sin(t * 1.2 + phase) * 0.04;
      canopy.rotation.z = sway;
      canopy.rotation.x = Math.sin(t * 0.8 + phase) * 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      {TREE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.22, 1.5, 6]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          {/* Canopy — wind-animated */}
          <mesh position={[0, 2.8, 0]} castShadow>
            <coneGeometry args={[1.0, 2.5, 7]} />
            <meshStandardMaterial color="#15803d" roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

TreeWindAnimator.displayName = "TreeWindAnimator";
export default TreeWindAnimator;
