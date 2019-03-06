import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {GameLoopService} from '../controls/game-loop.service';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GameParser} from '../creation/GameParser';
import {GameImpl} from '../creation/model/Creation';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  private CONTAINER: HTMLCanvasElement;
  @Input() autoStart: boolean;
  @Input() gameActive: Observable<boolean>;
  private gameImpl: GameImpl;

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
    this.GAME_LOOP.setCanvas(<HTMLCanvasElement>this.CONTAINER);

    const gameParser: GameParser = new GameParser(this.definitionsFile);
    gameParser.parse(this.http).subscribe((game: GameImpl) => {
      console.log({'Parsed GameImpl': game});
      this.gameImpl = game;

      this.initializeCanvas();
      this.GAME_LOOP.setGameImpl(this.gameImpl);

      if (this.autoStart) {
        this.GAME_LOOP.start();
      }
    });
  }

  ngOnDestroy(): void {
    this.GAME_LOOP.stop();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initializeCanvas(): void {
    this.CONTAINER.width = this.gameImpl.getWidth();
    this.CONTAINER.height = this.gameImpl.getHeight();
  }
}
