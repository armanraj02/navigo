export interface LightingSetup {
  ambientIntensity: number;
  directionalIntensity: number;
  castShadows: boolean;
}

export class LightingManager {
  private config: LightingSetup;

  constructor() {
    this.config = {
      ambientIntensity: 0.4,
      directionalIntensity: 0.8,
      castShadows: true,
    };
  }

  public setNightMode(isNight: boolean): void {
    this.config.ambientIntensity = isNight ? 0.05 : 0.4;
    this.config.directionalIntensity = isNight ? 0.1 : 0.8;
  }
}
