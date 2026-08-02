"use client";

import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useCameraStore } from "@/store/cameraStore";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export const OrbitController: React.FC = () => {
  const mode = useCameraStore((state) => state.mode);
  const target = useCameraStore((state) => state.target);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const isEnabled = mode === "orbit";

  useEffect(() => {
    if (isEnabled && controlsRef.current) {
      controlsRef.current.target.set(...target);
      controlsRef.current.update();
    }
  }, [isEnabled, target]);

  if (!isEnabled) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2.1} // Prevent going below ground level
      minDistance={10}
      maxDistance={250}
    />
  );
};

OrbitController.displayName = "OrbitController";
export default OrbitController;
