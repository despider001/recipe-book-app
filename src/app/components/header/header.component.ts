import { AuthService } from './../../services/auth.sevice';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
