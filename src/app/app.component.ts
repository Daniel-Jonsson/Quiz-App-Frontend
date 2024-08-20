/**
 * Starting point for the frontend of the quiz app.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import {MatSidenavModule} from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopNavbarComponent,
    MatSidenavModule,
    SidebarMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quizziz';
}
