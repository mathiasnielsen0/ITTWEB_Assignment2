import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExerciseService } from "../HttpServices/ExerciseService"
import { Router } from "@angular/router"
import Exercise from "../models/Exercise"

@Component({
  selector: 'app-addexercise',
  templateUrl: './addexercise.component.html',
  styleUrls: ['./addexercise.component.scss']
})
export class AddexerciseComponent implements OnInit {
  name = new FormControl('');
  description = new FormControl('');
  repetitions = new FormControl('');
  sets = new FormControl('');

  constructor (private _http: ExerciseService, private router: Router) {}

  ngOnInit(): void {
  }

  async submitExercise() {
    let exercise = new Exercise();
    exercise.name = this.name.value as string;
    exercise.description = this.description.value as string;
    exercise.repetitions = this.repetitions.value as Number;
    exercise.sets = this.sets.value as Number;

    console.log("adding exercise", exercise)
    let res = await this._http.addExercise(exercise);

    this.router.navigateByUrl("/exercise");
  }
}


