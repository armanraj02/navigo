import { SelectionManager } from "./SelectionManager";

export class InteractionManagerClass {
  private static instance: InteractionManagerClass;
  private pointerCoordinates: { x: number; y: number } = { x: 0, y: 0 };

  private constructor() {}

  public static getInstance(): InteractionManagerClass {
    if (!InteractionManagerClass.instance) {
      InteractionManagerClass.instance = new InteractionManagerClass();
    }
    return InteractionManagerClass.instance;
  }

  public updatePointer(clientX: number, clientY: number, width: number, height: number): void {
    // Map client mouse coordinates to normalized device coordinates (-1 to +1)
    this.pointerCoordinates.x = (clientX / width) * 2 - 1;
    this.pointerCoordinates.y = -(clientY / height) * 2 + 1;
  }

  public getPointer(): { x: number; y: number } {
    return this.pointerCoordinates;
  }

  // Simulated click raycaster selection
  public performRaycastSelect(): void {
    const px = this.pointerCoordinates.x;
    const py = this.pointerCoordinates.y;

    // Simulated hit detection depending on quadrant coordinates click
    if (px > 0.2 && py > 0.2) {
      SelectionManager.selectBus("BUS-108");
    } else if (px < -0.2 && py < -0.2) {
      SelectionManager.selectStop("STOP-402");
    }
  }
}

export const InteractionManager = InteractionManagerClass.getInstance();
