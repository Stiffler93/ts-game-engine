import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {GameContainerComponent} from './game-container/game-container.component';

@NgModule({
  declarations: [GameContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    GameContainerComponent
  ]
})
export class GameEngineModule {
  static forRoot(definitionsFile: string): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: 'GameDefinitionsFile',
          useValue: definitionsFile
        }
      ]
    };
  }
}
