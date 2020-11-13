import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExerciseService } from "../HttpServices/ExerciseService"
import { Router, ActivatedRoute } from "@angular/router"
import Exercise from "../models/Exercise"

@Component({
  selector: 'app-exercisedetails',
  templateUrl: './exercisedetails.component.html',
  styleUrls: ['./exercisedetails.component.scss']
})
export class ExercisedetailsComponent implements OnInit {

  name = new FormControl('');
  description = new FormControl('');
  repetitions = new FormControl('');
  sets = new FormControl('');

  id;

  constructor (private _http: ExerciseService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'] //log the value of id
    });
  }

  ngOnInit(): void {
    this._http.getExercise(this.id as string).subscribe(r => {
      this.name = new FormControl(r.exercise.name);
      this.description = new FormControl(r.exercise.description);
      this.repetitions = new FormControl(r.exercise.repetitions);
      this.sets = new FormControl(r.exercise.sets);
    });
  }

}


