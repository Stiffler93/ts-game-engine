import {Point} from '../../elements/util/Point';

export interface Entity {
  identifier: string;
  width: number;
  height: number;
  bgColor: string;
  sprite: string;
}

export class EntityImpl {

  constructor(private settings: Entity, private position: Point) {
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

  public draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.settings.width, this.settings.height);
    context.fillStyle = this.settings.bgColor;
    context.fill();
    context.closePath();
  }
}
