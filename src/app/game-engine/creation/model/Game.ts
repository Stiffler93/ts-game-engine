import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, tap} from 'rxjs/operators';
import {View} from '../../view/View';
import {Entity, EntityImpl} from './Entity';
import {Tile, TileImpl} from './Tile';
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

  private entities: EntityImpl[] = [];
  private levels: LevelImpl[] = [];
  private tiles: TileImpl[] = [];
  private sprites: SpriteImpl[] = [];
  private currentView: View;

  constructor(private settings: Game) {
  }

  public loadResources(http: HttpClient): Observable<GameImpl> {
    return this.loadSprites().pipe(
      flatMap((sprites: SpriteImpl[]) => {
        console.log('assign Sprites');
        sprites.forEach((sprite: SpriteImpl) => this.sprites[sprite.getId()] = sprite);
        return forkJoin(this.loadTiles(http), this.loadEntities(http));
      }),
      flatMap(results => {
        console.log('assign Tiles and Entities');
        results[0].forEach((tile: TileImpl) => this.tiles[tile.getId()] = tile);
        results[1].forEach((entity: EntityImpl) => this.entities[entity.getId()] = entity);
        return this.loadLevels(http);
      }),
      flatMap((levels: LevelImpl[]) => {
        this.levels = levels;
        return of(<GameImpl>this);
      }),
      tap(() => this.initEntryView())
    );
  }

  private loadTiles(http: HttpClient): Observable<TileImpl[]> {
    console.log('loadEntities()');
    return forkJoin(this.settings.tiles.map((value: string) => http.get<Tile>(value))).pipe(
      map((tiles: Tile[]) => tiles.map((tile: Tile) => new TileImpl(tile, <GameImpl>this)))
    );
  }

  private loadEntities(http: HttpClient): Observable<EntityImpl[]> {
    console.log('loadEntities()');
    return forkJoin(this.settings.entities.map((value: string) => http.get<Entity>(value))).pipe(
      map((entities: Entity[]) => entities.map((entity: Entity) => new EntityImpl(entity)))
    );
  }

  private loadLevels(http: HttpClient): Observable<LevelImpl[]> {
    console.log('loadLevels()');
    return forkJoin(this.settings.levels.map((value: string) => http.get<Level>(value))).pipe(
      flatMap((levels: Level[]) => {
        return forkJoin(levels.map((level: Level) => new LevelImpl(level, <GameImpl>this).init(http)));
      })
    );
  }

  private loadSprites(): Observable<SpriteImpl[]> {
    console.log('loadSprites()');
    return combineLatest(this.settings.sprites.map((sprite: Sprite) => new SpriteImpl(sprite).init()));
  }

  private initEntryView(): void {
    console.log('initEntryView()');
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

  public getTile(identifier: string): TileImpl {
    return this.tiles[identifier];
  }

  public getEntity(identifier: string): EntityImpl {
    return this.entities[identifier];
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
