/**
 * Service class for showing error messages in a snackbar.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {}

  /**
   * Opens a snackbar displaying the message specified in the message parameter.
   * @param message the error message to be displayed.
   */
  showError(message: string): void {
    this._snackbar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
  showSuccess(message: string): void {
    this._snackbar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
