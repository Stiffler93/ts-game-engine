import {Point} from './util/Point';

type MoveFunction = (origin: Point, x: number, y: number) => Point;
type MoveToFunction = (x: number, y: number) => Point;

export interface Movable {
  move: MoveFunction;
  moveTo: MoveToFunction;
}
