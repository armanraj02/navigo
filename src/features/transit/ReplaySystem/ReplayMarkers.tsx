"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReplayStore } from "./ReplayStore";

export const ReplayMarkers: React.FC = () => {
  const progress = useReplayStore((s) => s.progress);
  const replayPath = useReplayStore((s) => s.replayPath);
  const selectedRouteId = useReplayStore((s) => s.selectedRouteId);

  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    if (replayPath.length < 2) return null;
    const points = replayPath.map((p) => new THREE.Vector3(p[0], p[1] + 0.5, p[2]));
    return new THREE.CatmullRomCurve3(points);
  }, [replayPath]);

  useFrame(() => {
    if (!curve || !meshRef.current) return;
    
    // Position interpolation
    const pos = curve.getPointAt(progress);
    meshRef.current.position.copy(pos);

    // Tangent rotation
    const tangent = curve.getTangentAt(progress).normalize();
    const targetRotation = Math.atan2(tangent.x, tangent.z);
    meshRef.current.rotation.y = targetRotation;
  });

  if (!selectedRouteId || !curve) return null;

  return (
    <mesh ref={meshRef}>
      {/* Ghost vehicle mesh */}
      <boxGeometry args={[1.5, 1.2, 3.2]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

ReplayMarkers.displayName = "ReplayMarkers";
export default ReplayMarkers;
