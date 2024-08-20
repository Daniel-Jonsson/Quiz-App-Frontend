/**
 * Class used for showing the quizzes created by a specific user, when that user
 * is logged in.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Quiz } from '../../interfaces/quiz';
import { BackendService } from '../../services/backend.service';
import { NewQuizService } from '../../services/new-quiz.service';
import { EditQuizDialogComponent } from '../edit-quiz-dialog/edit-quiz-dialog.component';
import { MyQuizzesItemComponent } from '../my-quizzes-item/my-quizzes-item.component';
import { NewQuizDialogComponent } from '../new-quiz-dialog/new-quiz-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-my-quizzes',
  standalone: true,
  templateUrl: './my-quizzes.component.html',
  styleUrl: './my-quizzes.component.css',
  imports: [
    MyQuizzesItemComponent,
    MatListModule,
    MatCardModule,
    NgForOf,
    MatButtonModule,
    MatDialogModule,
    NewQuizDialogComponent,
    MatProgressSpinnerModule,
    NgIf,
  ],
})
export class MyQuizzesComponent {
  myQuizzes: Quiz[] = [];
  loading: boolean = true;

  constructor(
    private snackbarService: SnackbarService,
    private backendService: BackendService,
    private dialog: MatDialog,
    private newQuizService: NewQuizService,
    private router: Router
  ) {
    this.backendService.getMyQuizzes().subscribe({
      next: (quizzes) => {
        this.myQuizzes = quizzes;
        this.initNewQuizObserver();
        this.loading = false;
      },
      error: () => router.navigateByUrl('/login'),
    });
  }

  /**
   * Deletes the specified quiz from the database and updates
   * the myQuizzes array accordingly.
   * @param _id Object Id of the quiz to be deleted
   */
  deleteMyQuiz(_id: string): void {
    this.backendService.deleteMyQuiz(_id).subscribe({
      next: () => {
        this.myQuizzes = this.myQuizzes.filter((q) => q._id !== _id);
      },
      error: (err) => this.snackbarService.showError(err),
      complete: () =>
        this.snackbarService.showSuccess(`Quiz was successfully deleted.`),
    });
  }

  /**
   * Opens the dialog for creating a new quiz.
   */
  openCreateQuizDialog(): void {
    this.dialog.open(NewQuizDialogComponent, {
      width: '300px',
    });
  }

  /**
   * Opens the dialog for editing an existing quiz. The event
   * parameter provides the id of the quiz to be edited, which is
   * injected into the dialog when it is opened.
   * @param event event providing the ID of the clicked quiz.
   */
  openEditQuizDialog(event: any): void {
    const clickedQuizId = event;

    this.dialog.open(EditQuizDialogComponent, {
      data: clickedQuizId,
      width: '500px',
      maxHeight: '600px',
    });
  }

  /**
   * Subscribes to newQuizService.quizAdded to update the myQuizzes array
   * when a new quiz is added (and emitted by the newQuizAdded Subject).
   */
  initNewQuizObserver(): void {
    this.newQuizService.quizAdded.subscribe((newQuiz) => {
      this.myQuizzes.push(newQuiz);
    });
  }
}
