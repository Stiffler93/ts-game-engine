import {Entity} from './Entity';

type DrawFunction = (context: CanvasRenderingContext2D) => void;
type ForEntityFunction = (entity: Entity) => void;

export interface Drawable {
  draw: DrawFunction;
  forEntity: ForEntityFunction;
}
