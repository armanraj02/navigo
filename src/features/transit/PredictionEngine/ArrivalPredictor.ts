import { DummyETAEngine } from "@/three/simulation/DummyETAEngine";
import { WorldClock } from "@/three/simulation/WorldClock";

export const ArrivalPredictor = {
  predictStopArrival: (stopId: string, routeId: string, currentDelay: number): number => {
    const { totalMinutes } = WorldClock.getTime();
    const etaList = DummyETAEngine.getETAsForStop(stopId, Math.floor(totalMinutes));
    const match = etaList.find((e) => e.routeId === routeId);

    const baseEta = match?.etaMinutes ?? 8;
    return Math.max(1, baseEta + Math.round(currentDelay));
  },
};
