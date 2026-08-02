"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useJourneyStore } from "../JourneyState/JourneyState";

export const WalkingPath: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);

  const walkingObject = useMemo(() => {
    if (!selectedJourney) return null;

    // Filter segments representing walking legs
    const walks = selectedJourney.segments.filter((seg) => seg.type === "walk");
    if (walks.length === 0) return null;

    const group = new THREE.Group();

    walks.forEach((walk) => {
      const pts = walk.path.map((p) => new THREE.Vector3(...p));
      const curve = new THREE.CatmullRomCurve3(pts);
      const curvePoints = curve.getPoints(20);

      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const material = new THREE.LineDashedMaterial({
        color: "#ffffff",
        dashSize: 0.4,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.6,
      });

      const line = new THREE.Line(geometry, material);
      line.computeLineDistances(); // Crucial for dashed line rendering
      group.add(line);
    });

    return group;
  }, [selectedJourney]);

  if (!walkingObject) return null;

  return <primitive object={walkingObject} />;
};

WalkingPath.displayName = "WalkingPath";
export default WalkingPath;
