export interface SkyConfig {
  turbidity: number;
  rayleigh: number;
  mieCoefficient: number;
  mieDirectionalG: number;
  elevation: number;
  azimuth: number;
}

export class EnvironmentManager {
  private skySettings: SkyConfig;

  constructor() {
    this.skySettings = {
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      elevation: 2,
      azimuth: 180,
    };
  }

  public updateTime(hour: number): void {
    this.skySettings.elevation = hour;
  }
}
