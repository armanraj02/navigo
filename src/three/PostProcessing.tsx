"use client";

import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useSettingsStore } from "@/store/settingsStore";

export const PostProcessing: React.FC = () => {
  const enablePostProcessing = useSettingsStore((state) => state.enablePostProcessing);

  if (!enablePostProcessing) return null;

  return (
    <EffectComposer>
      {/* Premium glow threshold mapping for building window lights and neon trails */}
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
    </EffectComposer>
  );
};

PostProcessing.displayName = "PostProcessing";
export default PostProcessing;
