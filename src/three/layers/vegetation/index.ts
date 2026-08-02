export interface PropInstance {
  id: string;
  type: "tree" | "bush" | "flower";
  position: [number, number, number];
  scale: number;
}

export class VegetationLayer {
  private props: PropInstance[] = [];

  public addProp(prop: PropInstance): void {
    this.props.push(prop);
  }

  public getProps(): PropInstance[] {
    return this.props;
  }
}
