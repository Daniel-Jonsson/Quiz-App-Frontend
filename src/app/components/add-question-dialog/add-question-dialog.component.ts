/**
 * Dialog component for adding a new question to a quiz.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Question } from '../../interfaces/question';
import { Quiz } from '../../interfaces/quiz';
import { BackendService } from '../../services/backend.service';
import { NewQuestionService } from '../../services/new-question.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-question-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-question-dialog.component.html',
  styleUrl: './add-question-dialog.component.css',
})
export class AddQuestionDialogComponent {
  @Output() saveQuestionEvent: EventEmitter<object> = new EventEmitter();

  quiz: Quiz;

  questionText: string = '';
  answerOne: string = '';
  answerTwo: string = '';
  answerThree: string = '';

  oneCorrect: boolean = false;
  twoCorrect: boolean = false;
  threeCorrect: boolean = false;

  constructor(
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) quiz: Quiz,
    private dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    private backendService: BackendService,
    private newQuestionService: NewQuestionService
  ) {
    this.quiz = quiz;
  }

  /**
   * Checks if the necessary information for saving a question is provided. If so,
   * the information is stored in a Question object, which is (1) pushed to the quiz.questions array
   * of the 'quiz' property, and (2) sent to backend.service::updateQuiz for updating the pertinent
   * quiz in the database.
   * @returns null, if the necessary information is not provided.
   */
  saveQuestion(): void {
    // check if the form is fully filled in
    if (
      this.questionText === '' ||
      this.answerOne === '' ||
      this.answerOne === '' ||
      this.answerOne === ''
    ) {
      this.snackbarService.showError(
        'You must provide a question text and three answers!',
      );
      return;
    }
    // ensure that the right answer is indicated
    if (!this.oneCorrect && !this.twoCorrect && !this.threeCorrect) {
      this.snackbarService.showError(
        'You must indicate which answer is the correct one!',
      );
      return;
    }
    // save info in Question object
    const newQuestion: Question = {
      question_text: this.questionText,
      answers: [
        {
          answer: this.answerOne,
          correct: this.oneCorrect,
        },
        {
          answer: this.answerTwo,
          correct: this.twoCorrect,
        },
        {
          answer: this.answerThree,
          correct: this.threeCorrect,
        },
      ],
    };

    // update quiz.questions array and send update request to backend
    this.quiz.questions.push(newQuestion);
    this.backendService.updateQuiz(this.quiz._id, this.quiz).subscribe({
      error: () => {
        // remove question from array if database update encounters error
        this.quiz.questions = this.quiz.questions.filter(
          (question) => question !== newQuestion
        );
      },
      complete: () => {
        this.snackbarService.showSuccess('Question successfully added!');
        this.newQuestionService.onNewQuestion(this.quiz, newQuestion);
      },
    });

    // close the dialog
    this.dialogRef.close();
  }

  /**
   * Ensures that only one answer can be indicated as the correct one
   * by setting the two-way bound values for the other two boxes to false
   * when checked.
   * @param e click event from checkbox.
   * @returns null.
   */
  oneValueChecked(e: any): void {
    switch (e.target.id) {
      case 'one-correct-input':
        this.twoCorrect = false;
        this.threeCorrect = false;
        break;
      case 'two-correct-input':
        this.oneCorrect = false;
        this.threeCorrect = false;
        break;
      case 'three-correct-input':
        this.oneCorrect = false;
        this.twoCorrect = false;
        break;
    }
  }
}