import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesListItemComponent } from './quizzes-list-item.component';

describe('QuizzesListItemComponent', () => {
  let component: QuizzesListItemComponent;
  let fixture: ComponentFixture<QuizzesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizzesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
