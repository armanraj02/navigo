import { create } from "zustand";

export type AppView = "loading" | "landing" | "passenger" | "driver" | "admin";

export interface UIState {
  currentView: AppView;
  isSidebarOpen: boolean;
  activeModalId: string | null;
  setView: (view: AppView) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  openModal: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: "passenger",
  isSidebarOpen: true,
  activeModalId: null,
  setView: (currentView) => set({ currentView }),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  openModal: (activeModalId) => set({ activeModalId }),
}));
