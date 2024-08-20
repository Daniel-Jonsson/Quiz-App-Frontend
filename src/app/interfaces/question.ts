/**
 * Interface for Question object.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Answer } from './answer';

export interface Question {
  _id?: string;
  question_text: string;
  answers: Answer[];
}
