import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {AuthService} from './AuthService/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  title = 'WorkIt';
  isLoggedIn:boolean = this.authService.isLoggedIn();;
  constructor(private authService: AuthService) {
    console.log(authService.isLoggedIn());
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }



  logout(){
    this.authService.logout();
  }
}
