import {Tile} from './Tile';
import {EntityImpl} from './Entity';

export namespace DrawFactory {

  export function drawTile(context: CanvasRenderingContext2D, tile: Tile, x: number, y: number): void {
    const startX = x * tile.width;
    const startY = y * tile.height;

    context.beginPath();
    context.rect(startX, startY, tile.width, tile.height);
    context.fillStyle = tile.bgColor;
    context.fill();
    context.closePath();

    if (tile.sprite && tile.sprite !== 'none') {
      // draw sprite
    }
  }
}
