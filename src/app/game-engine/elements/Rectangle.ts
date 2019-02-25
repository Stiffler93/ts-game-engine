import {Drawable} from './Drawable';
import {Entity} from './Entity';
import {EntityStyle} from './util/EntityStyle';
import {Point} from './util/Point';

export class Rectangle implements Drawable {

  private entity: Entity;

  constructor(private width: number, private height: number, private style?: EntityStyle) {
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.style) {
      this.style.applyStyles(context);
    }
    const curPos = this.transformCenterToTopLeft(this.entity.getPosition());
    console.log({'draw rect at': curPos});
    context.rect(curPos.x, curPos.y, this.width, this.height);
    context.fill();
    context.stroke();
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  private transformCenterToTopLeft(origin: Point): Point {
    console.log({'origin': origin});
    return new Point(origin.x - this.width / 2, origin.y - this.height / 2);
  }
}
