/**
 * Component allowing the user to filter quizes based on search string or subject.
 * @author Daniel Jönsson, Robert Kullman
 * @version 1.0
 */

import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuizSubject } from '../../interfaces/quizSubject';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-quiz-filtering',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatChipsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './quiz-filtering.component.html',
  styleUrl: './quiz-filtering.component.css',
})
export class QuizFilteringComponent {
  @Output() searchString: EventEmitter<string> = new EventEmitter();
  searchText: string = '';
  subjects: QuizSubject[] = [];
  @Output() selectedChips: EventEmitter<string[]> = new EventEmitter();

  constructor(private backendService: BackendService) {
    this.backendService.getSubjects().subscribe({
      next: (subjects) => (this.subjects = subjects),
    });
  }

  /**
   * Triggered when a change occurs in the listbox element, emitting
   * the current value through the selectedChips EventEmitter.
   * @param test the change event.
   */
  onChange(change: any): void {
    this.selectedChips.emit(change.value);
  }
}
