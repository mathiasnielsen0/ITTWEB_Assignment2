import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExerciseService } from "../HttpServices/ExerciseService"
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

  constructor (private _http: ExerciseService) {}

  ngOnInit(): void {
  }

  async submitExercise() {
    // Process checkout data here
    // this.exerciseForm.reset();
    
    console.log('exercise has been submitted', this.name.value, this.description.value, this.repetitions.value, this.sets.value);

    let exercise = new Exercise();
    exercise.name = this.name.value as string;
    exercise.description = this.description.value as string;
    exercise.repetitions = this.repetitions.value as Number;
    exercise.sets = this.sets.value as Number;

    console.log("adding exercise", exercise)
    let res = await this._http.addExercise(exercise);

    console.log(res);

  }
}


