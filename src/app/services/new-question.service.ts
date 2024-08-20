/**
 * Service class providing utility functions for adding a question to an existing quiz.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../interfaces/question';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root',
})
export class NewQuestionService {
  private subject: Subject<{ targetQuiz: Quiz; question: Question }> =
    new Subject();
  newQuestion = this.subject.asObservable();

  constructor() {}

  /**
   * Updates the information regarding how many questions a quiz contains by emitting
   * the newly added question via the subject member to its subscribers.
   */
  onNewQuestion(targetQuiz: Quiz, question: Question): void {
    this.subject.next({ targetQuiz, question });
  }
}
