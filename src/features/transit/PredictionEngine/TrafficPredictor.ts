import { WorldClock } from "@/three/simulation/WorldClock";

export type TrafficLevel = "light" | "moderate" | "heavy";

export const TrafficPredictor = {
  predictTraffic: (): { level: TrafficLevel; speedMultiplier: number } => {
    const { hour } = WorldClock.getTime();

    // Peak hour congested traffic
    if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
      return { level: "heavy", speedMultiplier: 0.65 };
    }
    // Midday moderate traffic
    if (hour >= 10 && hour <= 15) {
      return { level: "moderate", speedMultiplier: 0.9 };
    }
    // Free flow night traffic
    return { level: "light", speedMultiplier: 1.1 };
  },
};
