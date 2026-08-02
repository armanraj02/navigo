"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useJourneyStore } from "../JourneyState/JourneyState";

export const AnimatedRouteSpline: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const progressRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null);

  // Reset drawing animation progress when selected route changes
  useEffect(() => {
    progressRef.current = 0;
  }, [selectedJourney]);

  useFrame((_, delta) => {
    if (progressRef.current < 1.0) {
      progressRef.current = Math.min(progressRef.current + delta * 0.8, 1.0);
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          if (material) {
            // Subtle glow fluctuation
            const t = performance.now() * 0.003;
            material.opacity = (0.5 + Math.sin(t * 4) * 0.2) * progressRef.current;
          }
        }
      });
    }
  });

  const splinesObject = useMemo(() => {
    if (!selectedJourney) return null;

    const busSegs = selectedJourney.segments.filter((s) => s.type === "bus");
    if (busSegs.length === 0) return null;

    const group = new THREE.Group();

    busSegs.forEach((seg) => {
      const pts = seg.path.map((p) => new THREE.Vector3(...p));
      if (pts.length < 2) return;

      const curve = new THREE.CatmullRomCurve3(pts);
      const curvePoints = curve.getPoints(60);

      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const material = new THREE.LineBasicMaterial({
        color: seg.routeColor || "#0071e3",
        linewidth: 4,
        transparent: true,
        opacity: 0,
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
    });

    return group;
  }, [selectedJourney]);

  if (!splinesObject) return null;

  return <primitive ref={groupRef} object={splinesObject} />;
};

AnimatedRouteSpline.displayName = "AnimatedRouteSpline";
export default AnimatedRouteSpline;
