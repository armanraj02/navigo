import * as THREE from "three";

export interface RendererSetup {
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
  shadowMapType: THREE.ShadowMapType;
  colorSpace: THREE.ColorSpace;
}

export const RendererConfig: RendererSetup = {
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.0,
  shadowMapType: THREE.PCFSoftShadowMap,
  colorSpace: THREE.SRGBColorSpace,
};
