"use client";

import React from "react";
import { CameraRig } from "./CameraRig";
import { OrbitController } from "./OrbitController";
import { WorldComposer } from "./world/WorldComposer";

export const SceneRoot: React.FC = () => {
  return (
    <>
      {/* Interpolated Camera Rigs */}
      <CameraRig />
      <OrbitController />

      {/* Main 3D World Composition */}
      <WorldComposer />
    </>
  );
};

SceneRoot.displayName = "SceneRoot";
export default SceneRoot;
