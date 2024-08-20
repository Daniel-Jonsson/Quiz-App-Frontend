/**
 * Component for the top navbar, from which the sidebar menu is toggled.
 * @author Daniel Jönsson, Robert Kullman
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css',
})
export class TopNavbarComponent {
  // EventEmitter for toggling the sidebar menu.
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter();
}
