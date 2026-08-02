export type SignalPhase = "green" | "yellow" | "red";

export interface TrafficSignal {
  id: string;
  position: [number, number, number];
  phase: SignalPhase;
  phaseDuration: number; // seconds per green phase
  elapsed: number;
}

export class TrafficSignalSystemClass {
  private static instance: TrafficSignalSystemClass;
  private signals: TrafficSignal[] = [];

  private constructor() {
    this.buildSignals();
  }

  public static getInstance(): TrafficSignalSystemClass {
    if (!TrafficSignalSystemClass.instance) {
      TrafficSignalSystemClass.instance = new TrafficSignalSystemClass();
    }
    return TrafficSignalSystemClass.instance;
  }

  private buildSignals(): void {
    const intersections: Array<[number, number, number]> = [
      [0, 0, 0], [20, 0, 0], [-20, 0, 0],
      [0, 0, 20], [0, 0, -20], [20, 0, 20],
    ];

    intersections.forEach((pos, i) => {
      this.signals.push({
        id: `SIG-${i}`,
        position: pos,
        phase: i % 2 === 0 ? "green" : "red",
        phaseDuration: 15 + (i % 3) * 5,
        elapsed: (i * 7) % 20,
      });
    });
  }

  public tick(delta: number): void {
    this.signals.forEach((sig) => {
      sig.elapsed += delta;
      if (sig.elapsed >= sig.phaseDuration) {
        sig.elapsed = 0;
        sig.phase = this.nextPhase(sig.phase);
      }
    });
  }

  private nextPhase(current: SignalPhase): SignalPhase {
    if (current === "green") return "yellow";
    if (current === "yellow") return "red";
    return "green";
  }

  public getSignals(): TrafficSignal[] {
    return this.signals;
  }
}

export const TrafficSignalSystem = TrafficSignalSystemClass.getInstance();
