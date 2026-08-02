import { create } from "zustand";
import type {
  JourneyOption,
  JourneyFilter,
  JourneyPreviewMode,
  JourneySortMode,
} from "./JourneyTypes";

export interface JourneyState {
  // Data
  journeyOptions: JourneyOption[];
  selectedJourney: JourneyOption | null;
  comparisonJourneys: JourneyOption[];
  isSearching: boolean;
  // Preview state
  previewMode: JourneyPreviewMode;
  activeSegmentIndex: number;
  // Filter state
  filter: JourneyFilter;
  // Actions
  setOptions: (options: JourneyOption[]) => void;
  selectJourney: (option: JourneyOption | null) => void;
  clearJourney: () => void;
  addToComparison: (option: JourneyOption) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  setPreviewMode: (mode: JourneyPreviewMode) => void;
  setActiveSegment: (idx: number) => void;
  setIsSearching: (v: boolean) => void;
  setSortMode: (mode: JourneySortMode) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  journeyOptions: [],
  selectedJourney: null,
  comparisonJourneys: [],
  isSearching: false,
  previewMode: "idle",
  activeSegmentIndex: 0,
  filter: {
    sortMode: "fastest",
    maxTransfers: null,
    accessible: false,
  },

  setOptions: (journeyOptions) => set({ journeyOptions }),
  selectJourney: (selectedJourney) => set({ selectedJourney, previewMode: selectedJourney ? "route" : "idle" }),
  clearJourney: () =>
    set({ selectedJourney: null, previewMode: "idle", activeSegmentIndex: 0 }),
  addToComparison: (option) =>
    set((s) => ({
      comparisonJourneys: s.comparisonJourneys.find((j) => j.id === option.id)
        ? s.comparisonJourneys
        : [...s.comparisonJourneys, option].slice(0, 3),
    })),
  removeFromComparison: (id) =>
    set((s) => ({ comparisonJourneys: s.comparisonJourneys.filter((j) => j.id !== id) })),
  clearComparison: () => set({ comparisonJourneys: [] }),
  setPreviewMode: (previewMode) => set({ previewMode }),
  setActiveSegment: (activeSegmentIndex) => set({ activeSegmentIndex }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSortMode: (mode) =>
    set((s) => ({ filter: { ...s.filter, sortMode: mode } })),
}));
