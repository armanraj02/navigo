import { BusManager } from "./BusManager";
import { TrafficManager } from "./TrafficManager";
import { SimulationClock } from "./SimulationClock";
import { WorldClock } from "./WorldClock";

export class TransitSimulationClass {
  private static instance: TransitSimulationClass;
  private running = false;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): TransitSimulationClass {
    if (!TransitSimulationClass.instance) {
      TransitSimulationClass.instance = new TransitSimulationClass();
    }
    return TransitSimulationClass.instance;
  }

  public start(): void {
    if (this.running) return;
    this.running = true;

    // Initialize subsystems
    BusManager.init();
    TrafficManager.init();

    // Subscribe to simulation clock for tick updates
    this.unsubscribe = SimulationClock.subscribe((delta: number) => {
      BusManager.tick(delta);
      TrafficManager.tick(delta);
    });

    // Start the simulation clock
    SimulationClock.start();
  }

  public stop(): void {
    this.running = false;
    SimulationClock.stop();
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  public getSimTime(): string {
    return WorldClock.formatTime();
  }

  public isRunning(): boolean {
    return this.running;
  }
}

export const TransitSimulation = TransitSimulationClass.getInstance();
