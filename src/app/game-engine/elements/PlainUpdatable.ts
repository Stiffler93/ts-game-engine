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

  private move(): boolean {
    if (!this.entity.movable) {
      return false;
    }

    const curPos = this.entity.getPosition();
    if (curPos.x > 400) {
      this.velocity.x = -1;
    } else if (curPos.x < 100) {
      this.velocity.x = 1;
    }

    if (curPos.y > 530) {
      curPos.y = -1;
    } else if (curPos.y < 170) {
      curPos.y = 1;
    }

    this.entity.movable.move(this.velocity.x, this.velocity.y);
  }
}
