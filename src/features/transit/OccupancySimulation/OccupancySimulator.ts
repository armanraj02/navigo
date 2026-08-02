import { WorldClock } from "@/three/simulation/WorldClock";
import type { OccupancyLevel } from "../TrackingEngine/TransitTypes";

export class OccupancySimulatorClass {
  private static instance: OccupancySimulatorClass;

  private constructor() {}

  public static getInstance(): OccupancySimulatorClass {
    if (!OccupancySimulatorClass.instance) {
      OccupancySimulatorClass.instance = new OccupancySimulatorClass();
    }
    return OccupancySimulatorClass.instance;
  }

  /**
   * Generates a dynamic occupancy percent (0.0 - 1.0) based on time-of-day.
   */
  public getOccupancyForBus(busId: string): number {
    const { hour } = WorldClock.getTime();
    
    // Deterministic base value based on hour + seed from busId hash
    const seed = this.hashString(busId) * 0.1;
    let base = 0.2;

    if (hour >= 7 && hour <= 9) {
      // Morning peak
      base = 0.75 + Math.sin(seed) * 0.15;
    } else if (hour >= 16 && hour <= 18) {
      // Evening peak
      base = 0.8 + Math.cos(seed) * 0.15;
    } else if (hour >= 10 && hour <= 15) {
      // Midday
      base = 0.35 + Math.sin(seed) * 0.15;
    } else if (hour >= 20 || hour <= 5) {
      // Night
      base = 0.08 + Math.abs(Math.sin(seed)) * 0.08;
    } else {
      // Transition periods
      base = 0.25 + Math.sin(seed) * 0.1;
    }

    // Clamp to 0 - 1.0 range
    return Math.max(0.02, Math.min(0.98, base));
  }

  public getLevel(percent: number): OccupancyLevel {
    if (percent < 0.15) return "empty";
    if (percent < 0.4) return "low";
    if (percent < 0.7) return "moderate";
    if (percent < 0.88) return "high";
    return "crowded";
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 100);
  }
}

export const OccupancySimulator = OccupancySimulatorClass.getInstance();
