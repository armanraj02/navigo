"use client";

import { useEffect, useRef } from "react";
import { useCameraStore } from "@/store/cameraStore";

const IDLE_RADIUS = 100;
const IDLE_SPEED = 0.04; // radians per second
const IDLE_HEIGHT = 55;
const IDLE_TARGET: [number, number, number] = [0, 0, 0];

export function useIdleCamera(active: boolean) {
  const setCameraPosition = useCameraStore((state) => state.setPosition);
  const setCameraTarget = useCameraStore((state) => state.setTarget);
  const setCameraMode = useCameraStore((state) => state.setMode);
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    setCameraMode("cinematic");
    setCameraTarget(IDLE_TARGET);

    const tick = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      angleRef.current += IDLE_SPEED * delta;
      const x = Math.cos(angleRef.current) * IDLE_RADIUS;
      const z = Math.sin(angleRef.current) * IDLE_RADIUS;
      // Subtle vertical drift
      const y = IDLE_HEIGHT + Math.sin(angleRef.current * 0.3) * 8;

      setCameraPosition([x, y, z]);

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, setCameraMode, setCameraPosition, setCameraTarget]);
}
