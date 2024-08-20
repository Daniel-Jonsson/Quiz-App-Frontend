/**
 * Component for displaying all available quizzes.
 * @author Daniel Jönsson, Robert Kullman
 */

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Quiz } from '../../interfaces/quiz';
import { BackendService } from '../../services/backend.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { QuizFilteringComponent } from '../quiz-filtering/quiz-filtering.component';
import { QuizzesListItemComponent } from '../quizzes-list-item/quizzes-list-item.component';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    QuizzesListItemComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    QuizFilteringComponent,
    MatProgressSpinnerModule,
    AppFooterComponent,
  ],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css',
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];
  searchString: string = '';
  selectedChips: string[] = [];

  constructor(
    private backendService: BackendService,
    private snackbarService: SnackbarService
  ) {}

  /**
   * Overridden from OnInit interface to get all available quizzes from the database, or
   * all quizzes matching the search string, if entered.
   */
  ngOnInit(): void {
    this.backendService.getQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
      },
      error: (err) => this.snackbarService.showError(err.error.message),
    });
  }

  get filteredQuizzes(): Quiz[] {
    return this.quizzes.filter((quiz) => {
      const titleMatchesSearch = quiz.title
        .toLowerCase()
        .includes(this.searchString.toLowerCase());

      const subjectMatchesChips =
        this.selectedChips.length === 0 ||
        this.selectedChips.includes(quiz.subject.subjectName);

      return titleMatchesSearch && subjectMatchesChips;
    });
  }
}
