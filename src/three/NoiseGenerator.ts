export class NoiseGeneratorClass {
  private static instance: NoiseGeneratorClass;
  private seed = 12345;

  private constructor() {}

  public static getInstance(): NoiseGeneratorClass {
    if (!NoiseGeneratorClass.instance) {
      NoiseGeneratorClass.instance = new NoiseGeneratorClass();
    }
    return NoiseGeneratorClass.instance;
  }

  public setSeed(seed: number): void {
    this.seed = seed;
  }

  // Pseudo-random deterministic hash [0, 1] based on coordinates
  public random2D(x: number, z: number): number {
    const angle = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
    const finalVal = angle - Math.floor(angle);
    // Mix with seed
    const mixed = Math.sin(finalVal * this.seed) * 543.21;
    return mixed - Math.floor(mixed);
  }

  // Linear interpolation helpers
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Smooth step cosine curves
  private smoothStep(t: number): number {
    return t * t * (3 - 2 * t);
  }

  // Simple 2D Grid Value Noise
  public noise2D(x: number, z: number): number {
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    const fx = x - ix;
    const fz = z - iz;

    const tx = this.smoothStep(fx);
    const tz = this.smoothStep(fz);

    // Get grid random values
    const a = this.random2D(ix, iz);
    const b = this.random2D(ix + 1, iz);
    const c = this.random2D(ix, iz + 1);
    const d = this.random2D(ix + 1, iz + 1);

    // Interpolate rows
    const row1 = this.lerp(a, b, tx);
    const row2 = this.lerp(c, d, tx);

    return this.lerp(row1, row2, tz);
  }

  // Fractal Brownian Motion (FBM) with multiple octaves
  public fbm2D(x: number, z: number, octaves = 3): number {
    let value = 0.0;
    let amplitude = 0.5;
    let frequency = 1.0;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, z * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }
}

export const NoiseGenerator = NoiseGeneratorClass.getInstance();
