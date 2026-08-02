"use client";

import React, { Suspense } from "react";
import { ThreeCanvas } from "@/three";
import { Spinner } from "@/components/ui";
import { GoogleMapProvider } from "@/maps/GoogleMapProvider";
import { MapDebugger } from "@/maps/MapDebugger";

export const SceneViewport: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950 select-none">
      <GoogleMapProvider>
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 select-none z-50">
              <div className="flex flex-col items-center gap-3">
                <Spinner size="lg" />
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest animate-pulse">
                  Spawning WebGL Canvas...
                </span>
              </div>
            </div>
          }
        >
          <ThreeCanvas />
        </Suspense>
        {/* Real-time geodetic data coordinates debugging overlay */}
        <MapDebugger />
      </GoogleMapProvider>
    </div>
  );
};

SceneViewport.displayName = "SceneViewport";
export default SceneViewport;
