import {Movable} from './Movable';
import {Entity} from './Entity';
import {Point} from './util/Point';
import {GameGrid} from './util/GameGrid';

export class PlainMovable implements Movable {

  private entity: Entity;
  private gameGrid: GameGrid;

  constructor() {
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  public move(x: number, y: number): Point {
    const curPos: Point = this.entity.getPosition();
    return new Point(curPos.x + x, curPos.y + y);
  }

  public moveTo(x: number, y: number): Point {
    return new Point(x, y);
  }

  public forGameGrid(gameGrid: GameGrid): void {
    this.gameGrid = gameGrid;
  }

  private checkForIntersections(): void {
  }
}
