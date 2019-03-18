import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';
import {Game, GameImpl} from './model/Game';

export class GameParser {

  private observable: Observable<GameImpl>;

  constructor(private file: string) {
  }

  public parse(http: HttpClient): Observable<GameImpl> {
    return this.observable ? this.observable : this.observable = http.get(this.file).pipe(
      flatMap((content: Game) => {
        const game: GameImpl = new GameImpl(content);
        console.log({'Game Loaded': game});
        return game.loadResources(http);
      }));
  }
}
