import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService/AuthService';
import { ExerciseService } from "../HttpServices/ExerciseService"
import Exercise from "../models/Exercise"

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercises: Exercise[];
  isLoggedIn:boolean = this.authService.isLoggedIn();;
  constructor(private authService: AuthService,private _http: ExerciseService) {}

  ngOnInit(): void {
    this._http.getExercises().subscribe(r => {this.exercises = r.exercises; console.log(this.exercises)});
  }
}
