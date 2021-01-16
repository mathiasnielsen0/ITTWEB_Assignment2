import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router, RouterModule, Routes} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('');
  mail = new FormControl('');
  password1 = new FormControl('');
  password2 = new FormControl('');
  message = String();

  constructor(private client: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.mail.valid && this.password1.valid && this.password2.valid && this.password1.value === this.password2.value) {
      const user = {
        name: this.name.value,
        email: this.mail.value,
        password: this.password1.value
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.client.post(environment.backendUrl + 'user/', user, httpOptions).subscribe({
        next: data => {
          console.log(data);
          // @ts-ignore
          localStorage.setItem('token', data.token);
          this.router.navigate(['/front-page']);
        },
        error: err => {
          console.log(err);
          const response = err as HttpErrorResponse;
          this.message = err.error.title;
        }
      });
    }
  }
}
