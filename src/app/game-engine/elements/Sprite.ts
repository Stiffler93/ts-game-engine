import {Drawable} from './Drawable';
import {Point} from './util/Point';
import {Entity} from './Entity';

type ValidSprite = () => boolean;
type SpriteGetter = () => ImageBitmap;

export interface Sprite {
  isValid: ValidSprite;
  getSprite: SpriteGetter;
}

export class BaseSprite implements Sprite, Drawable {

  private sprite: ImageBitmap;
  private entity: Entity;

  constructor(private imgSource: string, {x = 0, y = 0, width = 16, height = 16}:
    { x: number, y: number, width: number, height: number }) {

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
    context.drawImage(this.sprite, this.entity.getPosition().x, this.entity.getPosition().y);
  }

  public forEntity(entity: Entity): void {
    this.entity = entity;
  }
}

