import { Component } from '@angular/core';
import {AuthService} from './AuthService/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WorkIt';
  constructor(authService: AuthService) {
    console.log(authService.isLoggedIn());
  }
}
