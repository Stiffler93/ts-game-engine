import {Drawable} from './Drawable';
import {Point} from './util/Point';

type ValidSprite = () => boolean;
type SpriteGetter = () => ImageBitmap;

export interface Sprite {
  readonly sprite: ImageBitmap;
  isValid: ValidSprite;
  getSprite: SpriteGetter;
}

export class BaseSprite implements Sprite, Drawable {

  sprite: ImageBitmap;

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

  public draw(context: CanvasRenderingContext2D, position: Point) {
    context.drawImage(this.sprite, position.x, position.y);
  }
}

