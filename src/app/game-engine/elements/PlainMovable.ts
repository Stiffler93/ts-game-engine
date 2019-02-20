import {Movable} from './Movable';
import {Entity} from './Entity';
import {Point} from './util/Point';

export class PlainMovable implements Movable {

  private entity: Entity;

  constructor() {
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  public move(x: number, y: number): Point {
    const curPos: Point = this.entity.getPosition();
    const newPos: Point = new Point(curPos.x + x, curPos.y + y);
    this.entity.setPosition(newPos);
    return newPos;
  }

  public moveTo(x: number, y: number): Point {
    const newPos: Point = new Point(x, y);
    this.entity.setPosition(newPos);
    return newPos;
  }
}
