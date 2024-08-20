/**
 * Service class providing utility functions for quiz play functionality.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayQuizService {
  private currentQuestion: number = 1;
  private subject: Subject<number> = new Subject();
  nextQuestion = this.subject.asObservable();

  constructor() {}

  /**
   * Displays the next question in line by incrementing the currentQuestion
   * counter and calling .next on the subject emitter with the new value as
   * parameter. The question overview subscribes to this subject,
   * and thus displays the new question when its number is emitted.
   */
  onNextQuestion(): void {
    this.currentQuestion++;
    this.subject.next(this.currentQuestion);
  }

  /**
   * Resets the currentQuestion counter upon component destruction.
   */
  onComponentDestroyed(): void {
    this.currentQuestion = 1;
  }

  /**
   * Displays the previous question by decrementing the currentQuestion counter and
   * calling .next on the subject emitter with the new value as parameter.
   * The question overview subscribes to this subject,
   * and thus displays the new question when its number is emitted.
   */
  onPrevQuestion(): void {
    this.currentQuestion--;
    this.subject.next(this.currentQuestion);
  }

  /**
   * Displays the question whose index corresponds to the index parameter.
   * By calling the next method on the subject to which the question overview is
   * subscribed, the chosen question is displayed.
   * @param index the index of the question to be displayed.
   */
  onSetCurrentQuestion(index: number): void {
    this.currentQuestion = index;
    this.subject.next(this.currentQuestion);
  }
}
