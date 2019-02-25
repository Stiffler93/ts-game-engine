import {Updatable} from './Updatable';
import {Entity} from './Entity';
import {Point} from './util/Point';

export class PlainUpdatable implements Updatable {

  private entity: Entity;
  private velocity: Point = new Point(1, 1);

  constructor() {
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  public update(): void {
    this.move();
  }

  private move(): void {

    const curPos = this.entity.getPosition();
    if (curPos.x > 150) {
      this.velocity.x = -1;
    } else if (curPos.x < 75) {
      this.velocity.x = 1;
    }

    if (curPos.y > 209) {
      this.velocity.y = -1;
    } else if (curPos.y < 101) {
      this.velocity.y = 1;
    }

    this.entity.move(this.velocity.x, this.velocity.y);
  }
}
