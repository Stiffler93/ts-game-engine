import {Drawable} from './Drawable';
import {Entity} from './Entity';

export class Rectangle implements Drawable {

  private entity: Entity;

  constructor(private width: number, private height: number) {
  }

  public draw(context: CanvasRenderingContext2D): void {
    // context.beginPath();
    context.strokeStyle = 'blue';
    context.fillStyle = 'blue';
    const curPos = this.entity.getPosition();
    // context.rect(curPos.x, curPos.y, this.width, this.height);
    context.rect(curPos.x, curPos.y, this.width, this.height);
    context.fill();
    context.stroke();
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }
}
