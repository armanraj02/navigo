import { MOCK_STOPS, MOCK_ROUTES, BusStop } from "@/three/simulation/DummyScheduleEngine";
import type { JourneyOption, JourneySegment } from "../JourneyState/JourneyTypes";
import { FareEstimator } from "./FareEstimator";
import { WalkingSegmentGenerator } from "./WalkingSegmentGenerator";
import { JourneyEstimator } from "./JourneyEstimator";

let _idCounter = 1000;
function nextId(): string {
  return `JRN-${++_idCounter}`;
}

function buildBusPath(stopIds: string[]): [number, number, number][] {
  return stopIds
    .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
    .filter(Boolean)
    .map((s) => [s!.position[0], s!.position[1] + 0.3, s!.position[2]] as [number, number, number]);
}

/**
 * Generates 2–4 believable mock JourneyOptions for a given origin/destination pair.
 */
export class MockRouteGeneratorClass {
  private static instance: MockRouteGeneratorClass;

  private constructor() {}

  public static getInstance(): MockRouteGeneratorClass {
    if (!MockRouteGeneratorClass.instance) {
      MockRouteGeneratorClass.instance = new MockRouteGeneratorClass();
    }
    return MockRouteGeneratorClass.instance;
  }

  public generate(fromStopId: string, toStopId: string): JourneyOption[] {
    const fromStop = MOCK_STOPS.find((s) => s.id === fromStopId);
    const toStop = MOCK_STOPS.find((s) => s.id === toStopId);
    if (!fromStop || !toStop) return [];

    const results: JourneyOption[] = [];

    // Option 1: Direct route (if one exists)
    const directRoute = MOCK_ROUTES.find(
      (r) => r.stopIds.includes(fromStopId) && r.stopIds.includes(toStopId)
    );
    if (directRoute) {
      const slicedStops = this.sliceRouteStops(directRoute.stopIds, fromStopId, toStopId);
      const duration = JourneyEstimator.estimateDuration(slicedStops);
      const { departure, arrival } = JourneyEstimator.estimateTimes(duration);
      const segment: JourneySegment = {
        type: "bus",
        routeId: directRoute.id,
        routeName: directRoute.name,
        routeColor: directRoute.color,
        fromStopId,
        fromStopName: fromStop.name,
        toStopId,
        toStopName: toStop.name,
        path: buildBusPath(slicedStops),
        durationMinutes: duration,
      };
      results.push({
        id: nextId(),
        fromStopId,
        fromStopName: fromStop.name,
        toStopId,
        toStopName: toStop.name,
        segments: [segment],
        primaryRouteId: directRoute.id,
        primaryRouteColor: directRoute.color,
        totalDurationMinutes: duration,
        walkingMinutes: 2,
        transfers: 0,
        fare: FareEstimator.estimate(fromStop, toStop, 0),
        departureTime: departure,
        arrivalTime: arrival,
        occupancy: 0.35 + Math.random() * 0.4,
        environmentScore: 82 + Math.floor(Math.random() * 15),
        isRecommended: true,
      });
    }

    // Option 2: Route with 1 transfer via shared stop
    const transferOption = this.buildTransferOption(fromStop, toStop);
    if (transferOption) results.push(transferOption);

    // Option 3: Slower alternative (same route if direct, or fallback route)
    const fallbackRoute = MOCK_ROUTES.find((r) => r !== directRoute && r.stopIds.includes(fromStopId))
      ?? MOCK_ROUTES[0];
    const altStops = this.sliceRouteStops(fallbackRoute.stopIds, fromStopId, toStopId);
    const altDuration = JourneyEstimator.estimateDuration(altStops) + 8;
    const { departure: altDep, arrival: altArr } = JourneyEstimator.estimateTimes(altDuration);
    const altSegment: JourneySegment = {
      type: "bus",
      routeId: fallbackRoute.id,
      routeName: fallbackRoute.name,
      routeColor: fallbackRoute.color,
      fromStopId,
      fromStopName: fromStop.name,
      toStopId,
      toStopName: toStop.name,
      path: buildBusPath(fallbackRoute.stopIds),
      durationMinutes: altDuration,
    };
    results.push({
      id: nextId(),
      fromStopId,
      fromStopName: fromStop.name,
      toStopId,
      toStopName: toStop.name,
      segments: [altSegment],
      primaryRouteId: fallbackRoute.id,
      primaryRouteColor: fallbackRoute.color,
      totalDurationMinutes: altDuration,
      walkingMinutes: 4,
      transfers: 0,
      fare: FareEstimator.estimate(fromStop, toStop, 0) * 0.85,
      departureTime: altDep,
      arrivalTime: altArr,
      occupancy: 0.15 + Math.random() * 0.3,
      environmentScore: 70 + Math.floor(Math.random() * 20),
    });

    return results.slice(0, 4);
  }

  private sliceRouteStops(stopIds: string[], fromId: string, toId: string): string[] {
    const fromIdx = stopIds.indexOf(fromId);
    const toIdx = stopIds.indexOf(toId);
    if (fromIdx === -1 || toIdx === -1) return stopIds;
    if (fromIdx < toIdx) return stopIds.slice(fromIdx, toIdx + 1);
    return stopIds.slice(toIdx, fromIdx + 1).reverse();
  }

  private buildTransferOption(fromStop: BusStop, toStop: BusStop): JourneyOption | null {
    // Find a transfer stop shared by at least 2 routes
    const transferStop = MOCK_STOPS.find(
      (s) =>
        s.id !== fromStop.id &&
        s.id !== toStop.id &&
        s.routeIds.length >= 2
    );
    if (!transferStop) return null;

    const leg1Route = MOCK_ROUTES.find(
      (r) => r.stopIds.includes(fromStop.id) && r.stopIds.includes(transferStop.id)
    );
    const leg2Route = MOCK_ROUTES.find(
      (r) => r.stopIds.includes(transferStop.id) && r !== leg1Route
    );
    if (!leg1Route || !leg2Route) return null;

    const leg1Duration = 8 + Math.floor(Math.random() * 5);
    const leg2Duration = 10 + Math.floor(Math.random() * 7);
    const walkDuration = 3;
    const totalDuration = leg1Duration + leg2Duration + walkDuration;

    const { departure, arrival } = JourneyEstimator.estimateTimes(totalDuration);

    const seg1: JourneySegment = {
      type: "bus",
      routeId: leg1Route.id,
      routeName: leg1Route.name,
      routeColor: leg1Route.color,
      fromStopId: fromStop.id,
      fromStopName: fromStop.name,
      toStopId: transferStop.id,
      toStopName: transferStop.name,
      path: buildBusPath([fromStop.id, transferStop.id]),
      durationMinutes: leg1Duration,
    };

    const walkSeg: JourneySegment = WalkingSegmentGenerator.generate(transferStop, transferStop, walkDuration);

    const seg2: JourneySegment = {
      type: "bus",
      routeId: leg2Route.id,
      routeName: leg2Route.name,
      routeColor: leg2Route.color,
      fromStopId: transferStop.id,
      fromStopName: transferStop.name,
      toStopId: toStop.id,
      toStopName: toStop.name,
      path: buildBusPath([transferStop.id, toStop.id]),
      durationMinutes: leg2Duration,
    };

    return {
      id: nextId(),
      fromStopId: fromStop.id,
      fromStopName: fromStop.name,
      toStopId: toStop.id,
      toStopName: toStop.name,
      segments: [seg1, walkSeg, seg2],
      primaryRouteId: leg1Route.id,
      primaryRouteColor: leg1Route.color,
      totalDurationMinutes: totalDuration,
      walkingMinutes: walkDuration,
      transfers: 1,
      fare: FareEstimator.estimate(fromStop, toStop, 1),
      departureTime: departure,
      arrivalTime: arrival,
      occupancy: 0.5 + Math.random() * 0.4,
      environmentScore: 60 + Math.floor(Math.random() * 25),
    };
  }
}

export const MockRouteGenerator = MockRouteGeneratorClass.getInstance();
