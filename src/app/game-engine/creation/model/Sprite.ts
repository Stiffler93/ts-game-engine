import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Sprite {
  id: string;
  img: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class SpriteImpl {

  private sprite: ImageBitmap;

  constructor(private settings: Sprite) {
  }

  public init(): Observable<SpriteImpl> {
    const img: HTMLImageElement = new Image();
    img.src = this.settings.img;

    return from(createImageBitmap(img, this.settings.x, this.settings.y, this.settings.width, this.settings.height)).pipe(
      map((bitmap: ImageBitmap) => {
        this.sprite = bitmap;
        return <SpriteImpl>this;
      })
    );
  }

  public getId(): string {
    return this.settings.id;
  }

  public getImage(): ImageBitmap {
    return this.sprite;
  }
}
