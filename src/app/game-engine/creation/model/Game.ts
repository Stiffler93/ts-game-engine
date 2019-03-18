import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, tap} from 'rxjs/operators';
import {View} from '../../view/View';
import {Entity} from './Entity';
import {Tile} from './Tile';
import {Level, LevelImpl} from './Level';
import {Sprite, SpriteImpl} from './Sprite';

export interface Game {
  numHorizontalTiles: number;
  numVerticalTiles: number;
  tileWidth: number;
  tileHeight: number;
  entities: string[];
  sprites: Sprite[];
  tiles: string[];
  levels: string[];
  entryPoint: string;
}

export class GameImpl {

  private entities: Entity[] = [];
  private levels: LevelImpl[] = [];
  private tiles: Tile[] = [];
  private sprites: SpriteImpl[] = [];
  private currentView: View;

  constructor(private settings: Game) {
  }

  public loadResources(http: HttpClient): Observable<GameImpl> {
    return this.loadSprites(http).pipe(
      flatMap((sprites: SpriteImpl[]) => {
        sprites.forEach((sprite: SpriteImpl) => this.sprites[sprite.getId()] = sprite);
        return forkJoin(this.loadTiles(http), this.loadEntities(http));
      }),
      flatMap(results => {
        this.tiles = results[0];
        this.entities = results[1];
        return this.loadLevels(http);
      }),
      flatMap((levels: LevelImpl[]) => {
        this.levels = levels;
        return of(<GameImpl>this);
      }),
      tap(() => this.initEntryView())
    );
  }

  private loadTiles(http: HttpClient): Observable<Tile[]> {
    return forkJoin(this.settings.tiles.map((value: string) => http.get<Tile>(value)));
  }

  private loadEntities(http: HttpClient): Observable<Entity[]> {
    return forkJoin(this.settings.entities.map((value: string) => http.get<Entity>(value)));
  }

  private loadLevels(http: HttpClient): Observable<LevelImpl[]> {
    return forkJoin(this.settings.levels.map((value: string) => http.get<Level>(value))).pipe(
      flatMap((levels: Level[]) => {
        return forkJoin(levels.map((level: Level) => new LevelImpl(level, <GameImpl>this).init(http)));
      })
    );
  }

  private loadSprites(http: HttpClient): Observable<SpriteImpl[]> {
    return forkJoin(this.settings.sprites.map((sprite: Sprite) => new SpriteImpl(sprite).init()));
  }

  private initEntryView(): void {
    const entryPoint: string = this.settings.entryPoint;
    if (entryPoint.indexOf('LEVEL') === 0) {
      const indexOfColon = entryPoint.indexOf(':');
      const length = entryPoint.length;
      const identifier: string = entryPoint.substr(indexOfColon + 1, length);

      const view: View = this.levels.filter((level: LevelImpl) => level.getIdentifier() === identifier)[0];
      if (!view) {
        throw new Error('Level with identifier (' + identifier + ') not found!');
      }
      this.currentView = view;
    } else {
      throw new Error('EntryPoint option unknown!');
    }
  }

  public getSprite(identifier: string): SpriteImpl {
    return this.sprites[identifier];
  }

  public getTile(identifier: string): Tile {
    const tile: Tile = this.tiles.filter((t: Tile) => t.identifier === identifier)[0];
    return tile;
  }

  public getEntity(identifier: string): Entity {
    const entity: Entity = this.entities.filter((e: Entity) => e.identifier === identifier)[0];
    return entity;
  }

  public getWidth(): number {
    return this.settings.numHorizontalTiles * this.settings.tileWidth;
  }

  public getHeight(): number {
    return this.settings.numVerticalTiles * this.settings.tileHeight;
  }

  public getTileWidth(): number {
    return this.settings.tileWidth;
  }

  public getTileHeight(): number {
    return this.settings.tileHeight;
  }

  public getCurrentView(): View {
    return this.currentView;
  }
}
