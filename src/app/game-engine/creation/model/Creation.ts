import {combineLatest, from, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';

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

export class GameImpl {
  private numHorizontalTiles: number;
  private numVerticalTiles: number;
  private tileWidth: number;
  private tileHeight: number;

  constructor(private settings: Game) {
    this.numHorizontalTiles = settings.numHorizontalTiles;
    this.numVerticalTiles = settings.numVerticalTiles;
    this.tileWidth = settings.tileWidth;
    this.tileHeight = settings.tileHeight;
  }

  public loadResources(http: HttpClient): Observable<GameImpl> {
    return combineLatest(of(this), this.loadTiles(http), this.loadEntities(), this.loadLevels())
      .pipe(
        map(results => {
          console.log({'Loaded Resources': results});
          return results[0];
        })
      );
  }

  private loadTiles(http: HttpClient): Observable<Tile[]> {
    from(this.settings.tiles)
      .pipe(
        mergeMap((tileS: string) => {
          console.log({'Load Tile': tileS});
          return tileS;
        })
      );
    const tiles: Tile[] = [];
    return of(tiles);
  }

  private loadEntities(): Observable<Entity[]> {
    const entities: Entity[] = [];
    return of(entities);
  }

  private loadLevels(): Observable<Level[]> {
    const levels: Level[] = [];
    return of(levels);
  }
}
