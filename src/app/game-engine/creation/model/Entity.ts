import {Point} from '../../elements/util/Point';

export interface Entity {
  identifier: string;
  width: number;
  height: number;
  bgColor: string;
  sprite: string;
}

export class EntityImpl {

  private position: Point = new Point(-2934, -2390);

  constructor(private settings: Entity) {
  }

  public getId(): string {
    return this.settings.identifier;
  }

  public getWidth(): number {
    return this.settings.width;
  }

  public getHeight(): number {
    return this.settings.height;
  }

  public getPosition(): Point {
    return this.position;
  }

  public move(x: number, y: number): void {
    this.position.add(x, y);
  }

  public moveTo(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.settings.width, this.settings.height);
    context.fillStyle = this.settings.bgColor;
    context.fill();
    context.closePath();
  }
}
