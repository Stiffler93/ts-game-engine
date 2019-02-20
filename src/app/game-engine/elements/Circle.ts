import {Drawable} from './Drawable';
import {Entity} from './Entity';
import {EntityStyle} from './util/EntityStyle';
import {Point} from './util/Point';

export class Circle implements Drawable {

  private entity: Entity;

  constructor(private radius: number, private style?: EntityStyle) {
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.style) {
      this.style.applyStyles(context);
    }
    const curPos = this.transformCenterToTopLeft(this.entity.getPosition());
    context.arc(curPos.x, curPos.y, this.radius * 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  private transformCenterToTopLeft(origin: Point): Point {
    return new Point(origin.x - this.radius, origin.y - this.radius);
  }

  public bottomBorder(): number {
    return this.entity.getPosition().y + this.radius;
  }

  public leftBorder(): number {
    return this.entity.getPosition().x - this.radius;
  }

  public rightBorder(): number {
    return this.entity.getPosition().x + this.radius;
  }

  public topBorder(): number {
    return this.entity.getPosition().y - this.radius;
  }
}
