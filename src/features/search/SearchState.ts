import { create } from "zustand";

export interface MockJourney {
  id: string;
  fromStopId: string;
  toStopId: string;
  routeId: string;
  durationMinutes: number;
  fare: number;
  transfers: number;
  path: [number, number, number][]; // coordinates for spline preview
  walkingMinutes?: number;
  occupancy?: number;
  arrivalTime?: string;
  environmentScore?: number;
}

export interface SearchState {
  fromQuery: string;
  toQuery: string;
  suggestions: string[];
  recentSearches: string[];
  searchResults: MockJourney[];
  isSearching: boolean;
  selectedJourney: MockJourney | null;
  setFromQuery: (q: string) => void;
  setToQuery: (q: string) => void;
  setSuggestions: (sugs: string[]) => void;
  addRecentSearch: (search: string) => void;
  setSearchResults: (results: MockJourney[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSelectedJourney: (journey: MockJourney | null) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  fromQuery: "",
  toQuery: "",
  suggestions: [],
  recentSearches: ["City Center", "Industrial Park", "Airport Terminal"],
  searchResults: [],
  isSearching: false,
  selectedJourney: null,
  setFromQuery: (fromQuery) => set({ fromQuery }),
  setToQuery: (toQuery) => set({ toQuery }),
  setSuggestions: (suggestions) => set({ suggestions }),
  addRecentSearch: (search) =>
    set((state) => {
      const filtered = state.recentSearches.filter((s) => s !== search);
      return { recentSearches: [search, ...filtered].slice(0, 5) };
    }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSelectedJourney: (selectedJourney) => set({ selectedJourney }),
  clearSearch: () => set({ fromQuery: "", toQuery: "", searchResults: [], selectedJourney: null }),
}));
