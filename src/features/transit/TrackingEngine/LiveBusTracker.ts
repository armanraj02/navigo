import { BusState } from "@/three/simulation/BusPool";
import { CurrentStopTracker } from "./CurrentStopTracker";
import { NextStopTracker } from "./NextStopTracker";
import { BusStatusIndicator } from "./BusStatusIndicator";
import { OccupancySimulator } from "../OccupancySimulation/OccupancySimulator";
import { DelaySimulator } from "../DelaySimulation/DelaySimulator";
import { DummyETAEngine } from "@/three/simulation/DummyETAEngine";
import type { LiveBusData } from "./TransitTypes";

export const LiveBusTracker = {
  track: (bus: BusState): LiveBusData => {
    const posTuple: [number, number, number] = [bus.position.x, bus.position.y, bus.position.z];
    const nearestStop = CurrentStopTracker.getNearestStop(posTuple);
    const nextStop = NextStopTracker.getNextStop(bus.routeId, bus.currentStopIdx);
    
    // Live calculation integrations
    const delay = DelaySimulator.getDelayForBus(bus.id, bus.progress);
    const status = BusStatusIndicator.getStatus(delay);
    const occupancy = OccupancySimulator.getOccupancyForBus(bus.id);
    const occupancyLevel = OccupancySimulator.getLevel(occupancy);

    // Dynamic ETA derived from schedule engine stops left
    const baseEta = DummyETAEngine.getETAsForStop(nextStop.id, Math.floor(Date.now() / 60000))?.[0]?.etaMinutes ?? 4;
    const etaMinutes = Math.max(1, baseEta + Math.floor(delay));

    const healthStatus: "good" | "warning" | "critical" = 
      delay > 10 ? "critical" : delay > 4 ? "warning" : "good";

    return {
      id: bus.id,
      routeId: bus.routeId,
      routeColor: bus.routeColor,
      position: posTuple,
      rotation: bus.rotation,
      speedKmh: Math.round(bus.speed * 3.6),
      currentStopId: nearestStop.id,
      currentStopName: nearestStop.name,
      nextStopId: nextStop.id,
      nextStopName: nextStop.name,
      etaMinutes,
      delayMinutes: delay,
      delayStatus: status,
      occupancy,
      occupancyLevel,
      healthStatus,
    };
  },
};
