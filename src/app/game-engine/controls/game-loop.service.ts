import {Injectable} from '@angular/core';
import {GameSettingsService} from './game-settings.service';
import {interval, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {

  private running = false;

  private frame: Observable<number>;
  private renderer: Subscription;

  constructor(private settings: GameSettingsService) {
    this.frame = interval(1000 / this.settings.fps);
  }

  public start(): void {
    console.log('start()');
    this.setupGame();
    this.resume();
  }

  public resume(): void {
    if (this.running)
      return;

    console.log('resume()');
    this.renderer = this.frame.subscribe(() => this.update());
    this.running = true;
  }

  public pause(): void {
    if (!this.running)
      return;

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
  }

  private setupGame(): void {
    console.log('setupGame()');
  }

  private releaseResources(): void {
    console.log('releaseResources()');
  }
}
