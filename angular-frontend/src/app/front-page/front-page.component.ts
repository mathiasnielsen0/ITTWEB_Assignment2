import { Component, OnInit } from '@angular/core';
import WorkoutService from '../HttpServices/WorkoutService'
import Workout from '../models/Workout'

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  workouts:Workout[] = []
  constructor(private _http: WorkoutService) { }

  ngOnInit(): void {
    this._http.getAllWorkouts().subscribe(r => this.workouts = r.workouts);
  }

}
