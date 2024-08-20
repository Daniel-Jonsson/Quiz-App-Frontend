import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFilteringComponent } from './quiz-filtering.component';

describe('QuizFilteringComponent', () => {
  let component: QuizFilteringComponent;
  let fixture: ComponentFixture<QuizFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
