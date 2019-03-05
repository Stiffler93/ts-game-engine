import {Injectable} from '@angular/core';
import {Entity} from '../elements/Entity';
import {Point} from '../elements/util/Point';
import {Rectangle} from '../elements/Rectangle';
import {PlainUpdatable} from '../elements/PlainUpdatable';
import {PlainMovable} from '../elements/PlainMovable';
import {EntityStyle} from '../elements/util/EntityStyle';
import {Movable} from '../elements/Movable';

@Injectable({
  providedIn: 'root'
})
export class GameEntitiesService {

  private static SERVICE: GameEntitiesService;

  private entities: Entity[] = [];

  constructor() {
    const movable: Movable = new PlainMovable();
    GameEntitiesService.SERVICE = this;
    const e1: Entity = new Entity(new Point(77, 23), true,
      new Rectangle(16, 16, new EntityStyle({})), new PlainUpdatable(), new PlainMovable());
    this.entities.push(e1);
    const e2: Entity = new Entity(new Point(30, 100), true,
      new Rectangle(16, 16, new EntityStyle({})), new PlainUpdatable(), new PlainMovable());
    this.entities.push(e2);
  }

  public static getInstance(): GameEntitiesService {
    return GameEntitiesService.SERVICE;
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  public removeEntity(entity: Entity): void {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  public getAllEntities(): Entity[] {
    return this.entities;
  }
}
