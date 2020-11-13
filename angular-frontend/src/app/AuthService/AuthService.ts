import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isLoggedIn(): boolean {
    const token = this.getToken();

    return token != null;
  }
}
