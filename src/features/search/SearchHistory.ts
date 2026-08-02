export class SearchHistory {
  private static STORAGE_KEY = "navigo_search_history";

  public static get(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public static add(term: string): void {
    if (typeof window === "undefined" || !term.trim()) return;
    try {
      const current = this.get();
      const next = [term, ...current.filter((t) => t !== term)].slice(0, 8);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to write search history", e);
    }
  }

  public static clear(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {}
  }
}
