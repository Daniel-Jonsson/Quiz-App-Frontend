/**
 * Service class providing utility functions for deleting a question from an existing quiz.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class DeleteQuestionService {
  private subject: Subject<Question> = new Subject();
  deleteQuestion = this.subject.asObservable();

  constructor() {}

  /**
   * Updates the information regarding how many questions a quiz contains by emitting
   * the newly deleted question via the subject member to its subscribers.
   */
  onDeleteQuestion(question: Question): void {
    this.subject.next(question);
  }
}
