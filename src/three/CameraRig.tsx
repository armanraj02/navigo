"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/store/cameraStore";

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const positionStore = useCameraStore((state) => state.position);
  const targetStore = useCameraStore((state) => state.target);
  const modeStore = useCameraStore((state) => state.mode);

  const targetVector = useRef(new THREE.Vector3(0, 0, 0));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Lerp coordinates based on delta times
    const lerpFactor = Math.min(delta * 4, 1.0); // Smooth spring physics lerp factor

    // Lerp Position (Only update camera position directly if mode is not OrbitControls manual drag)
    if (modeStore !== "orbit") {
      const targetPos = new THREE.Vector3(...positionStore);
      camera.position.lerp(targetPos, lerpFactor);
    }

    // Lerp target focus
    targetVector.current.set(...targetStore);
    currentTarget.current.lerp(targetVector.current, lerpFactor);
    camera.lookAt(currentTarget.current);
  });

  return null;
};

CameraRig.displayName = "CameraRig";
export default CameraRig;
