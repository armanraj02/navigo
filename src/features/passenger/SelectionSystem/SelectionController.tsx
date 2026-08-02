"use client";

import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneEvents } from "@/three/SceneEvents";
import { BusManager } from "@/three/simulation/BusManager";
import { BusStopManager } from "@/three/simulation/BusStopManager";

export const SelectionController: React.FC = () => {
  const { scene } = useThree();
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  const ringGeomRef = React.useRef(new THREE.RingGeometry(1.2, 1.4, 32));
  const ringMatRef = React.useRef(
    new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })
  );

  const highlightRingRef = React.useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // Add visual highlight ring to the scene
    const ring = new THREE.Mesh(ringGeomRef.current, ringMatRef.current);
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    scene.add(ring);
    highlightRingRef.current = ring;

    // Listen to selection changes using subscribe
    const unsubBus = SceneEvents.subscribe("BUS_SELECTED", (id) => {
      setSelectedBusId((id as string) || null);
      setSelectedStopId(null);
    });

    const unsubStop = SceneEvents.subscribe("STOP_SELECTED", (id) => {
      setSelectedStopId((id as string) || null);
      setSelectedBusId(null);
    });

    return () => {
      scene.remove(ring);
      unsubBus();
      unsubStop();
    };
  }, [scene]);

  useFrame(() => {
    if (!highlightRingRef.current) return;

    if (selectedBusId) {
      const bus = BusManager.getBusById(selectedBusId);
      if (bus) {
        highlightRingRef.current.position.copy(bus.position);
        highlightRingRef.current.position.y = 0.05; // slightly above ground
        highlightRingRef.current.visible = true;
        
        // Pulse ring scaling
        const t = performance.now() / 300;
        const scale = 1 + Math.sin(t) * 0.15;
        highlightRingRef.current.scale.set(scale, scale, 1);
        return;
      }
    }

    if (selectedStopId) {
      const stop = BusStopManager.getStopById(selectedStopId);
      if (stop) {
        highlightRingRef.current.position.set(
          stop.position[0],
          0.05,
          stop.position[2]
        );
        highlightRingRef.current.visible = true;

        const t = performance.now() / 300;
        const scale = 1.1 + Math.sin(t) * 0.15;
        highlightRingRef.current.scale.set(scale, scale, 1);
        return;
      }
    }

    highlightRingRef.current.visible = false;
  });

  return null;
};

SelectionController.displayName = "SelectionController";
export default SelectionController;
