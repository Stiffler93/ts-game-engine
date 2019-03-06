import {Tile} from './Creation';

export namespace TileFactory {

  export function drawTile(context: CanvasRenderingContext2D, tile: Tile, x: number, y: number): void {
    if (!tile) {
      return;
    }
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
