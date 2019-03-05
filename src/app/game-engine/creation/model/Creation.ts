import {combineLatest, forkJoin, from, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, mergeMap, tap} from 'rxjs/operators';

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
}

export class LevelImpl {

  private background: Tile[][] = [];
  private foreground: Tile[][] = [];

  constructor(private settings: Level) {
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

  public loadTiles(http: HttpClient, file: string): Observable<Tile[][]> {
    // http.get(file, {responseType: 'text'}).pipe(
    //   map((defs: string) => defs.split('\n')),
    //   map((rows: string[]) => {
    //     rows.forEach(row => row.split(''));
    //     return rows;
    //   }),
    //   map()
    // )
    return of<Tile[][]>([]);
  }

}

export class GameImpl {

  private entities: Entity[] = [];
  private levels: Level[] = [];
  private tiles: Tile[] = [];

  constructor(private settings: Game) {
  }

  public loadResources(http: HttpClient): Observable<GameImpl> {
    return forkJoin(this.loadTiles(http), this.loadEntities(http), this.loadLevels(http))
      .pipe(
        flatMap(results => {
          this.tiles = results[0];
          this.entities = results[1];
          this.levels = results[2];
          return of(<GameImpl>this);
        })
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
}
