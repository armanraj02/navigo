import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { SceneEvents } from "@/three/SceneEvents";
import { PassengerCoordinator } from "@/features/passenger/PassengerCoordinator/PassengerCoordinator";
import { MockRouteGenerator } from "../RouteEngine/MockRouteGenerator";
import { RouteComparator } from "../RouteEngine/RouteComparator";
import { sortJourneys } from "../RouteEngine/RouteSorter";
import { useJourneyStore } from "../JourneyState/JourneyState";
import type { JourneyOption } from "../JourneyState/JourneyTypes";
import { GeocoderService } from "@/maps/GeocoderService";
import { DirectionsService } from "@/maps/DirectionsService";
import { MapUtilities } from "@/maps/MapUtilities";

/**
 * Single orchestration point for the journey planning module.
 *
 * Camera contract:
 *   JourneyCoordinator → PassengerCoordinator → SceneManager → NavigationEngine → CameraController
 */
export class JourneyCoordinatorClass {
  private static instance: JourneyCoordinatorClass;

  private constructor() {}

  public static getInstance(): JourneyCoordinatorClass {
    if (!JourneyCoordinatorClass.instance) {
      JourneyCoordinatorClass.instance = new JourneyCoordinatorClass();
    }
    return JourneyCoordinatorClass.instance;
  }

  /** Search from/to stop names, populate JourneyState with ranked results */
  public async search(fromName: string, toName: string): Promise<void> {
    const store = useJourneyStore.getState();
    store.setIsSearching(true);

    const fromStop = MOCK_STOPS.find(
      (s) => s.name.toLowerCase() === fromName.toLowerCase()
    );
    const toStop = MOCK_STOPS.find(
      (s) => s.name.toLowerCase() === toName.toLowerCase()
    );

    let fromPos: [number, number, number] = fromStop ? fromStop.position : [0, 0.1, 0];
    let toPos: [number, number, number] = toStop ? toStop.position : [0, 0.1, 0];

    // Resolve starting address geocode coords if not matching local stop
    if (!fromStop) {
      const geo = await GeocoderService.geocode(fromName);
      if (geo) {
        const [x, z] = MapUtilities.gpsToLocal(geo.lat, geo.lng);
        fromPos = [x, 0.1, z];
      }
    }

    // Resolve ending address geocode coords if not matching local stop
    if (!toStop) {
      const geo = await GeocoderService.geocode(toName);
      if (geo) {
        const [x, z] = MapUtilities.gpsToLocal(geo.lat, geo.lng);
        toPos = [x, 0.1, z];
      }
    }

    // Fetch directions route spline geometry
    const directions = await DirectionsService.getRouteDirections(fromName, toName);

    // Call Mock generator as standard baseline
    const raw = MockRouteGenerator.generate(fromStop?.id || "custom-start", toStop?.id || "custom-end");
    
    // Inject the real geocoded path coords and travel durations into generated options
    const updatedOptions = raw.map((opt) => ({
      ...opt,
      fromStopName: fromStop?.name || fromName,
      toStopName: toStop?.name || toName,
      totalDurationMinutes: Math.round(directions.durationSecond / 60) || opt.totalDurationMinutes,
      transfers: directions.transfersCount,
      path: directions.coordinates,
      segments: opt.segments.map((seg) => ({
        ...seg,
        path: directions.coordinates,
      })),
    }));

    const ranked = RouteComparator.rank(updatedOptions);
    const sorted = sortJourneys(ranked, store.filter.sortMode);
    store.setOptions(sorted);
    store.setIsSearching(false);

    // Focus camera overview of full route
    PassengerCoordinator.handleJourneyFocus(fromPos, toPos);
  }

  /** User selected a specific journey option */
  public selectJourney(option: JourneyOption): void {
    const store = useJourneyStore.getState();
    store.selectJourney(option);
    SceneEvents.emit("JOURNEY_SELECTED", option);

    // Highlight the primary route spline
    PassengerCoordinator.handleRouteSelect(option.primaryRouteId);

    // Focus camera on origin stop
    PassengerCoordinator.handleStopSelect(option.fromStopId);
  }

  /** Enter route-follow camera mode — travels along the route path */
  public enterFollowMode(): void {
    useJourneyStore.getState().setPreviewMode("follow");
    PassengerCoordinator.handleCameraModeChange("cinematic");
  }

  /** Bird's-eye view of the full route */
  public enterOverviewMode(): void {
    useJourneyStore.getState().setPreviewMode("overview");
    PassengerCoordinator.resetCamera();
  }

  /** Focus camera on the destination stop */
  public focusDestination(): void {
    const { selectedJourney } = useJourneyStore.getState();
    if (!selectedJourney) return;
    useJourneyStore.getState().setPreviewMode("destination");
    PassengerCoordinator.handleStopSelect(selectedJourney.toStopId);
  }

  /** Focus camera on a specific transfer stop by segment index */
  public focusTransfer(segmentIdx: number): void {
    const { selectedJourney } = useJourneyStore.getState();
    if (!selectedJourney) return;
    const seg = selectedJourney.segments[segmentIdx];
    if (!seg) return;
    useJourneyStore.getState().setActiveSegment(segmentIdx);
    useJourneyStore.getState().setPreviewMode("transfer");
    PassengerCoordinator.handleStopSelect(seg.toStopId);
  }

  /** Focus camera on a bus following this journey's route */
  public focusFollowBus(busId: string): void {
    useJourneyStore.getState().setPreviewMode("follow");
    PassengerCoordinator.handleBusSelect(busId);
  }

  /** Clear journey selection and reset camera */
  public clearJourney(): void {
    useJourneyStore.getState().clearJourney();
    SceneEvents.emit("JOURNEY_CLEARED");
    PassengerCoordinator.handleRouteSelect(null);
    PassengerCoordinator.resetCamera();
  }

  /** Camera overview of a route between two stops */
  private focusRouteOverview(fromStopId: string, toStopId: string): void {
    const from = MOCK_STOPS.find((s) => s.id === fromStopId);
    const to = MOCK_STOPS.find((s) => s.id === toStopId);
    if (!from || !to) return;
    PassengerCoordinator.handleJourneyFocus(from.position, to.position);
  }
}

export const JourneyCoordinator = JourneyCoordinatorClass.getInstance();
