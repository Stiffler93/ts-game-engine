import {Entity} from '../Entity';

export class GameGrid {

  private entities: Entity[] = [];

  constructor() {
  }

  public getEntities(): Entity[] {
    return this.entities;
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  public removeEntity(entity: Entity): void {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }
}
