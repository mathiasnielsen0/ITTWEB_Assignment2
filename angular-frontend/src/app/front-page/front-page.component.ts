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
  constructor(private _http: WorkoutService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._http.getAllWorkouts().subscribe(r => this.workouts = r.workouts);
    window.setTimeout(() => {this.createFoldableButtons(); document.getElementById('search').addEventListener('keyup',(e) => {this.filter(e)});},200);

    this.isLoggedIn = this._authService.isLoggedIn();
  }

  private createFoldableButtons(){
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  private filter(e:any){
    var collapsible = document.getElementsByClassName("collapsible");
    let searchText = (document.getElementById('search') as HTMLInputElement).value
    for (let i = 0; i < collapsible.length; i++) {
      const element = collapsible[i];
      if (this.workouts[i].name.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
        (element as HTMLButtonElement).style.display = "";
      } else {
        (element as HTMLButtonElement).style.display = "none";
      }
    }
  }
}