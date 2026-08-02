import { WorldClock } from "./WorldClock";

export type TickCallback = (delta: number) => void;

export class SimulationClockClass {
  private static instance: SimulationClockClass;
  private callbacks: Set<TickCallback> = new Set();
  private lastTime = 0;
  private running = false;
  private rafId: number | null = null;

  private constructor() {}

  public static getInstance(): SimulationClockClass {
    if (!SimulationClockClass.instance) {
      SimulationClockClass.instance = new SimulationClockClass();
    }
    return SimulationClockClass.instance;
  }

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private loop = (now: number) => {
    if (!this.running) return;
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    // Advance simulation time
    WorldClock.tick(delta);

    // Notify all tick listeners
    this.callbacks.forEach((cb) => {
      try { cb(delta); } catch (e) { console.error("SimulationClock tick error:", e); }
    });

    this.rafId = requestAnimationFrame(this.loop);
  };

  public subscribe(cb: TickCallback): () => void {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }

  public isRunning(): boolean {
    return this.running;
  }
}

export const SimulationClock = SimulationClockClass.getInstance();
