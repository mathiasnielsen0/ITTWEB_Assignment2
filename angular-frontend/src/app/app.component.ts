import { Component } from '@angular/core';
import {AuthService} from './AuthService/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WorkIt';
  isLoggedIn:boolean = false;
  constructor(authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    console.log(authService.isLoggedIn());
  }
}
