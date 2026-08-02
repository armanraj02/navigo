import type { NotificationItem } from "../TrackingEngine/TransitTypes";
import { useTransitStore } from "../TrackingEngine/TransitStore";

export class NotificationQueueClass {
  private static instance: NotificationQueueClass;

  private constructor() {}

  public static getInstance(): NotificationQueueClass {
    if (!NotificationQueueClass.instance) {
      NotificationQueueClass.instance = new NotificationQueueClass();
    }
    return NotificationQueueClass.instance;
  }

  public enqueue(item: NotificationItem): void {
    const store = useTransitStore.getState();
    store.pushNotification(item);
  }

  public dismiss(id: string): void {
    const store = useTransitStore.getState();
    store.dismissNotification(id);
  }
}

export const NotificationQueue = NotificationQueueClass.getInstance();
