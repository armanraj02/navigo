"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BusManager } from "./simulation/BusManager";
import { useSceneStore } from "@/store/sceneStore";

const BUS_SCALE = new THREE.Vector3(1.4, 0.9, 3.2);

export const BusAnimator: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const isNightMode = useSceneStore((s) => s.isNightMode);

  // Body material
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(
    new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.6 })
  );

  useFrame((_, delta) => {
    BusManager.tick(delta);

    const buses = BusManager.getAllBuses();
    if (!groupRef.current) return;

    buses.forEach((bus) => {
      let mesh = meshRefs.current.get(bus.id);

      if (!mesh) {
        // Create bus mesh on first appearance
        const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
        const mat = bodyMatRef.current.clone();
        mat.color.set(bus.routeColor);
        mat.emissive.set(bus.routeColor);
        mat.emissiveIntensity = isNightMode ? 0.3 : 0.05;
        mesh = new THREE.Mesh(bodyGeo, mat);
        mesh.castShadow = true;
        mesh.scale.copy(BUS_SCALE);
        groupRef.current!.add(mesh);
        meshRefs.current.set(bus.id, mesh);
      }

      mesh.position.copy(bus.position);
      mesh.rotation.y = bus.rotation;
    });
  });

  useEffect(() => {
    BusManager.init();
  }, []);

  return <group ref={groupRef} />;
};

BusAnimator.displayName = "BusAnimator";
export default BusAnimator;
