import {View} from '../../view/View';
import {Tile} from './Tile';
import {Entity, EntityImpl} from './Entity';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Point} from '../../elements/util/Point';
import {DrawFactory} from './DrawFactory';
import {GameImpl} from './Game';

export interface Level {
  identifier: string;
  background: string;
  foreground: string;
}

export class LevelImpl implements View {

  private background: Tile[][] = [];
  private foreground: Tile[][] = [];
  private entities: EntityImpl[] = [];

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
      map((charRows: string[][]) => charRows.map((charRow: string[], Y: number) => {
        return charRow.map((identifier: string, X: number) => {
          if (identifier === '#') {
            return undefined;
          }
          const tile: Tile = this.gameImpl.getTile(identifier);
          if (!tile) {
            const entity: Entity = this.gameImpl.getEntity(identifier);
            if (entity) {
              const tileWidth = this.gameImpl.getTileWidth();
              const tileHeight = this.gameImpl.getTileHeight();
              this.entities.push(new EntityImpl(entity, new Point(X * tileWidth, Y * tileHeight)));
            }
          }

          return tile;
        });
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
          DrawFactory.drawTile(context, tile, indexX, indexY);
        }
      })
    );
    this.foreground.forEach((row: Tile[], indexY: number) =>
      row.forEach((tile: Tile, indexX: number) => {
        if (tile) {
          DrawFactory.drawTile(context, tile, indexX, indexY);
        }
      })
    );
    this.entities.forEach((entity: EntityImpl) => entity.draw(context));
  }
}
