import { MOCK_STOPS, BusStop } from "./DummyScheduleEngine";
import { SceneEvents } from "../SceneEvents";

export class BusStopManagerClass {
  private static instance: BusStopManagerClass;
  private selectedStopId: string | null = null;

  private constructor() {}

  public static getInstance(): BusStopManagerClass {
    if (!BusStopManagerClass.instance) {
      BusStopManagerClass.instance = new BusStopManagerClass();
    }
    return BusStopManagerClass.instance;
  }

  public getAllStops(): BusStop[] {
    return MOCK_STOPS;
  }

  public getStopById(id: string): BusStop | undefined {
    return MOCK_STOPS.find((s) => s.id === id);
  }

  public selectStop(stopId: string | null): void {
    this.selectedStopId = stopId;
    SceneEvents.emit("STOP_SELECTED", stopId);
  }

  public getSelectedStopId(): string | null {
    return this.selectedStopId;
  }
}

export const BusStopManager = BusStopManagerClass.getInstance();
