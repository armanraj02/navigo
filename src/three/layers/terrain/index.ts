export interface TerrainProps {
  width: number;
  height: number;
  segments: number;
}

export class TerrainLayer {
  public options: TerrainProps;

  constructor(options?: TerrainProps) {
    this.options = options ?? { width: 200, height: 200, segments: 64 };
  }

  public rebuild(): void {
    // Generate terrain mesh buffers placeholder
  }
}
