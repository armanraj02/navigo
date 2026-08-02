"use client";

import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WorldBuilder } from "../WorldBuilder";
import { TreeWindAnimator } from "../TreeWindAnimator";
import { StreetFurnitureManager } from "../StreetFurnitureManager";

export const ProceduralCity: React.FC = () => {
  const { scene } = useThree();
  const cityGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const cityGroup = new THREE.Group();
    cityGroup.name = "procedural-city-blocks";
    // Radius of 1 builds a 3x3 grid (300x300 units), radius 2 builds 5x5. Let's use 1 for top performance.
    WorldBuilder.buildInitialChunks(cityGroup, 1);
    scene.add(cityGroup);
    cityGroupRef.current = cityGroup;

    return () => {
      if (cityGroupRef.current) {
        scene.remove(cityGroupRef.current);
      }
    };
  }, [scene]);

  return (
    <>
      <TreeWindAnimator />
      <StreetFurnitureManager />
    </>
  );
};

ProceduralCity.displayName = "ProceduralCity";
export default ProceduralCity;
