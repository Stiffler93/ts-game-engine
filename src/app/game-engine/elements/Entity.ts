import {Drawable} from './Drawable';
import {Movable} from './Movable';
import {Point} from './util/Point';
import {Updatable} from './Updatable';

export class Entity /*implements Drawable, Updatable, Movable*/ {

  constructor(private position: Point, private visible: boolean = true,
              private drawable: Drawable, private updatable?: Updatable, private movable?: Movable) {
    this.drawable.forEntity(this);

    if (this.movable) {
      this.movable.forEntity(this);
    }

    if (this.updatable) {
      this.updatable.forEntity(this);
    }
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setVisibility(visiblity: boolean): void {
    this.visible = visiblity;
  }

  public getPosition(): Point {
    return this.position;
  }

  public move(x: number, y: number) {
    if (this.movable) {
      this.position = this.movable.move(x, y);
    }
  }

  public moveTo(x: number, y: number) {
    if (this.movable) {
      this.position = this.movable.moveTo(x, y);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.isVisible()) {
      this.drawable.draw(context);
    }
  }

  public update(): void {
    if (this.updatable) {
      this.updatable.update();
    }
  }
}
