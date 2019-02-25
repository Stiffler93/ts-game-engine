import {TestBed} from '@angular/core/testing';

import {GameEntitiesService} from './game-entities.service';

describe('GameEntitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameEntitiesService = TestBed.get(GameEntitiesService);
    expect(service).toBeTruthy();
  });
});
