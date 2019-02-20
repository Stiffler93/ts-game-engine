import {Drawable} from './Drawable';
import {Entity} from './Entity';
import {EntityStyle} from './util/EntityStyle';
import {Point} from './util/Point';

type ValidSprite = () => boolean;
type SpriteGetter = () => ImageBitmap;

export interface Sprite {
  isValid: ValidSprite;
  getSprite: SpriteGetter;
}

export class BaseSprite implements Sprite, Drawable {

  private sprite: ImageBitmap;
  private entity: Entity;
  private width;
  private height;

  constructor(imgSource: string, {x = 0, y = 0, width = 16, height = 16}:
    { x: number, y: number, width: number, height: number }, private style?: EntityStyle) {

    this.width = width;
    this.height = height;

    const img: HTMLImageElement = new Image();
    img.src = imgSource;

    createImageBitmap(img, x, y, width, height).then(sprite => this.sprite = sprite);
  }

  public isValid(): boolean {
    return this.sprite !== undefined;
  }

  public getSprite(): ImageBitmap {
    return this.sprite;
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.style) {
      this.style.applyStyles(context);
    }
    const curPos = this.transformCenterToTopLeft(this.entity.getPosition());
    context.drawImage(this.sprite, curPos.x, curPos.y);
    context.fill();
    context.stroke();
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }

  private transformCenterToTopLeft(origin: Point): Point {
    return new Point(origin.x - this.width / 2, origin.y - this.height / 2);
  }

  public bottomBorder(): number {
    return this.entity.getPosition().y + this.height / 2;
  }

  public leftBorder(): number {
    return this.entity.getPosition().x - this.width / 2;
  }

  public rightBorder(): number {
    return this.entity.getPosition().x + this.width / 2;
  }

  public topBorder(): number {
    return this.entity.getPosition().y - this.height / 2;
  }
}

