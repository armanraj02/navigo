"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Wet road reflection plane — animated emissive ripple
export const RoadReflectionSystem: React.FC = () => {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.elapsedTime;
    matRef.current.emissiveIntensity = 0.04 + Math.sin(t * 0.7) * 0.02;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        ref={matRef}
        color="#0f172a"
        emissive="#0071e3"
        emissiveIntensity={0.04}
        roughness={0.05}
        metalness={0.8}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
};

RoadReflectionSystem.displayName = "RoadReflectionSystem";
export default RoadReflectionSystem;
