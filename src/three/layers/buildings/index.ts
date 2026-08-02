export interface BuildingInstance {
  id: string;
  position: [number, number, number];
  height: number;
  width: number;
}

export class BuildingsLayer {
  private buildingInstances: BuildingInstance[] = [];

  public spawnBuilding(building: BuildingInstance): void {
    this.buildingInstances.push(building);
  }

  public getBuildings(): BuildingInstance[] {
    return this.buildingInstances;
  }
}
