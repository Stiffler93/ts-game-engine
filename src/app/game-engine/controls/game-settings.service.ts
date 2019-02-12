import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  fps = 30;

  constructor() {
  }
}
