import { BusStop } from "@/three/simulation/DummyScheduleEngine";

/**
 * Deterministic fare calculator based on stop distance and transfer count.
 */
export class FareEstimatorClass {
  private static instance: FareEstimatorClass;

  private constructor() {}

  public static getInstance(): FareEstimatorClass {
    if (!FareEstimatorClass.instance) {
      FareEstimatorClass.instance = new FareEstimatorClass();
    }
    return FareEstimatorClass.instance;
  }

  public estimate(from: BusStop, to: BusStop, transfers: number): number {
    const dx = from.position[0] - to.position[0];
    const dz = from.position[2] - to.position[2];
    const distanceUnits = Math.sqrt(dx * dx + dz * dz);
    const base = 1.5 + distanceUnits * 0.012;
    const transferPremium = transfers * 0.75;
    return Math.round((base + transferPremium) * 100) / 100;
  }

  public formatFare(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

export const FareEstimator = FareEstimatorClass.getInstance();
