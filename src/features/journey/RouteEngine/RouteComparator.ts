import type { JourneyOption } from "../JourneyState/JourneyTypes";

/**
 * Scores each journey option on weighted criteria and sorts accordingly.
 */
export class RouteComparatorClass {
  private static instance: RouteComparatorClass;

  private constructor() {}

  public static getInstance(): RouteComparatorClass {
    if (!RouteComparatorClass.instance) {
      RouteComparatorClass.instance = new RouteComparatorClass();
    }
    return RouteComparatorClass.instance;
  }

  /** Mark the best option as recommended, then return all options sorted */
  public rank(options: JourneyOption[]): JourneyOption[] {
    if (options.length === 0) return [];

    // Score: lower is better — balanced across time, fare, transfers
    const scored = options.map((o) => ({
      option: o,
      score:
        o.totalDurationMinutes * 0.5 +
        o.fare * 3 +
        o.transfers * 8 +
        o.walkingMinutes * 0.3,
    }));

    scored.sort((a, b) => a.score - b.score);

    return scored.map((item, idx) => ({
      ...item.option,
      isRecommended: idx === 0,
    }));
  }
}

export const RouteComparator = RouteComparatorClass.getInstance();
