import { MOCK_STOPS, MOCK_ROUTES } from "@/three/simulation/DummyScheduleEngine";
import { useSearchStore, MockJourney } from "./SearchState";
import { SearchHistory } from "./SearchHistory";
import { PlacesService } from "@/maps/PlacesService";
import { DirectionsService } from "@/maps/DirectionsService";

export class SearchControllerClass {
  private static instance: SearchControllerClass;

  private constructor() {}

  public static getInstance(): SearchControllerClass {
    if (!SearchControllerClass.instance) {
      SearchControllerClass.instance = new SearchControllerClass();
    }
    return SearchControllerClass.instance;
  }

  // Get autocomplete matches from stop names and Google Places in parallel
  public async getSuggestions(query: string): Promise<string[]> {
    if (!query) return [];
    const val = query.toLowerCase();

    // 1. Local stop matches
    const localMatches = MOCK_STOPS.map((s) => s.name).filter((name) =>
      name.toLowerCase().includes(val)
    );

    // 2. Google Places predictions
    const predictions = await PlacesService.getAutocompleteSuggestions(query);
    const googleMatches = predictions.map((p) => p.description);

    // Merge distinct matches
    return Array.from(new Set([...localMatches, ...googleMatches]));
  }

  // Swap From/To input values
  public async swapFromTo(): Promise<void> {
    const store = useSearchStore.getState();
    const from = store.fromQuery;
    const to = store.toQuery;
    store.setFromQuery(to);
    store.setToQuery(from);
    await this.executeSearch();
  }

  // Execute Google Directions routing calculation
  public async executeSearch(): Promise<void> {
    const store = useSearchStore.getState();
    const { fromQuery, toQuery } = store;

    if (!fromQuery || !toQuery) {
      store.setSearchResults([]);
      return;
    }

    // Persist searches
    SearchHistory.add(fromQuery);
    SearchHistory.add(toQuery);
    store.addRecentSearch(fromQuery);
    store.addRecentSearch(toQuery);

    const fromStop = MOCK_STOPS.find(
      (s) => s.name.toLowerCase() === fromQuery.toLowerCase()
    );
    const toStop = MOCK_STOPS.find(
      (s) => s.name.toLowerCase() === toQuery.toLowerCase()
    );

    const route = MOCK_ROUTES.find((r) =>
      fromStop && toStop && r.stopIds.includes(fromStop.id) && r.stopIds.includes(toStop.id)
    ) ?? MOCK_ROUTES[0];

    // Fetch directions from Google Directions Service
    const directions = await DirectionsService.getRouteDirections(fromQuery, toQuery);

    const results: MockJourney[] = [
      {
        id: `JRN-${Math.floor(100 + Math.random() * 900)}`,
        fromStopId: fromStop?.id || "custom-start",
        toStopId: toStop?.id || "custom-end",
        routeId: route.id,
        durationMinutes: Math.round(directions.durationSecond / 60) || 12,
        fare: 2.25 + directions.transfersCount * 1.5,
        transfers: directions.transfersCount,
        path: directions.coordinates,
      },
      {
        id: `JRN-${Math.floor(100 + Math.random() * 900)}`,
        fromStopId: fromStop?.id || "custom-start",
        toStopId: toStop?.id || "custom-end",
        routeId: route.id,
        durationMinutes: Math.round((directions.durationSecond * 1.3) / 60) || 18,
        fare: 3.5,
        transfers: directions.transfersCount + 1,
        path: directions.coordinates,
      },
    ];

    store.setSearchResults(results);
  }
}

export const SearchController = SearchControllerClass.getInstance();
