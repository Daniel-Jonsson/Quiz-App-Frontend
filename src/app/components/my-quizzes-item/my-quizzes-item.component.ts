/**
 * Component representing a quiz in the my-quizzes view, from which the user may edit or delete
 * the quiz.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Quiz } from '../../interfaces/quiz';
import { DeleteQuestionService } from '../../services/delete-question.service';
import { NewQuestionService } from '../../services/new-question.service';

@Component({
  selector: 'app-my-quizzes-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './my-quizzes-item.component.html',
  styleUrl: './my-quizzes-item.component.css',
})
export class MyQuizzesItemComponent implements OnInit {
  @Input() myQuiz!: Quiz;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() editEvent: EventEmitter<string> = new EventEmitter();
  currentNoQuestions: number = 0;

  constructor(
    private newQuestionService: NewQuestionService,
    private deleteQuestionService: DeleteQuestionService
  ) {
    this.newQuestionService.newQuestion.subscribe({
      next: ({ targetQuiz, question }) => {
        if (this.myQuiz._id === targetQuiz._id) {
          this.myQuiz.questions.push(question);
        }
      },
    });

    this.deleteQuestionService.deleteQuestion.subscribe({
      next: (deletedQuestion) => {
        const index = this.myQuiz.questions.findIndex(
          (question) => question._id === deletedQuestion._id
        );
        if (index !== -1) {
          this.myQuiz.questions.splice(index, 1);
        }
      },
    });
  }

  ngOnInit(): void {
    this.toggleMaxText();
  }

  /**
   * Emits the _id property of a quiz when pressing the 'delete' button.
   * This emission triggers the deleteMyQuiz() function in the my-quizzes
   * component.
   * @param _id _id of the quiz to be deleted
   */
  onClickDelete(_id: string): void {
    this.deleteEvent.emit(_id);
  }

  /**
   * Emits the _id property of a quiz when pressing the 'edit' button.
   * This emission triggers the openEditQuizDialog() function in my-quizzes.
   * @param _id _id of the quiz to be edited
   */
  onClickEdit(_id: string): void {
    this.editEvent.emit(_id);
  }

  /**
   * Concatenates the quiz description if it exceeds 100 characters.
   */
  toggleMaxText(): void {
    if (this.myQuiz.description.length > 100) {
      this.myQuiz.description = `${this.myQuiz.description.slice(0, 97)}...`;
    }
  }
}
