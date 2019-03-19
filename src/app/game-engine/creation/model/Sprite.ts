import {from, Observable, of, Subject} from 'rxjs';
import {catchError, flatMap, map, sample, tap} from 'rxjs/operators';

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
    const wait: Subject<boolean> = new Subject();
    const img = new Image();
    img.onload = () => wait.next(true);

    return of(img).pipe(
      tap(() => img.src = this.settings.img),
      sample(wait),
      flatMap(image => from(createImageBitmap(image, this.settings.x, this.settings.y, this.settings.width, this.settings.height))),
      map((bitmap: ImageBitmap) => {
        console.log('Sprite loaded');
        this.sprite = bitmap;
        return <SpriteImpl>this;
      }),
      catchError(error => {
        console.log({'Error on loading Sprite': error});
        return of(<SpriteImpl>this);
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
