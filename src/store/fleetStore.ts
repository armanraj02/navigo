import { create } from "zustand";

export interface BusData {
  id: string;
  routeId: string;
  latitude: number;
  longitude: number;
  speed: number;
  occupancy: number;
  status: "active" | "delayed" | "inactive";
}

export interface FleetState {
  buses: BusData[];
  selectedBusId: string | null;
  setBuses: (buses: BusData[]) => void;
  selectBus: (id: string | null) => void;
}

export const useFleetStore = create<FleetState>((set) => ({
  buses: [],
  selectedBusId: null,
  setBuses: (buses) => set({ buses }),
  selectBus: (selectedBusId) => set({ selectedBusId }),
}));
