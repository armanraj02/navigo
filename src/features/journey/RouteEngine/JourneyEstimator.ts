import { WorldClock } from "@/three/simulation/WorldClock";

/**
 * Computes estimated departure/arrival times and per-route durations
 * driven by the current WorldClock time.
 */
export class JourneyEstimatorClass {
  private static instance: JourneyEstimatorClass;

  private constructor() {}

  public static getInstance(): JourneyEstimatorClass {
    if (!JourneyEstimatorClass.instance) {
      JourneyEstimatorClass.instance = new JourneyEstimatorClass();
    }
    return JourneyEstimatorClass.instance;
  }

  /**
   * Estimate travel duration in minutes based on number of stops in route.
   */
  public estimateDuration(stopIds: string[]): number {
    const base = Math.max(stopIds.length - 1, 1) * 4;
    return base + Math.floor(Math.random() * 5);
  }

  /**
   * Given a duration, return departure (now + 2min) and arrival strings.
   */
  public estimateTimes(durationMinutes: number): { departure: string; arrival: string } {
    const { totalMinutes } = WorldClock.getTime();
    const depMin = (totalMinutes + 2) % 1440;
    const arrMin = (depMin + durationMinutes) % 1440;
    return {
      departure: this.formatMinutes(depMin),
      arrival: this.formatMinutes(arrMin),
    };
  }

  private formatMinutes(totalMinutes: number): string {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = Math.floor(totalMinutes % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
}

export const JourneyEstimator = JourneyEstimatorClass.getInstance();
