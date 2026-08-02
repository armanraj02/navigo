import { create } from "zustand";

export interface AdminIncident {
  id: string;
  title: string;
  routeId: string;
  severity: "low" | "medium" | "high";
  status: "active" | "resolved";
}

export interface AdminState {
  selectedVehicleId: string | null;
  activeFilter: "all" | "R42" | "R7" | "R15" | "warning";
  isPaused: boolean;
  simSpeed: number;
  activeWeather: "clear" | "rain" | "fog";
  isNightMode: boolean;
  incidentsList: AdminIncident[];

  selectVehicle: (id: string | null) => void;
  setFilter: (filter: "all" | "R42" | "R7" | "R15" | "warning") => void;
  setPaused: (isPaused: boolean) => void;
  setSpeed: (speed: number) => void;
  setWeather: (weather: "clear" | "rain" | "fog") => void;
  setNightMode: (isNight: boolean) => void;
  reportIncident: (title: string, routeId: string, severity: "low" | "medium" | "high") => void;
  resolveIncident: (id: string) => void;
  resetAdminState: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  selectedVehicleId: null,
  activeFilter: "all",
  isPaused: false,
  simSpeed: 60,
  activeWeather: "clear",
  isNightMode: false,
  incidentsList: [
    { id: "INC-A1", title: "R42 Checkpoint Check", routeId: "R42", severity: "low", status: "active" },
    { id: "INC-A2", title: "Street Signal Calibration", routeId: "R7", severity: "medium", status: "active" },
  ],

  selectVehicle: (selectedVehicleId) => set({ selectedVehicleId }),
  setFilter: (activeFilter) => set({ activeFilter }),
  setPaused: (isPaused) => set({ isPaused }),
  setSpeed: (simSpeed) => set({ simSpeed }),
  setWeather: (activeWeather) => set({ activeWeather }),
  setNightMode: (isNightMode) => set({ isNightMode }),

  reportIncident: (title, routeId, severity) =>
    set((state) => ({
      incidentsList: [
        ...state.incidentsList,
        {
          id: `INC-${Date.now()}`,
          title,
          routeId,
          severity,
          status: "active",
        },
      ],
    })),

  resolveIncident: (id) =>
    set((state) => ({
      incidentsList: state.incidentsList.map((inc) =>
        inc.id === id ? { ...inc, status: "resolved" } : inc
      ),
    })),

  resetAdminState: () =>
    set({
      selectedVehicleId: null,
      activeFilter: "all",
      isPaused: false,
      simSpeed: 60,
      activeWeather: "clear",
      isNightMode: false,
      incidentsList: [
        { id: "INC-A1", title: "R42 Checkpoint Check", routeId: "R42", severity: "low", status: "active" },
        { id: "INC-A2", title: "Street Signal Calibration", routeId: "R7", severity: "medium", status: "active" },
      ],
    }),
}));
