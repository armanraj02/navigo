import { WorldClock } from "@/three/simulation/WorldClock";
import { OccupancySimulator } from "../OccupancySimulation/OccupancySimulator";

export const OccupancyPredictor = {
  predictFutureOccupancy: (busId: string): { percent: number; trend: "filling" | "emptying" | "stable" } => {
    const current = OccupancySimulator.getOccupancyForBus(busId);
    const { hour } = WorldClock.getTime();

    // Check if we are approaching a peak time block
    const isApproachingMorningPeak = hour >= 6 && hour < 8;
    const isApproachingEveningPeak = hour >= 15 && hour < 17;
    const isExitingPeak = hour === 9 || hour === 10 || hour === 19 || hour === 20;

    let predicted = current;
    let trend: "filling" | "emptying" | "stable" = "stable";

    if (isApproachingMorningPeak || isApproachingEveningPeak) {
      predicted = Math.min(0.95, current + 0.15);
      trend = "filling";
    } else if (isExitingPeak) {
      predicted = Math.max(0.1, current - 0.2);
      trend = "emptying";
    }

    return {
      percent: Math.round(predicted * 100) / 100,
      trend,
    };
  },
};
