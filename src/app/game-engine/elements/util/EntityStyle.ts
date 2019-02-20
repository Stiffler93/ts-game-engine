export class EntityStyle {
  public stroke: string;
  public fill: string;

  constructor({stroke = 'white', fill = 'white'}:
                { stroke?: string, fill?: string }) {
    this.stroke = stroke;
    this.fill = fill;
  }

  public applyStyles(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.stroke;
    context.fillStyle = this.fill;
  }
}
