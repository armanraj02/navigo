// Journey Search History LocalStorage Helper

export interface HistoryItem {
  fromName: string;
  toName: string;
  timestamp: number;
}

const STORAGE_KEY = "navigo_journey_history";

export class JourneyHistoryClass {
  private static instance: JourneyHistoryClass;

  private constructor() {}

  public static getInstance(): JourneyHistoryClass {
    if (!JourneyHistoryClass.instance) {
      JourneyHistoryClass.instance = new JourneyHistoryClass();
    }
    return JourneyHistoryClass.instance;
  }

  public add(fromName: string, toName: string): void {
    if (typeof window === "undefined") return;
    const items = this.getAll();
    // Filter duplicates
    const filtered = items.filter(
      (item) =>
        !(
          item.fromName.toLowerCase() === fromName.toLowerCase() &&
          item.toName.toLowerCase() === toName.toLowerCase()
        )
    );
    const newHistory: HistoryItem[] = [
      { fromName, toName, timestamp: Date.now() },
      ...filtered,
    ].slice(0, 5);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  }

  public getAll(): HistoryItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const JourneyHistory = JourneyHistoryClass.getInstance();
