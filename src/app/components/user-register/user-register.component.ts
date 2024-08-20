/**
 * Component for user registration.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { BackendService } from '../../services/backend.service';
import { SnackbarService } from '../../services/snackbar.service';

/**
 * Custom validator for checking if password match.
 */
export function matchPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mismatchedPasswords: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  constructor(
    private backendService: BackendService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  hide: boolean = true;
  hideConfirm: boolean = true;
  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  form: FormGroup = new FormGroup(
    {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    { validators: matchPasswordValidator('password', 'confirmPassword') }
  );

  /**
   * Validates the registration form and, if valid, stores the new user in the database
   * via backendService.register which is subscribed to. If the registration is successful,
   * navigates to the login page. If unsuccessful, an error snackbar is displayed.
   */
  submit(): void {
    if (this.form.valid) {
      const firstname = this.form.value.firstname;
      const lastname = this.form.value.lastname;
      const username = this.form.value.username;
      const password = this.form.value.password;
      const newUser: User = {
        firstName: firstname,
        lastName: lastname,
        password: password,
        userName: username,
        isAdmin: false,
      };
      this.backendService.register(newUser).subscribe({
        next: () => this.router.navigateByUrl('/login'),
        error: (err) => this.snackbarService.showError(err.error.message),
      });
    }
  }

  /**
   * Used to check the input field of the user-register component for errors, returning
   * an error message pertinent to the error.
   * @param formControl The FormControl object tracking the relevant input field.
   * @returns a string containing the error message.
   */
  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    } else if (formControl.hasError('minlength')) {
      return 'At least 4 characters';
    } else if (formControl.hasError('mismatchedPasswords')) {
      return 'Password is not the same.';
    }
    return '';
  }
}
