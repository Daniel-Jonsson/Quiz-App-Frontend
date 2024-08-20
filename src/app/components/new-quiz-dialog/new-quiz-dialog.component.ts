/**
 * Dialog component class through which the user can add a new quiz.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuizSubject } from '../../interfaces/quizSubject';
import { User } from '../../interfaces/user';
import { BackendService } from '../../services/backend.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-new-quiz-dialog',
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
  ],
  templateUrl: './new-quiz-dialog.component.html',
  styleUrl: './new-quiz-dialog.component.css',
})
export class NewQuizDialogComponent {
  subjects: QuizSubject[] = [];
  currentUser: User;
  selectedSubject: string;

  // counters for max character input
  maxDescriptionCharacters = 100;
  maxQuizNameCharacters = 35;
  descriptionInput: string;
  quizNameInput: string;
  descriptionCharactersLeft = 100;
  quizNameCharactersLeft = 35;

  constructor(
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<NewQuizDialogComponent>,
    private backendService: BackendService
  ) {
    this.backendService.getSubjects().subscribe({
      next: (subjects) => (this.subjects = subjects),
      error: (err) => console.log(err),
    });
    this.backendService.getCurrentUser().subscribe({
      next: (currentUser) => (this.currentUser = currentUser),
      error: (err) => console.log(err),
    });
  }

  /**
   * Saves a new, empty quiz based on the name, subject and description (optional) provided by
   * the user. The quiz is saved by passing an object containing the quiz information to addNewQuiz()
   * in backend.service, subsequently subscribing to it.
   * @param quizName The name of the new quiz.
   * @param subjectName The subject for the new quiz.
   * @param quizDescription Description of the new quiz.
   * @returns null, if name or subject is not provided.
   */
  saveQuiz(quizName: string, subjectName: string, quizDescription: string): void {
    const newQuizSubjectId: string = this.getSubjectId(subjectName);
    const newQuizData = {
      title: quizName,
      description: quizDescription,
      userName: this.currentUser.userName,
      subject: newQuizSubjectId,
      questions: [],
    };
    if (quizName === '') {
      this.snackbarService.showError('Please provide a name for the quiz!');
      return;
    }
    if (!subjectName) {
      this.snackbarService.showError('Please choose a subject for your quiz!');
      return;
    }

    this.backendService.addNewQuiz(newQuizData).subscribe({
      error: (err) => console.log(err),
      complete: () =>
        this.snackbarService.showSuccess(
          "New quiz created! Click the 'Edit' button to add or delete questions from your quiz."
        ),
    });

    this.dialogRef.close();
  }

  /**
   * Retrieves the _id property of the subject chosen via the select
   * element in the dialog.
   * @param subjectName The name of the subject.
   * @returns _id property of the pertinent subject.
   */
  getSubjectId(subjectName: string): string {
    let id = '';
    this.subjects.forEach(function (subject) {
      if (subject.subjectName === subjectName) {
        id = subject._id;
      }
    });
    return id;
  }

  /**
   * Updates the remaining number of characters usable for the quiz description.
   */
  updateDescriptionCharsLeft(): void {
    this.descriptionCharactersLeft =
      this.maxDescriptionCharacters - this.descriptionInput.length;
  }

  /**
   * Updates the remaining number of characters usable for the quiz name.
   */
  updateQuizNameCharsLeft(): void {
    this.quizNameCharactersLeft =
      this.maxQuizNameCharacters - this.quizNameInput.length;
  }
}
