import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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


  constructor () {}

  ngOnInit(): void {
  }

  submitExercise() {
    // Process checkout data here
    // this.exerciseForm.reset();

    console.log('exercise has been submitted', this.name.value, this.description.value, this.repetitions.value, this.sets.value);
  }
}


