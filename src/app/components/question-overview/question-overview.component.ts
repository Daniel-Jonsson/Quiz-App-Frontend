/**
 * Component for displaying a question overview when playing a quiz, enabling swift navigation
 * between questions.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from '../../interfaces/answer';
import { Question } from '../../interfaces/question';
import { PlayQuizService } from '../../services/play-quiz.service';

@Component({
  selector: 'app-question-overview',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './question-overview.component.html',
  styleUrl: './question-overview.component.css',
})
export class QuestionOverviewComponent {
  @Output() questionClicked: EventEmitter<number> = new EventEmitter();
  @Input() questions: Array<Question>;
  @Input() currentQuestion: number = 1;
  @Input() questionAnswered: Map<number, Answer> = new Map();

  constructor(private playQuizService: PlayQuizService) {
    this.playQuizService.nextQuestion.subscribe((currentQuestion) => {
      this.currentQuestion = currentQuestion;
    });
  }

  /**
   * Used in conjunction with NgClass to determine if a question symbol of the
   * overview section corresponds to the currently displayed question, setting
   * the css-class accordingly.
   * @param index index of the question
   * @returns boolean indicating if the question is the one currently displayed.
   */
  isCurrentQuestion(index: number): boolean {
    return index + 1 === this.currentQuestion;
  }

  /**
   * Used in conjunction with NgClass to determine of the question has been correctly
   * answered to set the css-class accordingly.
   * @param index index of the question
   * @returns boolean indicating if the question was correctly answered, or null if
   *          the question has not yet been answered.
   */
  isCorrectAnswered(index: number): boolean | null {
    const answer = this.questionAnswered.get(index);

    if (answer) {
      return answer.correct;
    }
    return null;
  }
}
