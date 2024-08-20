/**
 * The {@link PlayQuizComponent} is used to display the UI of a quiz currently being played.
 * It uses {@linkcode ActivatedRoute::queryParams} to get hold of
 * the quiz to be displayed. The component contains functionality to navigate between questions,
 * answering and getting feedback on answer, and also a quick navigation component that can be
 * used to swiftly navigate between questions and get a good overview of the questions.
 *
 * @author Daniel Jönsson, Robert Kullman
 * @see QuestionOverviewComponent
 * @version 1.0
 */

import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Answer } from '../../interfaces/answer';
import { Question } from '../../interfaces/question';
import { Quiz } from '../../interfaces/quiz';
import { BackendService } from '../../services/backend.service';
import { PlayQuizService } from '../../services/play-quiz.service';
import { SnackbarService } from '../../services/snackbar.service';
import { QuestionOverviewComponent } from '../question-overview/question-overview.component';
import { QuizResultOverviewComponent } from '../quiz-result-overview/quiz-result-overview.component';

@Component({
  selector: 'app-play-quiz',
  standalone: true,
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.css',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    NgForOf,
    NgFor,
    RouterLink,
    QuestionOverviewComponent,
    QuizResultOverviewComponent,
    NgClass,
    NgIf,
    MatProgressSpinnerModule,
  ],
})
export class PlayQuizComponent {
  quiz: Quiz;

  results: Array<boolean> = [];

  questions: Array<Question> = [];
  currentQuestionNo: number = 0;
  maxScore: number = 0;
  currentScore: number = 0;
  selectedAnswersMap: Map<number, Answer> = new Map();
  answered: Map<number, boolean> = new Map();
  showResults: boolean = false;

  constructor(
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private backendService: BackendService,
    private playQuizService: PlayQuizService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.backendService.getQuiz(param['quiz_id']).subscribe({
        next: (quiz) => {
          this.quiz = quiz;
          this.questions = quiz.questions;
          this.maxScore = this.quiz.questions.length * 10;
        },
        error: (err) => snackbarService.showError(err.error.message),
      });
    });
  }

  /**
   * Triggered from the 'Next' button. Unless the current question is the last one,
   * this function increases the currentQuestionNo member and displays the next
   * question by triggering the onNextQuestion() function in playQuiz.service. If no questions
   * are left, this function simply sets the showResults member to true.
   */
  nextQuestion(): void {
    if (this.currentQuestionNo < this.quiz.questions.length - 1) {
      this.currentQuestionNo += 1;
      this.playQuizService.onNextQuestion();
    } else {
      this.showResults = true;
    }
  }

  /**
   * Calls playQuizService::onComponentDestroyed() when component is destroyed.
   */
  ngOnDestroy(): void {
    this.playQuizService.onComponentDestroyed();
  }

  /**
   * Triggered by event emitter in question-overview component to navigate
   * to the question corresponding to the clicked question number. Utilizes
   * playQuizService::onSetCurrentQuestion() to set the question to display.
   * @param index the index of the question to navigate to.
   */
  goToQuestion(index: number): void {
    this.currentQuestionNo = index;
    this.playQuizService.onSetCurrentQuestion(this.currentQuestionNo + 1);
  }

  /**
   * Displays, if possible, the previous question by utilizing while also
   * utilizing the playQuizService::onPrevQuestion() to update the overview
   * accordingly.
   */
  prevQuestion(): void {
    if (this.currentQuestionNo > 0) {
      this.currentQuestionNo -= 1;
      this.playQuizService.onPrevQuestion();
    }
  }

  /**
   * Triggered when an answer alternative is clicked. If the question has not already been
   * answered, the boolean corresponding to the clicked question number is set to true.
   * Furthermore, if the answer is correct, the currentScore member is updatet.
   * @param answer the Answer object of the answer chosen by the player.
   */
  onAlternativeSelected(answer: Answer): void {
    if (!this.answered.get(this.currentQuestionNo)) {
      this.answered.set(this.currentQuestionNo, true);
      this.selectedAnswersMap.set(this.currentQuestionNo, answer);
      if (answer.correct) {
        this.currentScore += 10;
      }
    }
  }

  /**
   * The {@code isCorrectAnswered()} checks if a given answer is correct or not. It is
   * used to give elements classes with the use of {@link NgClass}.
   * @returns a boolean value of true or falls if answer exists else null.
   */

  isCorrectAnswered(): boolean | null {
    const answer = this.selectedAnswersMap.get(this.currentQuestionNo);
    if (answer) {
      return answer.correct;
    }
    return null;
  }
}
