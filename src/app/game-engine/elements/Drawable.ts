import {Point} from './util/Point';

type DrawFunction = (context: CanvasRenderingContext2D, position: Point) => void;

export interface Drawable {
  draw: DrawFunction;
}
