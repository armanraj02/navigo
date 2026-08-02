import { SceneEvents } from "@/three/SceneEvents";
import { WorldClock } from "@/three/simulation/WorldClock";
import { NotificationQueue } from "./NotificationQueue";
import type { LiveBusData } from "../TrackingEngine/TransitTypes";

export class NotificationEngineClass {
  private static instance: NotificationEngineClass;
  private triggeredAlerts: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): NotificationEngineClass {
    if (!NotificationEngineClass.instance) {
      NotificationEngineClass.instance = new NotificationEngineClass();
    }
    return NotificationEngineClass.instance;
  }

  /**
   * Scans tracked bus conditions and schedules notifications.
   */
  public evaluateBusAlerts(buses: LiveBusData[]): void {
    const timeStr = WorldClock.formatTime();

    buses.forEach((bus) => {
      // 1. Bus Delayed Warning
      if (bus.delayMinutes >= 6) {
        const delayKey = `${bus.id}_delay_alert`;
        if (!this.triggeredAlerts.has(delayKey)) {
          this.triggeredAlerts.add(delayKey);
          
          NotificationQueue.enqueue({
            id: `alert-delay-${bus.id}-${Date.now()}`,
            title: `Service Delay: ${bus.routeId}`,
            message: `Vehicle ${bus.id} is delayed by ${Math.round(bus.delayMinutes)} mins. Expect adjustments at ${bus.nextStopName}.`,
            priority: "high",
            timestamp: timeStr,
          });
          SceneEvents.emit("TRANSIT_ALERT", bus.routeId);
        }
      }

      // 2. Crowded Bus Notification
      if (bus.occupancy >= 0.88) {
        const crowdKey = `${bus.id}_crowded_alert`;
        if (!this.triggeredAlerts.has(crowdKey)) {
          this.triggeredAlerts.add(crowdKey);

          NotificationQueue.enqueue({
            id: `alert-crowd-${bus.id}-${Date.now()}`,
            title: `High Passenger Volume`,
            message: `Bus ${bus.id} on route ${bus.routeId} is nearing full capacity. Pre-booking or early transfers recommended.`,
            priority: "medium",
            timestamp: timeStr,
          });
        }
      }

      // 3. Near Destination Alert
      if (bus.etaMinutes <= 2 && bus.etaMinutes > 0) {
        const arrKey = `${bus.id}_arrival_alert`;
        if (!this.triggeredAlerts.has(arrKey)) {
          this.triggeredAlerts.add(arrKey);

          NotificationQueue.enqueue({
            id: `alert-arrival-${bus.id}-${Date.now()}`,
            title: `Bus Approaching Stop`,
            message: `${bus.routeId} (${bus.id}) is arriving at ${bus.nextStopName} in less than 2 minutes.`,
            priority: "critical",
            timestamp: timeStr,
          });
        }
      }
    });

    // Clear old check triggers if conditions normalize
    buses.forEach((bus) => {
      if (bus.delayMinutes < 4) {
        this.triggeredAlerts.delete(`${bus.id}_delay_alert`);
      }
      if (bus.occupancy < 0.75) {
        this.triggeredAlerts.delete(`${bus.id}_crowded_alert`);
      }
      if (bus.etaMinutes > 4) {
        this.triggeredAlerts.delete(`${bus.id}_arrival_alert`);
      }
    });
  }

  public clear(): void {
    this.triggeredAlerts.clear();
  }
}

export const NotificationEngine = NotificationEngineClass.getInstance();
