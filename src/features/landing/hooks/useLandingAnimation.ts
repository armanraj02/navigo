"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useCameraStore } from "@/store/cameraStore";

export interface LandingKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  duration: number;
  ease: string;
  label?: string;
}

const LANDING_KEYFRAMES: LandingKeyframe[] = [
  {
    label: "wide-establishing",
    position: [150, 100, 150],
    target: [0, 0, 0],
    duration: 0,
    ease: "none",
  },
  {
    label: "cinematic-sweep",
    position: [80, 60, 120],
    target: [10, 0, -10],
    duration: 3.5,
    ease: "power2.inOut",
  },
  {
    label: "city-reveal",
    position: [20, 40, 90],
    target: [0, 5, 0],
    duration: 3.0,
    ease: "power1.inOut",
  },
  {
    label: "hold-hero",
    position: [0, 55, 95],
    target: [0, 0, 0],
    duration: 2.5,
    ease: "power2.out",
  },
];

export const PASSENGER_PRESET = {
  position: [0, 60, 100] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
};

export function useLandingAnimation() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const proxyRef = useRef({ x: 150, y: 100, z: 150, tx: 0, ty: 0, tz: 0 });
  const setCameraPosition = useCameraStore((state) => state.setPosition);
  const setCameraTarget = useCameraStore((state) => state.setTarget);
  const setCameraMode = useCameraStore((state) => state.setMode);

  const startFlythrough = useCallback((onComplete?: () => void) => {
    // Set cinematic mode and starting position
    setCameraMode("cinematic");
    setCameraPosition(LANDING_KEYFRAMES[0].position);
    setCameraTarget(LANDING_KEYFRAMES[0].target);

    const proxy = proxyRef.current;
    proxy.x = LANDING_KEYFRAMES[0].position[0];
    proxy.y = LANDING_KEYFRAMES[0].position[1];
    proxy.z = LANDING_KEYFRAMES[0].position[2];
    proxy.tx = LANDING_KEYFRAMES[0].target[0];
    proxy.ty = LANDING_KEYFRAMES[0].target[1];
    proxy.tz = LANDING_KEYFRAMES[0].target[2];

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    LANDING_KEYFRAMES.slice(1).forEach((kf) => {
      tl.to(
        proxy,
        {
          x: kf.position[0],
          y: kf.position[1],
          z: kf.position[2],
          tx: kf.target[0],
          ty: kf.target[1],
          tz: kf.target[2],
          duration: kf.duration,
          ease: kf.ease,
          onUpdate: () => {
            setCameraPosition([proxy.x, proxy.y, proxy.z]);
            setCameraTarget([proxy.tx, proxy.ty, proxy.tz]);
          },
        },
        kf.label ? `+=${0}` : undefined
      );
    });

    timelineRef.current = tl;
  }, [setCameraPosition, setCameraTarget, setCameraMode]);

  const enterPassengerMode = useCallback((onComplete?: () => void) => {
    const proxy = proxyRef.current;
    const tl = gsap.timeline({ onComplete });

    tl.to(proxy, {
      x: PASSENGER_PRESET.position[0],
      y: PASSENGER_PRESET.position[1],
      z: PASSENGER_PRESET.position[2],
      tx: PASSENGER_PRESET.target[0],
      ty: PASSENGER_PRESET.target[1],
      tz: PASSENGER_PRESET.target[2],
      duration: 2.0,
      ease: "power3.inOut",
      onUpdate: () => {
        setCameraPosition([proxy.x, proxy.y, proxy.z]);
        setCameraTarget([proxy.tx, proxy.ty, proxy.tz]);
      },
      onComplete: () => {
        setCameraMode("orbit");
      },
    });

    return tl;
  }, [setCameraPosition, setCameraTarget, setCameraMode]);

  const stopTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTimeline();
    };
  }, [stopTimeline]);

  return { startFlythrough, enterPassengerMode, stopTimeline };
}
