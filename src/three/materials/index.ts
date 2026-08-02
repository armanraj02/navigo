export interface MaterialPreset {
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
}

export const materialPresets: Record<string, MaterialPreset> = {
  hologramGrid: {
    color: "#0071e3",
    roughness: 0.1,
    metalness: 0.9,
    emissive: "#0071e3",
    emissiveIntensity: 0.5,
  },
  neonRouteTrail: {
    color: "#10b981",
    roughness: 0.2,
    metalness: 0.5,
    emissive: "#10b981",
    emissiveIntensity: 2.0,
  },
  obsidianBuilding: {
    color: "#18181b",
    roughness: 0.4,
    metalness: 0.8,
  },
};
