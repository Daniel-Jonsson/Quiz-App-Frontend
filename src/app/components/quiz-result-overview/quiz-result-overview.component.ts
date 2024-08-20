/**
 * Component which allows the user to the an overview of results
 * after playing a quiz.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';
import { Answer } from '../../interfaces/answer';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result-overview',
  standalone: true,
  imports: [NgFor, MatButtonModule],
  templateUrl: './quiz-result-overview.component.html',
  styleUrl: './quiz-result-overview.component.css',
})
export class QuizResultOverviewComponent {
  constructor(private router: Router) {}

  @Input() quiz: Quiz = {} as Quiz;
  @Input() selectedAnswersMap: Map<number, Answer> = new Map();
  @Input() finalScore: number = 0;
  @Input() maxScore: number = 0;

  /**
   * Triggered by clicking the 'back' button, routing the user
   * to the home screen.
   */
  onClick(): void {
    this.router.navigateByUrl('/home');
  }
}
