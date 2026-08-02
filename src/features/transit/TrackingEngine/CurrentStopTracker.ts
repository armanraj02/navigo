import { MOCK_STOPS, BusStop } from "@/three/simulation/DummyScheduleEngine";

export const CurrentStopTracker = {
  getNearestStop: (position: [number, number, number]): BusStop => {
    let nearest: BusStop = MOCK_STOPS[0];
    let minDistance = Infinity;

    MOCK_STOPS.forEach((stop) => {
      const dx = position[0] - stop.position[0];
      const dz = position[2] - stop.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = stop;
      }
    });

    return nearest;
  },
};
