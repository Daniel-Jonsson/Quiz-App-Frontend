import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultOverviewComponent } from './quiz-result-overview.component';

describe('QuizResultOverviewComponent', () => {
  let component: QuizResultOverviewComponent;
  let fixture: ComponentFixture<QuizResultOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResultOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizResultOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
