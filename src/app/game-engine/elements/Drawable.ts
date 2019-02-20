import {Entity} from './Entity';

type DrawFunction = (context: CanvasRenderingContext2D) => void;
type ForEntityFunction = (entity: Entity) => void;
type BoundaryFunction = () => number;

export interface Drawable {
  leftBorder: BoundaryFunction;
  rightBorder: BoundaryFunction;
  topBorder: BoundaryFunction;
  bottomBorder: BoundaryFunction;
  draw: DrawFunction;
  forEntity: ForEntityFunction;
}
