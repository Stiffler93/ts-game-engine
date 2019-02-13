import {Injectable} from '@angular/core';
import {GameSettingsService} from './game-settings.service';
import {interval, Observable, Subscription} from 'rxjs';
import {Error} from 'tslint/lib/error';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {

  private running = false;

  private frame: Observable<number>;
  private renderer: Subscription;
  private CANVAS: HTMLCanvasElement;
  private CONTEXT: CanvasRenderingContext2D;

  constructor(private settings: GameSettingsService) {
    this.frame = interval(1000 / this.settings.fps);
  }

  public setCanvas(canvas: HTMLCanvasElement): void {
    this.CANVAS = canvas;
    this.CONTEXT = canvas.getContext('2d');
  }

  public start(): void {
    if (!this.CONTEXT) {
      throw new Error('You cannot start the Game without specifying on which canvas it should be drawn!');
    }

    console.log('start()');
    this.setupGame();
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
    this.releaseResources();
  }

  private update(): void {
    console.log('update()');
    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
    this.CONTEXT.rect(100, 100, 200, 200);
    this.CONTEXT.strokeStyle = '#ffffff';
    this.CONTEXT.stroke();
  }

  private setupGame(): void {
    console.log('setupGame()');
  }

  private releaseResources(): void {
    console.log('releaseResources()');
  }
}
