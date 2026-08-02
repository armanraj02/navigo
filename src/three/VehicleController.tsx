"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TrafficManager } from "./simulation/TrafficManager";

const VEHICLE_COLORS: Record<string, string> = {
  car: "#e4e4e7",
  van: "#d97706",
  emergency: "#ef4444",
};

const VEHICLE_SIZE: Record<string, [number, number, number]> = {
  car: [1.0, 0.55, 2.0],
  van: [1.1, 0.9, 2.8],
  emergency: [1.0, 0.8, 2.4],
};

export const VehicleController: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshMap = useRef<Map<string, THREE.Mesh>>(new Map());

  useFrame((_, delta) => {
    TrafficManager.tick(delta);
    const vehicles = TrafficManager.getAllVehicles();
    if (!groupRef.current) return;

    vehicles.forEach((v) => {
      let mesh = meshMap.current.get(v.id);

      if (!mesh) {
        const [w, h, d] = VEHICLE_SIZE[v.type] ?? [1, 0.5, 2];
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({
          color: VEHICLE_COLORS[v.type] ?? "#ffffff",
          roughness: 0.5,
          metalness: 0.5,
        });
        mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        groupRef.current!.add(mesh);
        meshMap.current.set(v.id, mesh);
      }

      mesh.position.copy(v.position);
      mesh.position.y = 0.3;
      mesh.rotation.y = v.rotation;
    });
  });

  return <group ref={groupRef} />;
};

VehicleController.displayName = "VehicleController";
export default VehicleController;
