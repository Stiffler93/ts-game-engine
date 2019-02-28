import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from './model/Game';

export class GameBuilder {

  constructor(private http: HttpClient, private definitionsFile) {}

  public build(): Observable<boolean> {
    // this.http.get(this.definitionsFile).pipe(
    //   mergeMap((result: any) => {
    //
    //   })
    // ).subscribe(r => true);
    this.http.get(this.definitionsFile).subscribe((result: Game) => console.log({'Game': result}));
    return of(true);
  }
}
