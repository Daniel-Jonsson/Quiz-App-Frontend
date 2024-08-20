/**
 * Interface for Quiz object.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Question } from './question';
import { QuizSubject } from './quizSubject';

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  userName: string;
  subject: QuizSubject;
  questions: Question[];
}
