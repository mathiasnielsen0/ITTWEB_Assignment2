import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import WorkoutService from "../HttpServices/WorkoutService"
import { ExerciseService } from "../HttpServices/ExerciseService"
import { Router } from "@angular/router"
import Workout from "../models/Workout"
import Exercise from "../models/Exercise"


@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrls: ['./addworkout.component.scss']
})
export class AddworkoutComponent implements OnInit {

  name = new FormControl('');
  exercises: Exercise[];
  pickedExercises;

  constructor (private _http: WorkoutService, private _http_exercise: ExerciseService, private router: Router) {}

  ngOnInit(): void {
    this._http_exercise.getExercises().subscribe(r => {this.exercises = r.exercises; console.log(this.exercises)});
  }

  async submitWorkout() {
    let workout = new Workout();
    workout.name = this.name.value as string;

    let res = await this._http.addWorkout(workout);

    this.router.navigateByUrl("/exercise");
  }

  addExercise(e: Exercise){
    alert(e._id);
  }

}
