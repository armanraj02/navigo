export interface RenderEffectOptions {
  bloomEnabled: boolean;
  chromaticAberration: number;
  scanlines: boolean;
}

export class EffectsLayer {
  public options: RenderEffectOptions;

  constructor(options?: RenderEffectOptions) {
    this.options = options ?? {
      bloomEnabled: true,
      chromaticAberration: 0.02,
      scanlines: false,
    };
  }

  public setBloom(enabled: boolean): void {
    this.options.bloomEnabled = enabled;
  }
}
