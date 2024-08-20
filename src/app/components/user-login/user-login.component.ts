/**
 * Component for the user login view, which allows a user to log in or navigate to the
 * registration page.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  hide: boolean = true;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
  });

  constructor(
    private backendService: BackendService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.backendService.isLoggedInCheck().subscribe({
      next: (loginStatus) => {
        if (loginStatus) {
          router.navigateByUrl('/home');
        }
      },
    });
  }

  /**
   * Used to display an error message if the input username or password
   * is invalid.
   * @param formControl the FormControl tracking the relevant input property
   * @returns a String (empty or containing an error message)
   */
  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    } else if (formControl.hasError('minlength')) {
      return 'At least 4 characters';
    }
    return '';
  }

  /**
   * Checks if the login form is valid and, if so, logs the user in by
   * subscribing to backendService::logIn(), to which username and password
   * are passed as parameters. If the login attempt is successful, the user is
   * navigated to the home page. If unsuccessful, an error-snackbar is displayed.
   */
  submit(): void {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;
      this.backendService.logIn(username, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => this.snackbarService.showError(err.error.message),
      });
    }
  }

  /**
   * Triggered from the 'register' button, this function navigates to the
   * user-register component.
   */
  onRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
