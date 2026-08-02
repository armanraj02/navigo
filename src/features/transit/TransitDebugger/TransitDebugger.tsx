"use client";

import React from "react";
import { Html } from "@react-three/drei";
import { MOCK_STOPS, MOCK_ROUTES } from "@/three/simulation/DummyScheduleEngine";
import * as THREE from "three";

export const TransitDebugger: React.FC = () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <group>
      {/* Route Spline debugger guides */}
      {MOCK_ROUTES.map((route) => {
        const points = route.stopIds
          .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
          .filter(Boolean)
          .map((s) => new THREE.Vector3(s!.position[0], s!.position[1] + 0.1, s!.position[2]));

        if (points.length < 2) return null;

        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(30);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

        return (
          <line key={route.id}>
            <primitive object={geometry} />
            <lineBasicMaterial color={route.color} linewidth={1} transparent opacity={0.35} />
          </line>
        );
      })}

      {/* Stop label nodes */}
      {MOCK_STOPS.map((stop) => (
        <group key={stop.id} position={[stop.position[0], stop.position[1] + 2.0, stop.position[2]]}>
          <Html center distanceFactor={25}>
            <div className="bg-zinc-950/90 text-[8px] font-bold font-mono px-2 py-0.5 rounded border border-red-500/30 text-red-400 whitespace-nowrap shadow-md select-none pointer-events-none">
              {stop.id} : {stop.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

TransitDebugger.displayName = "TransitDebugger";
export default TransitDebugger;
