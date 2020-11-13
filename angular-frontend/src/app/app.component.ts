import { AfterContentChecked, AfterContentInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {AuthService} from './AuthService/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, AfterContentChecked{
  title = 'WorkIt';
  isLoggedIn:boolean = this.authService.isLoggedIn();
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();
  constructor(private authService: AuthService) {
    this.isLoggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
    })
    console.log(authService.isLoggedIn());
  }
  ngAfterContentChecked(): void {
    this.isLoggedInChange.next(this.authService.isLoggedIn());
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  logout(){
    this.authService.logout();
  }
}
