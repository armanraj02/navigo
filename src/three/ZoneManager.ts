import { NoiseGenerator } from "./NoiseGenerator";
import { WorldConfig, ZoneParameters } from "./WorldConfig";

export class ZoneManagerClass {
  private static instance: ZoneManagerClass;

  private constructor() {}

  public static getInstance(): ZoneManagerClass {
    if (!ZoneManagerClass.instance) {
      ZoneManagerClass.instance = new ZoneManagerClass();
    }
    return ZoneManagerClass.instance;
  }

  // Returns the active zone type at a coordinate
  public getZoneAt(x: number, z: number): "downtown" | "residential" | "industrial" | "park" | "waterfront" {
    // Generate Perlin values to separate sectors
    const val = NoiseGenerator.noise2D(x * 0.005, z * 0.005);

    if (val < 0.25) return "park";
    if (val < 0.45) return "residential";
    if (val < 0.7) return "downtown";
    if (val < 0.85) return "waterfront";
    return "industrial";
  }

  public getZoneParamsAt(x: number, z: number): ZoneParameters {
    const zoneName = this.getZoneAt(x, z);
    return WorldConfig.zones[zoneName] || WorldConfig.zones.downtown;
  }
}

export const ZoneManager = ZoneManagerClass.getInstance();
