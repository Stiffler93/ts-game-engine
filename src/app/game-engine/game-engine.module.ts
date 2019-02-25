import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameContainerComponent} from './game-container/game-container.component';

@NgModule({
  declarations: [GameContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GameContainerComponent
  ]
})
export class GameEngineModule { }
