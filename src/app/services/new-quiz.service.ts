/**
 * Service class for adding new quizzes.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root',
})
export class NewQuizService {
  /**
   * Subject from which subscribers can be updated regarding
   * newly added quizzes.
   */
  private newQuizAdded = new Subject<Quiz>();

  /**
   * Create observable with newQuizAdded as source.
   */
  quizAdded = this.newQuizAdded.asObservable();

  /**
   * Emits a new quiz through the newQuizAdded Subject,
   * thereby pushing it to subscribers.
   * @param quiz The quiz object to be emitted.
   */
  addQuiz(quiz: Quiz): void {
    this.newQuizAdded.next(quiz);
  }
}
