import { create } from "zustand";
import type {
  LiveBusData,
  NotificationItem,
  AnalyticsSnapshot,
  CameraTrackingMode,
} from "./TransitTypes";

export interface TransitState {
  liveBuses: Record<string, LiveBusData>;
  activeNotifications: NotificationItem[];
  analyticsSnapshot: AnalyticsSnapshot;
  heatMapEnabled: boolean;
  activeHeatMapLayer: "density" | "demand" | "buses";
  cameraTrackingMode: CameraTrackingMode;

  updateBus: (id: string, data: LiveBusData) => void;
  pushNotification: (item: NotificationItem) => void;
  dismissNotification: (id: string) => void;
  setAnalytics: (snapshot: AnalyticsSnapshot) => void;
  setHeatMapEnabled: (enabled: boolean) => void;
  setHeatMapLayer: (layer: "density" | "demand" | "buses") => void;
  setCameraMode: (mode: CameraTrackingMode) => void;
  clearState: () => void;
}

const initialAnalytics: AnalyticsSnapshot = {
  activeBusesCount: 0,
  averageDelayMinutes: 0,
  averageOccupancyPercent: 0,
  networkStatus: "Nominal",
  simulationSpeed: 60,
};

export const useTransitStore = create<TransitState>((set) => ({
  liveBuses: {},
  activeNotifications: [],
  analyticsSnapshot: initialAnalytics,
  heatMapEnabled: false,
  activeHeatMapLayer: "density",
  cameraTrackingMode: "TopView",

  updateBus: (id, data) =>
    set((state) => ({
      liveBuses: {
        ...state.liveBuses,
        [id]: data,
      },
    })),

  pushNotification: (item) =>
    set((state) => {
      // Avoid duplicate notifications by ID
      if (state.activeNotifications.some((n) => n.id === item.id)) {
        return state;
      }
      return {
        activeNotifications: [item, ...state.activeNotifications].slice(0, 8),
      };
    }),

  dismissNotification: (id) =>
    set((state) => ({
      activeNotifications: state.activeNotifications.filter((n) => n.id !== id),
    })),

  setAnalytics: (analyticsSnapshot) => set({ analyticsSnapshot }),

  setHeatMapEnabled: (heatMapEnabled) => set({ heatMapEnabled }),

  setHeatMapLayer: (activeHeatMapLayer) => set({ activeHeatMapLayer }),

  setCameraMode: (cameraTrackingMode) => set({ cameraTrackingMode }),

  clearState: () =>
    set({
      liveBuses: {},
      activeNotifications: [],
      analyticsSnapshot: initialAnalytics,
      heatMapEnabled: false,
      activeHeatMapLayer: "density",
      cameraTrackingMode: "TopView",
    }),
}));
