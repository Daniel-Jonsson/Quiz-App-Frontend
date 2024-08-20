/**
 * Dialog class for editing an existing quiz, i.e. delete or add questions to the quiz.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { NgClass, NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Question } from '../../interfaces/question';
import { Quiz } from '../../interfaces/quiz';
import { BackendService } from '../../services/backend.service';
import { DeleteQuestionService } from '../../services/delete-question.service';
import { AddQuestionDialogComponent } from '../add-question-dialog/add-question-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-quiz-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgClass,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrl: './edit-quiz-dialog.component.css',
})
export class EditQuizDialogComponent {
  quiz: Quiz = {} as Quiz; // the quiz to be edited

  constructor(
    @Inject(MAT_DIALOG_DATA) quizId: string,
    private dialog: MatDialog,
    private backendService: BackendService,
    private deleteQuestionService: DeleteQuestionService,
    private snackbarService: SnackbarService
  ) {
    // fetch the quiz to be edited based on the quiz ID injected to this class upon construction.
    backendService.getQuiz(quizId).subscribe({
      next: (data) => (this.quiz = data),
      error: (err) => console.log(err),
    });
  }

  /**
   * Deletes the Question passed as parameter from the quiz.questions array
   * and from the database via backend.service.
   * @param targetQuestion the Question object to be deleted
   */
  deleteQuestion(targetQuestion: Question): void {
    this.quiz.questions = this.quiz.questions.filter(
      (question) => question !== targetQuestion
    );
    this.backendService.updateQuiz(this.quiz._id, this.quiz).subscribe({
      // add question to array once again if an error is encountered
      error: () => {
        this.quiz.questions.push(targetQuestion);
      },
      complete: () => {
        this.snackbarService.showSuccess('Question was successfully deleted.');
        this.deleteQuestionService.onDeleteQuestion(targetQuestion);
      },
    });
  }

  /**
   * Opens the dialog for adding a new question to a quiz.
   */
  addQuestion(): void {
    this.dialog.open(AddQuestionDialogComponent, {
      data: this.quiz,
      width: '500px',
      maxHeight: '750px',
    });
  }
}
