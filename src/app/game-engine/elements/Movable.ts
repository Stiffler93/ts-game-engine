import {Point} from './util/Point';
import {Entity} from './Entity';
import {GameGrid} from './util/GameGrid';

type MoveFunction = (x: number, y: number) => Point;
type MoveToFunction = (x: number, y: number) => Point;
type ForEntityFunction = (entity: Entity) => void;
type ForGameGridFunction = (gameGrid: GameGrid) => void;
type GetGameGridFunction = () => GameGrid;

export interface Movable {
  move: MoveFunction;
  moveTo: MoveToFunction;
  forEntity: ForEntityFunction;
  forGameGrid: ForGameGridFunction;
}
