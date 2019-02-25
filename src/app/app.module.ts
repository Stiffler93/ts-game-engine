import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameEngineModule} from './game-engine/game-engine.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameEngineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
