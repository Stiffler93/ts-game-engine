import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {GameLoopService} from '../controls/game-loop.service';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {GameBuilder} from '../creation/GameBuilder';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  private CONTAINER: HTMLCanvasElement;
  @Input() autoStart: boolean;
  @Input() gameActive: Observable<boolean>;
  @Input() horizontalPixels: number = 16 * 20;
  @Input() verticalPixels: number = 16 * 14;

  private subscriptions: Subscription[] = [];

  constructor(private GAME_LOOP: GameLoopService, private http: HttpClient,
              @Inject('GameDefinitionsFile') private definitionsFile: string) {
  }

  ngOnInit() {
    const subscription: Subscription = this.gameActive.subscribe(active => {
      if (active) {
        this.GAME_LOOP.resume();
      } else {
        this.GAME_LOOP.pause();
      }
    });

    this.subscriptions.push(subscription);
  }

  ngAfterViewInit() {
    this.CONTAINER = <HTMLCanvasElement> document.getElementById('Container');
    this.CONTAINER.width = this.horizontalPixels;
    this.CONTAINER.height = this.verticalPixels;
    this.GAME_LOOP.setCanvas(<HTMLCanvasElement>this.CONTAINER);

    const gameBuilder: GameBuilder = new GameBuilder(this.http, this.definitionsFile);
    gameBuilder.build();

      if (this.autoStart) {
        this.GAME_LOOP.start();
      }
    }

  ngOnDestroy(): void {
    this.GAME_LOOP.stop();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
