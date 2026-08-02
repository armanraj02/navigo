"use client";

import React from "react";
import { EnvironmentLayer } from "./EnvironmentLayer";
import { LightingLayer } from "./LightingLayer";
import { ProceduralCity } from "./ProceduralCity";
import { SimulationLayer } from "./SimulationLayer";
import { EffectsLayer } from "./EffectsLayer";

export const WorldComposer: React.FC = () => {
  return (
    <>
      {/* Environment Sky, Fog, and Clouds */}
      <EnvironmentLayer />

      {/* Sun, Moon, and Street lights */}
      <LightingLayer />

      {/* Procedural Roads, Buildings, and Trees */}
      <ProceduralCity />

      {/* Simulating Traffic, Buses, and Stop Shelters */}
      <SimulationLayer />

      {/* Dynamic Specular Reflections & Post Effects */}
      <EffectsLayer />
    </>
  );
};

WorldComposer.displayName = "WorldComposer";
export default WorldComposer;
