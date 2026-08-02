import { WorldClock } from "@/three/simulation/WorldClock";

export const DelayPredictor = {
  predictDelayTrend: (currentDelay: number, progress: number): { predictedMinutes: number; trend: "rising" | "stable" | "falling" } => {
    if (currentDelay === 0) {
      return { predictedMinutes: 0, trend: "stable" };
    }

    const { hour } = WorldClock.getTime();
    const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18);

    // If peak hour and bus is early in route, delay is likely to rise. If late, stable or falling.
    if (isPeakHour) {
      if (progress < 0.6) {
        return {
          predictedMinutes: Math.round(currentDelay + 3),
          trend: "rising",
        };
      }
      return {
        predictedMinutes: Math.round(currentDelay),
        trend: "stable",
      };
    }

    // Off-peak: delays usually decrease as buses catch up
    return {
      predictedMinutes: Math.max(0, Math.round(currentDelay - 1.5)),
      trend: "falling",
    };
  },
};
