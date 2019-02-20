import {Injectable} from '@angular/core';
import {Entity} from '../elements/Entity';
import {Point} from '../elements/util/Point';
import {Drawable} from '../elements/Drawable';
import {Updatable} from '../elements/Updatable';
import {Movable} from '../elements/Movable';

@Injectable({
  providedIn: 'root'
})
export class GameEntitiesService {

  private entities: Entity[] = [];

  constructor() {
    const e1: Entity = new Entity(new Point(10, 10), <Drawable>{
      draw: (context: CanvasRenderingContext2D, position: Point) => {
        context.rect(position.x, position.y, 16, 16);
        context.strokeStyle = '#ffffff';
        context.stroke();
      }
    }, <Updatable> {
      forEntity: (e: Entity) => {},
      update: () => {
        e1.move(1, 1);
      }
    }, <Movable> {
      move: (origin: Point, x: number, y: number) => {
        origin.x += x;
        origin.y += y;
        return origin;
      },
      moveTo: (x: number, y: number) => new Point(x, y)
    });
    const e2: Entity = new Entity(new Point(10, 10), <Drawable>{
      draw: (context: CanvasRenderingContext2D, position: Point) => {
        context.rect(16 + position.x, 16 + position.y, 16, 16);
        context.strokeStyle = '#ffffff';
        context.stroke();
      }
    }, <Updatable> {
      forEntity: (e: Entity) => {},
      update: () => {
        e2.move(1, 0);
      }
    }, <Movable> {
      move: (origin: Point, x: number, y: number) => {
        origin.x += x;
        origin.y += y;
        return origin;
      },
      moveTo: (x: number, y: number) => new Point(x, y)
    });

    this.entities.push(e1);
    this.entities.push(e2);
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
