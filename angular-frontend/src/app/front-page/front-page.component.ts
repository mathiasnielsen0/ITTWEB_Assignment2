import { Component, OnInit } from '@angular/core';
import WorkoutService from '../HttpServices/WorkoutService'

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  workouts = []
  constructor(private _http: WorkoutService) { }

  ngOnInit(): void {
    this._http.getAllWorkouts().subscribe((workouts) => {
      workouts = workouts
    });
  }

}
