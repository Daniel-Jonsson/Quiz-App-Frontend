import { TestBed } from '@angular/core/testing';

import { NewQuestionService } from './new-question.service';

describe('NewQuestionService', () => {
  let service: NewQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
