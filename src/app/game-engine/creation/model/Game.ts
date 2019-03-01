import {Error} from 'tslint/lib/error';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export interface GameStructure {
  numHorizontalTiles: number;
  numVerticalTiles: number;
  tileWidth: number;
  tileHeight: number;
  entitiesFolder: string;
  tilesFolder: string;
  levelsFolder: string;
  menusFolder: string;
  startScreen: string;
}

export class Game {

  private _numHorizontalTiles: number;
  private _numVerticalTiles: number;
  private _tileWidth: number;
  private _tileHeight: number;
  private _entitiesFolder: string;
  private _tilesFolder: string;
  private _levelsFolder: string;
  private _menusFolder: string;
  private _startScreen: string;

  constructor(private http: HttpClient) {
  }

  public init(): Observable<object> {
    if (!this._entitiesFolder) {
      throw new Error('entitiesFolder is not defined in game definitions!');
    }
    if (!this._tilesFolder) {
      throw new Error('tilesFolder is not defined in game definitions!');
    }
    if (!this._levelsFolder) {
      throw new Error('levelsFolder is not defined in game definitions!');
    }

    return of({});
  }

  get width(): number {
    return this._numHorizontalTiles * this._tileWidth;
  }

  get height(): number {
    return this._numVerticalTiles * this._tileHeight;
  }

  get numHorizontalTiles(): number {
    return this._numHorizontalTiles;
  }

  get numVerticalTiles(): number {
    return this._numVerticalTiles;
  }

  get tileWidth(): number {
    return this._tileWidth;
  }

  get tileHeight(): number {
    return this._tileHeight;
  }

  get startScreen(): string {
    return this._startScreen;
  }
}
