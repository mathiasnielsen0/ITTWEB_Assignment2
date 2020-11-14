import { Component, Injectable, OnInit } from '@angular/core';
import WorkoutService from '../HttpServices/WorkoutService'
import Workout from '../models/Workout'
import {AuthService} from '../AuthService/AuthService'

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
@Injectable()
export class FrontPageComponent implements OnInit {
  workouts:Workout[] = []
  isLoggedIn:boolean = false;
  panelOpenState = false;
  constructor(private _http: WorkoutService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._http.getAllWorkouts().subscribe(r => this.workouts = r.workouts);
    document.getElementById('search').addEventListener('keyup',(e) => {this.filter(e)});
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  private filter(e:any){
    var workouts = document.getElementsByClassName("workout");
    let searchText = (document.getElementById('search') as HTMLInputElement).value
    for (let i = 0; i < workouts.length; i++) {
      const element = workouts[i];
      if (this.workouts[i].name.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
        (element as HTMLButtonElement).style.display = "";
      } else {
        (element as HTMLButtonElement).style.display = "none";
      }
    }
  }
}