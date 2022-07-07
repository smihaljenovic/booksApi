import { Component } from '@angular/core';
import {User} from "../auth/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loggedUser: User;

  constructor(private authService: AuthService) {
    const checkLoggedUser = localStorage.getItem('userData')
    if (checkLoggedUser) this.loggedUser = new User(JSON.parse(checkLoggedUser))
  }

  onLogout() {
    this.authService.logout();
  }
}
