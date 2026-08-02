import { create } from "zustand";

export interface IncidentItem {
  id: string;
  type: string;
  title: string;
  status: "active" | "resolved";
}

export interface DriverState {
  activeBusId: string | null;
  cameraMode: "cockpit" | "follow" | "orbit" | "top" | "intersection" | "depot";
  speedKmh: number;
  delayMinutes: number;
  passengersCount: number;
  fuelPercent: number;
  stopsCompleted: number;
  distanceTravelledKm: number;
  tripDurationSeconds: number;
  reportedIncidents: IncidentItem[];

  selectBus: (busId: string | null) => void;
  setCameraMode: (mode: "cockpit" | "follow" | "orbit" | "top" | "intersection" | "depot") => void;
  updateTelemetry: (speed: number, delay: number, passengers: number, stops: number, distance: number) => void;
  addIncident: (type: string, title: string) => void;
  resolveIncident: (id: string) => void;
  tickDuration: (delta: number) => void;
  resetDriverState: () => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  activeBusId: "BUS-001",
  cameraMode: "follow",
  speedKmh: 0,
  delayMinutes: 0,
  passengersCount: 12,
  fuelPercent: 95,
  stopsCompleted: 0,
  distanceTravelledKm: 0.0,
  tripDurationSeconds: 0,
  reportedIncidents: [],

  selectBus: (activeBusId) => set({ activeBusId }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  updateTelemetry: (speedKmh, delayMinutes, passengersCount, stopsCompleted, distance) =>
    set((state) => ({
      speedKmh,
      delayMinutes,
      passengersCount,
      stopsCompleted,
      distanceTravelledKm: Math.round((state.distanceTravelledKm + distance) * 100) / 100,
    })),

  addIncident: (type, title) =>
    set((state) => ({
      reportedIncidents: [
        ...state.reportedIncidents,
        { id: `INC-${Date.now()}`, type, title, status: "active" },
      ],
    })),

  resolveIncident: (id) =>
    set((state) => ({
      reportedIncidents: state.reportedIncidents.map((inc) =>
        inc.id === id ? { ...inc, status: "resolved" } : inc
      ),
    })),

  tickDuration: (delta) =>
    set((state) => {
      const nextFuel = Math.max(10, state.fuelPercent - delta * 0.008);
      return {
        tripDurationSeconds: state.tripDurationSeconds + delta,
        fuelPercent: Math.round(nextFuel * 100) / 100,
      };
    }),

  resetDriverState: () =>
    set({
      activeBusId: "BUS-001",
      cameraMode: "follow",
      speedKmh: 0,
      delayMinutes: 0,
      passengersCount: 12,
      fuelPercent: 95,
      stopsCompleted: 0,
      distanceTravelledKm: 0.0,
      tripDurationSeconds: 0,
      reportedIncidents: [],
    }),
}));
