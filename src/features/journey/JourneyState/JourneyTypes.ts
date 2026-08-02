// ─── Journey Planning Types ───────────────────────────────────────────────────

export type JourneyPreviewMode =
  | "idle"
  | "overview"
  | "route"
  | "follow"
  | "transfer"
  | "destination";

export type JourneySegmentType = "bus" | "walk" | "transfer";

export type JourneySortMode = "fastest" | "cheapest" | "eco" | "fewest-transfers";

export interface JourneySegment {
  type: JourneySegmentType;
  routeId?: string;
  routeName?: string;
  routeColor?: string;
  fromStopId: string;
  fromStopName: string;
  toStopId: string;
  toStopName: string;
  /** 3D world-space path points */
  path: [number, number, number][];
  durationMinutes: number;
  distanceMeters?: number;
}

export interface JourneyOption {
  id: string;
  fromStopId: string;
  fromStopName: string;
  toStopId: string;
  toStopName: string;
  segments: JourneySegment[];
  /** Primary bus route for display */
  primaryRouteId: string;
  primaryRouteColor: string;
  totalDurationMinutes: number;
  walkingMinutes: number;
  transfers: number;
  fare: number;
  /** Departure time string e.g. "08:42" */
  departureTime: string;
  /** Arrival time string e.g. "09:05" */
  arrivalTime: string;
  /** 0–1 representing seat occupancy */
  occupancy: number;
  /** Mock environmental score 0–100 */
  environmentScore: number;
  /** Whether this is the recommended option */
  isRecommended?: boolean;
}

export interface JourneyFilter {
  sortMode: JourneySortMode;
  maxTransfers: number | null;
  accessible: boolean;
}
