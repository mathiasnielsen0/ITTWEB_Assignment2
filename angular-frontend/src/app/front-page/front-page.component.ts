import { AfterContentChecked, AfterContentInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import WorkoutService from '../HttpServices/WorkoutService'
import Workout from '../models/Workout'

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit,  AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked, OnChanges {
  workouts:Workout[] = []
  private viewChecked:boolean = false;
  constructor(private _http: WorkoutService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }
  ngAfterContentInit(): void {
    
    console.log("ngAfterContentInit")
  }
  ngAfterViewInit(): void {
    console.log("afterViewInit")
  }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    this._http.getAllWorkouts().subscribe(r => this.workouts = r.workouts);
  }

  private createFoldableButtons(){

      const targetNodes = document.getElementsByClassName("collapsible");

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function(mutationsList, observer) {
          // Use traditional 'for loops' for IE 11
          for(const mutation of mutationsList) {
              if (mutation.type === 'childList') {
                  console.log('A child node has been added or removed.');
              }
              else if (mutation.type === 'attributes') {
                  console.log('The ' + mutation.attributeName + ' attribute was modified.');
              }
          }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);


      for (let index = 0; index < targetNodes.length; index++) {
        const element = targetNodes[index];        
        // Start observing the target node for configured mutations
        observer.observe(element, config);
      }
    }
}

// console.log(coll.length)
//         coll[i].addEventListener("click", function() {
//           this.classList.toggle("active");
//           var content = this.nextElementSibling;
//           console.log(content.style.display)
//           if (content.style.display === "block") {
//             content.style.display = "none";
//           } else {
//             content.style.display = "block";
//           }
//         });