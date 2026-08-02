"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneEvents } from "@/three/SceneEvents";
import { MOCK_ROUTES, MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";

export const RouteSpline: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const lineRef = useRef<THREE.Line>(null);

  useEffect(() => {
    const unsub = SceneEvents.subscribe("ROUTE_SELECTED", (routeId) => {
      setActiveRouteId((routeId as string) || null);
    });
    return () => unsub();
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    if (material) {
      // Glow pulse animation
      const t = clock.elapsedTime;
      material.opacity = 0.5 + Math.sin(t * 5) * 0.25;
    }
  });

  const lineObject = useMemo(() => {
    if (!activeRouteId) return null;

    const route = MOCK_ROUTES.find((r) => r.id === activeRouteId);
    if (!route) return null;

    const points = route.stopIds
      .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
      .filter(Boolean)
      .map((s) => new THREE.Vector3(s!.position[0], s!.position[1] + 0.3, s!.position[2]));

    if (points.length < 2) return null;

    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const material = new THREE.LineBasicMaterial({
      color: route.color,
      transparent: true,
      opacity: 0.8,
    });

    return new THREE.Line(geometry, material);
  }, [activeRouteId]);

  if (!lineObject) return null;

  // Use primitive to avoid JSX <line> resolving as SVG element
  return <primitive ref={lineRef} object={lineObject} />;
};

RouteSpline.displayName = "RouteSpline";
export default RouteSpline;
