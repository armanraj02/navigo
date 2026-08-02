"use client";

import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/store/cameraStore";
import { MapManager } from "./MapManager";

const BASE_LAT = 37.7894;
const BASE_LNG = -122.4014;
const LAT_SCALE = 111111; // 1 degree lat ~ 111,111 meters

export const MapCameraSync: React.FC = () => {
  const { camera } = useThree();

  useFrame(() => {
    const map = MapManager.getMap();
    if (!map) return;

    // Get current camera position and target
    const pos = camera.position;
    const targetArr = useCameraStore.getState().target;
    const target = new THREE.Vector3(targetArr[0], targetArr[1], targetArr[2]);

    // 1. Calculate map center based on camera target
    const lat = BASE_LAT - target.z / LAT_SCALE;
    const lng = BASE_LNG + target.x / (LAT_SCALE * Math.cos((BASE_LAT * Math.PI) / 180));

    // 2. Calculate Heading (rotation around Y axis)
    const dx = pos.x - target.x;
    const dz = pos.z - target.z;
    const heading = (Math.atan2(dx, -dz) * 180) / Math.PI;

    // 3. Calculate Tilt (angle relative to ground)
    const distance = pos.distanceTo(target);
    const horizontalDist = Math.sqrt(dx * dx + dz * dz);
    const tilt = (Math.atan2(pos.y, horizontalDist) * 180) / Math.PI;

    // 4. Calculate Zoom (calibrated logarithmic distance mapping)
    // Distance 100 -> Zoom 16, Distance 50 -> Zoom 17, Distance 200 -> Zoom 15
    const zoom = Math.max(12, Math.min(21, 21.5 - Math.log2(distance)));

    // Synchronize Google Maps camera parameters
    map.setCenter({ lat, lng });
    map.setHeading(heading);
    map.setTilt(Math.max(0, Math.min(75, 90 - tilt))); // Google Maps tilt is 0-75 (0 = looking straight down)
    map.setZoom(zoom);
  });

  return null;
};

export default MapCameraSync;
