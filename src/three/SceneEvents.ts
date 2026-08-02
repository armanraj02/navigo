export type SceneEventType =
  | "VIEW_CHANGED"
  | "BUS_SELECTED"
  | "STOP_SELECTED"
  | "ROUTE_SELECTED"
  | "JOURNEY_SELECTED"
  | "JOURNEY_CLEARED"
  | "TRANSIT_ALERT"
  | "BUS_TRACKED"
  | "HEATMAP_TOGGLED"
  | "REPLAY_STATE_CHANGED"
  | "CAMERA_STARTED"
  | "CAMERA_FINISHED"
  | "TRANSITION_STARTED"
  | "TRANSITION_COMPLETED"
  | "THEME_CHANGED";

export type SceneEventCallback = (data?: unknown) => void;

export class SceneEventsHub {
  private static instance: SceneEventsHub;
  private listeners: Map<SceneEventType, Set<SceneEventCallback>>;

  private constructor() {
    this.listeners = new Map();
  }

  public static getInstance(): SceneEventsHub {
    if (!SceneEventsHub.instance) {
      SceneEventsHub.instance = new SceneEventsHub();
    }
    return SceneEventsHub.instance;
  }

  public subscribe(event: SceneEventType, callback: SceneEventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => this.unsubscribe(event, callback);
  }

  public unsubscribe(event: SceneEventType, callback: SceneEventCallback): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  public emit(event: SceneEventType, data?: unknown): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in scene event callback for [${event}]:`, error);
        }
      });
    }
  }
}

export const SceneEvents = SceneEventsHub.getInstance();
