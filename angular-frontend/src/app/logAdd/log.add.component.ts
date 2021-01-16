import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import Workout from "../models/Workout";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-log',
  templateUrl: './log.add.component.html',
  styleUrls: ['./log.add.component.scss']
})
export class LogAddComponent implements OnInit {
  workouts: [] = [];
  select = new FormControl('');
  message = String();

  constructor(private client: HttpClient, private router: Router) {
  }

  submit() {
    const body = {workoutId: this.select.value};
    this.client.post(environment.backendUrl + "log/", body).subscribe({
      next: value => {
        this.router.navigate(["/log"]);
      },
      error: err => {
        this.message = "something went wrong, try again later."
      }
    });
  }

  ngOnInit(): void {

    //listUser
    this.client.get(environment.backendUrl + "workout/").subscribe({
      next: value => {

        // @ts-ignore
        this.workouts = Object.assign(value.workouts);
        console.log(this.workouts);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
