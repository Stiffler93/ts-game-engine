import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GameLoopService} from '../controls/game-loop.service';
import {Observable, Subscription} from 'rxjs';

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

  constructor(private GAME_LOOP: GameLoopService) {
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

    if (this.autoStart) {
      this.GAME_LOOP.start();
    }
  }

  ngOnDestroy(): void {
    this.GAME_LOOP.stop();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
