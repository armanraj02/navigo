import type { JourneyOption, JourneySortMode } from "../JourneyState/JourneyTypes";

/**
 * Pure sort utility — no side effects.
 */
export function sortJourneys(options: JourneyOption[], mode: JourneySortMode): JourneyOption[] {
  const copy = [...options];
  switch (mode) {
    case "fastest":
      return copy.sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes);
    case "cheapest":
      return copy.sort((a, b) => a.fare - b.fare);
    case "eco":
      return copy.sort((a, b) => b.environmentScore - a.environmentScore);
    case "fewest-transfers":
      return copy.sort((a, b) => a.transfers - b.transfers || a.totalDurationMinutes - b.totalDurationMinutes);
    default:
      return copy;
  }
}
