import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router){

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isLoggedIn(): boolean {
    const token = this.getToken();

    return token != null;
  }

  public logout():void {
    localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }
}
