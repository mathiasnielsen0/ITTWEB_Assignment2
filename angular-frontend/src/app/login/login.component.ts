import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail = new FormControl('');
  password = new FormControl('');
  constructor(private client: HttpClient) { }


  ngOnInit(): void {
  }

  submit(): void
  {
    const httpOptions = {
      header: {'Content-type': 'application/json'},
      observe: 'response',
      body: {email: this.mail.value, password: this.password.value}
    };
    this.client.post<JSON>(environment.backendUrl, httpOptions ).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });



  }
}
