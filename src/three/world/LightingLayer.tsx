"use client";

import React from "react";
import { LightingSystem } from "../LightingSystem";
import { StreetLightSystem } from "../StreetLightSystem";

export const LightingLayer: React.FC = () => {
  return (
    <>
      <LightingSystem />
      <StreetLightSystem />
    </>
  );
};

LightingLayer.displayName = "LightingLayer";
export default LightingLayer;
