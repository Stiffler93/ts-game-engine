import {GameImpl} from './Game';

export interface Tile {
  identifier: string;
  width: number;
  height: number;
  bgColor: string;
  sprite: string;
}

export class TileImpl {

  private sprite: ImageBitmap;

  constructor(private settings: Tile, private gameImpl: GameImpl) {
    this.sprite = this.gameImpl.getSprite(settings.sprite).getImage();
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number): void {
    const startX = x * this.settings.width;
    const startY = y * this.settings.height;

    context.beginPath();
    context.rect(startX, startY, this.settings.width, this.settings.height);
    context.fillStyle = this.settings.bgColor;
    context.fill();

    if (this.sprite) {
      // draw sprite
      context.drawImage(this.sprite, startX, startY);
    }

    context.closePath();
  }
}
