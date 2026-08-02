export interface NavigationControls {
  enabled: boolean;
  enableZoom: boolean;
  enableRotate: boolean;
  enablePan: boolean;
}

export class NavigoControls implements NavigationControls {
  public enabled = true;
  public enableZoom = true;
  public enableRotate = true;
  public enablePan = true;

  public update(): void {
    // Controls animation update frame loop placeholder
  }
}
