export type SimTime = {
  hour: number;        // 0–23
  minute: number;      // 0–59
  totalMinutes: number; // 0–1439
  dayProgress: number;  // 0.0–1.0
};

export class WorldClockClass {
  private static instance: WorldClockClass;
  private totalMinutes = 480; // Default: 08:00 start
  private speed = 60;         // Simulation minutes per real second

  private constructor() {}

  public static getInstance(): WorldClockClass {
    if (!WorldClockClass.instance) {
      WorldClockClass.instance = new WorldClockClass();
    }
    return WorldClockClass.instance;
  }

  public tick(deltaSeconds: number): void {
    this.totalMinutes = (this.totalMinutes + this.speed * deltaSeconds) % 1440;
  }

  public getTime(): SimTime {
    const hour = Math.floor(this.totalMinutes / 60) % 24;
    const minute = Math.floor(this.totalMinutes % 60);
    return {
      hour,
      minute,
      totalMinutes: this.totalMinutes,
      dayProgress: this.totalMinutes / 1440,
    };
  }

  public setSpeed(minutesPerSecond: number): void {
    this.speed = minutesPerSecond;
  }

  public setTime(hour: number, minute = 0): void {
    this.totalMinutes = (hour * 60 + minute) % 1440;
  }

  public formatTime(): string {
    const t = this.getTime();
    return `${String(t.hour).padStart(2, "0")}:${String(t.minute).padStart(2, "0")}`;
  }
}

export const WorldClock = WorldClockClass.getInstance();
