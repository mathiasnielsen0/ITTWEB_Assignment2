import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail = new FormControl('');
  password = new FormControl('');
  message = String();
  token = 'token';

  constructor(private client: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
  }


  submit(): void {
    this.message = '';
    if (this.password.valid && this.mail.valid) {
      const user = {
        email: this.mail.value,
        password: this.password.value
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.client.post(environment.backendUrl + 'user/login', user, httpOptions).subscribe({
        next: data => {
          console.log(data);

          // @ts-ignore
          localStorage.setItem('token', data.token);
          this.router.navigate(['/workout']);
        },
        error: err => {
          console.log(err);
          this.message = 'Username or password was wrong';
        }
      });


    }
  }
}
