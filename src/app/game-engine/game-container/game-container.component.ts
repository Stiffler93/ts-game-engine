import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameLoopService} from '../controls/game-loop.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('Container') CONTAINER: ElementRef;
  @Input('autoStart') autoStart: boolean;
  @Input('active') running: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(private GAME_LOOP: GameLoopService) {
  }

  ngOnInit() {
    const subscription: Subscription = this.running.subscribe(active => {
      if (active) {
        this.GAME_LOOP.resume();
      } else {
        this.GAME_LOOP.pause();
      }
    });

    this.subscriptions.push(subscription);
  }

  ngAfterViewInit() {
    if (this.autoStart) {
      this.GAME_LOOP.start();
    }
  }

  ngOnDestroy(): void {
    this.GAME_LOOP.stop();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
