import {Injectable} from '@angular/core';
import {Entity} from '../elements/Entity';
import {Point} from '../elements/util/Point';
import {Drawable} from '../elements/Drawable';
import {Updatable} from '../elements/Updatable';
import {Movable} from '../elements/Movable';
import {Rectangle} from '../elements/Rectangle';
import {PlainUpdatable} from '../elements/PlainUpdatable';
import {PlainMovable} from '../elements/PlainMovable';

@Injectable({
  providedIn: 'root'
})
export class GameEntitiesService {

  private entities: Entity[] = [];

  constructor() {
    const e1: Entity = new Entity(new Point(100, 100), true, new Rectangle(100, 80), new PlainUpdatable(), new PlainMovable());
    this.entities.push(e1);
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
