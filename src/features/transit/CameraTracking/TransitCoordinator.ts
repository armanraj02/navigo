import { SimulationClock } from "@/three/simulation/SimulationClock";
import { BusManager } from "@/three/simulation/BusManager";
import { LiveBusTracker } from "../TrackingEngine/LiveBusTracker";
import { useTransitStore } from "../TrackingEngine/TransitStore";
import { NotificationEngine } from "../NotificationEngine/NotificationEngine";
import { PassengerCoordinator } from "@/features/passenger/PassengerCoordinator/PassengerCoordinator";
import type { LiveBusData } from "../TrackingEngine/TransitTypes";

export class TransitCoordinatorClass {
  private static instance: TransitCoordinatorClass;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): TransitCoordinatorClass {
    if (!TransitCoordinatorClass.instance) {
      TransitCoordinatorClass.instance = new TransitCoordinatorClass();
    }
    return TransitCoordinatorClass.instance;
  }

  /**
   * Initializes the transit intelligence updates on SimulationClock ticks.
   */
  public start(): void {
    if (this.unsubscribe) return;

    this.unsubscribe = SimulationClock.subscribe(() => {
      const rawBuses = BusManager.getAllBuses();
      const trackedBuses: LiveBusData[] = [];

      let totalDelay = 0;
      let totalOccupancy = 0;

      rawBuses.forEach((bus) => {
        const tracked = LiveBusTracker.track(bus);
        trackedBuses.push(tracked);
        useTransitStore.getState().updateBus(bus.id, tracked);

        totalDelay += tracked.delayMinutes;
        totalOccupancy += tracked.occupancy;
      });

      // Run analytics calculations
      const activeCount = rawBuses.length;
      const avgDelay = activeCount > 0 ? totalDelay / activeCount : 0;
      const avgOccupancy = activeCount > 0 ? (totalOccupancy / activeCount) * 100 : 0;

      const networkStatus = avgDelay > 8 ? "Disrupted" : avgDelay > 3 ? "Degraded" : "Nominal";

      useTransitStore.getState().setAnalytics({
        activeBusesCount: activeCount,
        averageDelayMinutes: Math.round(avgDelay * 10) / 10,
        averageOccupancyPercent: Math.round(avgOccupancy),
        networkStatus,
        simulationSpeed: 60,
      });

      // Dispatch alert conditions
      NotificationEngine.evaluateBusAlerts(trackedBuses);
    });
  }

  public stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    NotificationEngine.clear();
  }

  // Camera preset actions routing through the PassengerCoordinator contract
  public topView(): void {
    useTransitStore.getState().setCameraMode("TopView");
    PassengerCoordinator.resetCamera();
  }

  public followBus(busId: string): void {
    useTransitStore.getState().setCameraMode("FollowBus");
    PassengerCoordinator.handleBusSelect(busId);
  }

  public intersectionView(): void {
    useTransitStore.getState().setCameraMode("Intersection");
    // Fly to main city center intersection
    PassengerCoordinator["sceneManager"].cameraController.flyTo(
      [15, 20, 25],
      [0, 0, 0],
      1.1,
      1200
    );
  }

  public destinationView(): void {
    useTransitStore.getState().setCameraMode("Destination");
    // Fly focus to Airport Terminal
    PassengerCoordinator.handleStopSelect("STOP-05");
  }
}

export const TransitCoordinator = TransitCoordinatorClass.getInstance();
