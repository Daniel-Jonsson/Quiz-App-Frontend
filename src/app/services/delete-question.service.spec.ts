import { TestBed } from '@angular/core/testing';

import { DeleteQuestionService } from './delete-question.service';

describe('DeleteQuestionService', () => {
  let service: DeleteQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
