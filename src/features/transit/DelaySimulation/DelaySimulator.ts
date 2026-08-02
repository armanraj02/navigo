import { WorldClock } from "@/three/simulation/WorldClock";

export class DelaySimulatorClass {
  private static instance: DelaySimulatorClass;
  private busDelays: Map<string, number> = new Map();

  private lastCheck: Record<string, number> = {};

  private constructor() {}

  public static getInstance(): DelaySimulatorClass {
    if (!DelaySimulatorClass.instance) {
      DelaySimulatorClass.instance = new DelaySimulatorClass();
    }
    return DelaySimulatorClass.instance;
  }

  /**
   * Generates or increments delay stochastically for a given bus.
   */
  public getDelayForBus(busId: string, progress: number): number {
    const { hour } = WorldClock.getTime();
    
    if (!this.busDelays.has(busId)) {
      // Seed initial delay deterministically
      const initial = Math.random() < 0.2 ? Math.floor(Math.random() * 4) : 0;
      this.busDelays.set(busId, initial);
    }

    let current = this.busDelays.get(busId) || 0;

    // Stochastic delay increment at stop intervals or major checkpoints (represented by progress segments)
    const segmentCheck = Math.floor(progress * 10);
    const lastCheck = this.lastCheck[busId] || 0;

    if (segmentCheck !== lastCheck) {
      this.lastCheck[busId] = segmentCheck;
      
      const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18);
      const delayProbability = isPeakHour ? 0.35 : 0.15;

      if (Math.random() < delayProbability) {
        const added = isPeakHour ? 2 + Math.floor(Math.random() * 3) : 1;
        current += added;
      } else {
        // Slow delay recovery if driving on schedule
        current = Math.max(0, current - 0.5);
      }
      this.busDelays.set(busId, current);
    }

    return current;
  }

  public getStatus(delayMinutes: number): "Early" | "On Time" | "Minor Delay" | "Major Delay" {
    if (delayMinutes === 0) return "On Time";
    if (delayMinutes < 0) return "Early";
    if (delayMinutes < 5) return "Minor Delay";
    return "Major Delay";
  }

  public clear(): void {
    this.busDelays.clear();
  }
}

export const DelaySimulator = DelaySimulatorClass.getInstance();
