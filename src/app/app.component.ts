import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-engine';

  public gameActive: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public play(): void {
    this.gameActive.next(true);
  }

  public pause(): void {
    this.gameActive.next(false);
  }
}
