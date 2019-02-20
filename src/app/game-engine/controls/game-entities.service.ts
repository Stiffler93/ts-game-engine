import {Injectable} from '@angular/core';
import {Entity} from '../elements/Entity';
import {Point} from '../elements/util/Point';
import {Rectangle} from '../elements/Rectangle';
import {PlainUpdatable} from '../elements/PlainUpdatable';
import {PlainMovable} from '../elements/PlainMovable';
import {EntityStyle} from '../elements/util/EntityStyle';

@Injectable({
  providedIn: 'root'
})
export class GameEntitiesService {

  private entities: Entity[] = [];

  constructor() {
    const p: Point = new Point(77, 23);
    console.log({'Point': p});
    const e1: Entity = new Entity(p, true, new Rectangle(16, 16, new EntityStyle({})), new PlainUpdatable(), new PlainMovable());
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
