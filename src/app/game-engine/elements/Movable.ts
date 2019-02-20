import {Point} from './util/Point';
import {Entity} from './Entity';

type MoveFunction = (x: number, y: number) => Point;
type MoveToFunction = (x: number, y: number) => Point;
type ForEntityFunction = (entity: Entity) => void;

export interface Movable {
  move: MoveFunction;
  moveTo: MoveToFunction;
  forEntity: ForEntityFunction;
}
