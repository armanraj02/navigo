"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudProps {
  position: [number, number, number];
  scale: [number, number, number];
  speed: number;
  range: number;
}

const CLOUDS: CloudProps[] = [
  { position: [-60, 40, -80], scale: [18, 5, 10], speed: 0.6,  range: 40 },
  { position: [30,  45, -90], scale: [14, 4, 8],  speed: 0.4,  range: 50 },
  { position: [-20, 50, -70], scale: [22, 6, 12], speed: 0.5,  range: 35 },
  { position: [70,  38, -85], scale: [10, 3, 6],  speed: 0.8,  range: 45 },
  { position: [-80, 42, -95], scale: [16, 5, 9],  speed: 0.35, range: 55 },
];

const CloudMesh: React.FC<CloudProps & { index: number }> = ({
  position,
  scale,
  speed,
  range,
  index,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const originX = position[0];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const offset = ((t * speed + index * 12) % range) - range / 2;
    ref.current.position.x = originX + offset;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow={false}>
      <sphereGeometry args={[1, 7, 5]} />
      <meshStandardMaterial
        color="#e4e4e7"
        transparent
        opacity={0.55}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

export const CloudAnimator: React.FC = () => {
  return (
    <group>
      {CLOUDS.map((cloud, i) => (
        <CloudMesh key={i} {...cloud} index={i} />
      ))}
    </group>
  );
};

CloudAnimator.displayName = "CloudAnimator";
export default CloudAnimator;
