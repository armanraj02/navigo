// Simple Feature Flags configuration module

export type FeatureFlagKey =
  | "realtime-websocket"
  | "persistent-storage"
  | "crash-analytics"
  | "dev-debugger-lines"
  | "eco-scoring-details";

export class FeatureFlagsClass {
  private static instance: FeatureFlagsClass;
  private flags: Record<FeatureFlagKey, boolean> = {
    "realtime-websocket": false,
    "persistent-storage": true,
    "crash-analytics": false,
    "dev-debugger-lines": true,
    "eco-scoring-details": true,
  };

  private constructor() {}

  public static getInstance(): FeatureFlagsClass {
    if (!FeatureFlagsClass.instance) {
      FeatureFlagsClass.instance = new FeatureFlagsClass();
    }
    return FeatureFlagsClass.instance;
  }

  public isEnabled(key: FeatureFlagKey): boolean {
    return this.flags[key] ?? false;
  }

  public setFlag(key: FeatureFlagKey, enabled: boolean): void {
    this.flags[key] = enabled;
  }
}

export const FeatureFlags = FeatureFlagsClass.getInstance();
