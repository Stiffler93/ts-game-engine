import {Drawable} from './Drawable';
import {Movable} from './Movable';
import {Point} from './util/Point';
import {Updatable} from './Updatable';

export class Entity /*implements Drawable, Updatable, Movable*/ {

  constructor(private position: Point, private drawable: Drawable, private updatable?: Updatable,
              private movable?: Movable, private visible: boolean = true) {
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

  public draw(context: CanvasRenderingContext2D): void {
    if (this.isVisible()) {
      this.drawable.draw(context, this.position);
    }
  }

  public move(x: number, y: number): Point {
    if (this.movable) {
      this.position = this.movable.move(this.position, x, y);
    }

    return this.position;
  }

  public moveTo(x: number, y: number): Point {
    if (this.movable) {
      this.position = this.movable.moveTo(x, y);
    }

    return this.position;
  }

  public update(): void {
    if (this.updatable) {
      this.updatable.update();
    }
  }
}
