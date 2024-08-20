/**
 * Component for displaying a users profile.
 * @author Daniel Jönsson, Robert Kullman
 */

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Quiz } from '../../interfaces/quiz';
import { User } from '../../interfaces/user';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  currentUser: User;
  userQuizzes: Quiz[] = [];
  loading: boolean = true;
  constructor(private backendService: BackendService, private router: Router) {
    this.backendService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getUserQuizzes();
      },
      error: () => this.router.navigateByUrl('/login'),
    });
  }

  /**
   * Retrieves all quizzes created by the logged in user via
   * backend.service.
   */
  getUserQuizzes(): void {
    this.backendService.getMyQuizzes().subscribe({
      next: (quizzes) => {
        this.userQuizzes = quizzes;
        this.loading = false;
      },
    });
  }
}
