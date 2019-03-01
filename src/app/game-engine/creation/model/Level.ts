import {Tile} from './Tile';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export class Level {
  private background: string;
  private foreground: string;

  private backgroundTiles: Tile[][];

  constructor(private http: HttpClient) {
  }

  public init(): Observable<object> {

    return of({});
  }
}
