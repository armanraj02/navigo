"use client";

import React from "react";
import { SkySystem } from "../SkySystem";
import { FogSystem } from "../FogSystem";
import { CloudAnimator } from "../CloudAnimator";

export const EnvironmentLayer: React.FC = () => {
  return (
    <>
      <SkySystem />
      <FogSystem />
      <CloudAnimator />
    </>
  );
};

EnvironmentLayer.displayName = "EnvironmentLayer";
export default EnvironmentLayer;
