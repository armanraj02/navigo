import * as THREE from "three";

export type LODLevel = "near" | "medium" | "far";

export interface LODConfig {
  nearDistance: number;
  mediumDistance: number;
  farDistance: number;
}

export const DEFAULT_LOD_CONFIG: LODConfig = {
  nearDistance: 40,
  mediumDistance: 100,
  farDistance: 200,
};

export class LODManagerClass {
  private static instance: LODManagerClass;
  private config: LODConfig;
  private cameraPosition = new THREE.Vector3();

  private constructor() {
    this.config = DEFAULT_LOD_CONFIG;
  }

  public static getInstance(): LODManagerClass {
    if (!LODManagerClass.instance) {
      LODManagerClass.instance = new LODManagerClass();
    }
    return LODManagerClass.instance;
  }

  public updateCameraPosition(pos: THREE.Vector3): void {
    this.cameraPosition.copy(pos);
  }

  public getLevelForDistance(distance: number): LODLevel {
    if (distance < this.config.nearDistance) return "near";
    if (distance < this.config.mediumDistance) return "medium";
    return "far";
  }

  public getLevelAt(worldX: number, worldZ: number): LODLevel {
    const dx = worldX - this.cameraPosition.x;
    const dz = worldZ - this.cameraPosition.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    return this.getLevelForDistance(distance);
  }

  public setConfig(cfg: Partial<LODConfig>): void {
    this.config = { ...this.config, ...cfg };
  }
}

export const LODManager = LODManagerClass.getInstance();
