import {Entity} from './Entity';

type UpdateFunction = () => void;
type ForEntityFunction = (entity: Entity) => void;

export interface Updatable {
  update: UpdateFunction;
  forEntity: ForEntityFunction;
}
