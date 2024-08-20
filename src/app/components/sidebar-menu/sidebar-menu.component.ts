/**
 * Component for the side-bar menu, containing functions for site navigation and login/logout.
 * @author Daniel Jönsson, Robert Kullman
 */

import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, NgIf, RouterModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  isLoggedIn: boolean;
  @Output() onClickEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private backendService: BackendService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.backendService.checkLoginStatus().subscribe({
      next: () => (this.isLoggedIn = true),
      error: () => {
        this.isLoggedIn = false;
        this.initLoginObserver();
      },
    });
  }

  /**
   * Triggered when clicking any link in the sidebar menu, this function
   * in turn triggers the onClickEvent EventEmitter to toggle the menu
   * in parent top-navbar.
   */
  onClick(): void {
    this.onClickEvent.emit();
  }

  /**
   * Triggered when clicking the logout menu option. The function subscribes to the logOut()
   * function in backendService and, if successful, sets the isLoggedIn indicator to false
   * and navigates to the home page.
   */
  onLogout(): void {
    this.backendService.logOut().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.isLoggedIn = false;
      },
      error: () =>
        this.snackbarService.showError('Could not log out, try again later.'),
    });
  }

  /**
   * Subscribes to the isLoggedIn Subject in backend.service to set
   * this.isLoggedIn to the pertinent value.
   */
  initLoginObserver(): void {
    this.backendService.isLoggedInCheck().subscribe({
      next: (loginStatus) => (this.isLoggedIn = loginStatus),
    });
  }
}
