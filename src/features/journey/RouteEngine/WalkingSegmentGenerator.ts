import { BusStop } from "@/three/simulation/DummyScheduleEngine";
import type { JourneySegment } from "../JourneyState/JourneyTypes";

/**
 * Generates a walking segment between two stops with a dashed path.
 */
export class WalkingSegmentGeneratorClass {
  private static instance: WalkingSegmentGeneratorClass;

  private constructor() {}

  public static getInstance(): WalkingSegmentGeneratorClass {
    if (!WalkingSegmentGeneratorClass.instance) {
      WalkingSegmentGeneratorClass.instance = new WalkingSegmentGeneratorClass();
    }
    return WalkingSegmentGeneratorClass.instance;
  }

  public generate(from: BusStop, to: BusStop, durationMinutes: number): JourneySegment {
    // Build a slightly curved walking path between stops
    const midX = (from.position[0] + to.position[0]) / 2 + 3;
    const midZ = (from.position[2] + to.position[2]) / 2 + 3;
    const path: [number, number, number][] = [
      [from.position[0], 0.15, from.position[2]],
      [midX, 0.15, midZ],
      [to.position[0], 0.15, to.position[2]],
    ];

    const dx = from.position[0] - to.position[0];
    const dz = from.position[2] - to.position[2];
    const distanceMeters = Math.round(Math.sqrt(dx * dx + dz * dz) * 5);

    return {
      type: "walk",
      fromStopId: from.id,
      fromStopName: from.name,
      toStopId: to.id,
      toStopName: to.name,
      path,
      durationMinutes,
      distanceMeters,
    };
  }
}

export const WalkingSegmentGenerator = WalkingSegmentGeneratorClass.getInstance();
