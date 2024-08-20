import { TestBed } from '@angular/core/testing';

import { PlayQuizService } from './play-quiz.service';

describe('PlayQuizService', () => {
  let service: PlayQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
