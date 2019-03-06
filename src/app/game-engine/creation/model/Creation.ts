import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, tap} from 'rxjs/operators';
import {View} from '../../view/View';
import {TileFactory} from './TileFactory';

export interface Entity {
  identifier: string;
  width: number;
  height: number;
  bgColor: string;
  sprite: string;
}

export interface Tile {
  identifier: string;
  width: number;
  height: number;
  bgColor: string;
  sprite: string;
}

export interface Level {
  identifier: string;
  background: string;
  foreground: string;
}

export interface Game {
  numHorizontalTiles: number;
  numVerticalTiles: number;
  tileWidth: number;
  tileHeight: number;
  entities: string[];
  tiles: string[];
  levels: string[];
  entryPoint: string;
}

export class LevelImpl implements View {

  private background: Tile[][] = [];
  private foreground: Tile[][] = [];

  constructor(private settings: Level, private gameImpl: GameImpl) {
  }

  public init(http: HttpClient): Observable<LevelImpl> {
    return forkJoin(this.loadTiles(http, this.settings.background), this.loadTiles(http, this.settings.foreground))
      .pipe(
        flatMap(results => {
          this.background = results[0];
          this.foreground = results[1];
          return of(<LevelImpl>this);
        })
      );
  }

  private loadTiles(http: HttpClient, file: string): Observable<Tile[][]> {
    return http.get(file, {responseType: 'text'}).pipe(
      map((defs: string) => defs.split('\n')),
      map((rows: string[]) => {
        const array: string[][] = [];
        rows.forEach((row, index) => {
          if (row !== '') {
            const arr: string[] = row.split('');
            arr.pop();
            array[index] = arr;
          }
        });
        return array;
      }),
      map((charRows: string[][]) => charRows.map((charRow: string[]) => {
        return charRow.map((identifier: string) => this.gameImpl.getTile(identifier));
      }))
    );
  }

  public getIdentifier(): string {
    return this.settings.identifier;
  }

  public render(context: CanvasRenderingContext2D): void {
    this.background.forEach((row: Tile[], indexY: number) =>
      row.forEach((tile: Tile, indexX: number) => {
        if (tile) {
          TileFactory.drawTile(context, tile, indexX, indexY);
        }
      })
    );
    this.foreground.forEach((row: Tile[], indexY: number) =>
      row.forEach((tile: Tile, indexX: number) => {
        if (tile) {
          TileFactory.drawTile(context, tile, indexX, indexY);
        }
      })
    );
  }
}

export class GameImpl {

  private entities: Entity[] = [];
  private levels: LevelImpl[] = [];
  private tiles: Tile[] = [];
  private currentView: View;

  constructor(private settings: Game) {
  }

  public loadResources(http: HttpClient): Observable<GameImpl> {
    return forkJoin(this.loadTiles(http), this.loadEntities(http), this.loadLevels(http))
      .pipe(
        flatMap(results => {
          this.tiles = results[0];
          this.entities = results[1];
          return forkJoin(results[2].map((level: Level) => new LevelImpl(level, this).init(http)));
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

  private loadLevels(http: HttpClient): Observable<Level[]> {
    return forkJoin(this.settings.levels.map((value: string) => http.get<Level>(value)));
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

  public getTile(identifier: string): Tile {
    const tile: Tile = this.tiles.filter((t: Tile) => t.identifier === identifier)[0];
    return tile;
  }

  public getWidth(): number {
    return this.settings.numHorizontalTiles * this.settings.tileWidth;
  }

  public getHeight(): number {
    return this.settings.numVerticalTiles * this.settings.tileHeight;
  }

  public getCurrentView(): View {
    return this.currentView;
  }
}
