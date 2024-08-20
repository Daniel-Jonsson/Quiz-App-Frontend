import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuizDialogComponent } from './new-quiz-dialog.component';

describe('NewQuizDialogComponent', () => {
  let component: NewQuizDialogComponent;
  let fixture: ComponentFixture<NewQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQuizDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
