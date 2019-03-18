import {Injectable} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {Error} from 'tslint/lib/error';
import {GameEntitiesService} from './game-entities.service';
import {GameImpl} from '../creation/model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {

  private running = false;

  private frame: Observable<number>;
  private renderer: Subscription;
  private CANVAS: HTMLCanvasElement;
  private CONTEXT: CanvasRenderingContext2D;
  private GAME: GameImpl;

  constructor(private entities: GameEntitiesService) {
    this.frame = interval(1000 / 30);
  }

  public setCanvas(canvas: HTMLCanvasElement): void {
    this.CANVAS = canvas;
    this.CONTEXT = canvas.getContext('2d');
  }

  public setGameImpl(gameImpl: GameImpl): void {
    this.GAME = gameImpl;
  }

  public start(): void {
    if (!this.CONTEXT) {
      throw new Error('You cannot start the Game without specifying on which canvas it should be drawn!');
    }

    console.log('start()');
    this.resume();
  }

  public resume(): void {
    if (this.running) {
      return;
    }

    console.log('resume()');
    this.renderer = this.frame.subscribe(() => window.requestAnimationFrame(() => this.update()));
    this.running = true;
  }

  public pause(): void {
    if (!this.running) {
      return;
    }

    console.log('pause()');
    if (this.renderer) {
      this.renderer.unsubscribe();
    }
    this.running = false;
  }

  public stop(): void {
    console.log('stop()');
    this.pause();
  }

  private update(): void {
    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);

    this.CONTEXT.beginPath();

    if (this.GAME) {
      this.GAME.getCurrentView().render(this.CONTEXT);
    }

    this.CONTEXT.closePath();
  }
}
