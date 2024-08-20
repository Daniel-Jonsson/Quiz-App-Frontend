/**
 * Component for displaying a quiz as a list item. From this component the user can also
 * choose to play the quiz by pressing the play button.
 * @author Daniel Jönsson, Robert Kullman
 */

import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-quizzes-list-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    NgFor,
    RouterLink,
  ],
  templateUrl: './quizzes-list-item.component.html',
  styleUrl: './quizzes-list-item.component.css',
})
export class QuizzesListItemComponent implements OnInit {
  @Input() quiz: Quiz;

  constructor(private router: Router) {}

  /**
   * Overridden from OnInit interface.
   */
  ngOnInit(): void {}

  /**
   * Triggered from a play button of a quiz list item, this function navigates to the
   * play-quiz component, sending the quiz id as a parameter in the URL.
   * @param targetQuiz the quiz to be played.
   */
  onPlay(targetQuiz: Quiz): void {
    this.router.navigate(['/play'], {
      queryParams: { quiz_id: targetQuiz._id },
    });
  }
}
