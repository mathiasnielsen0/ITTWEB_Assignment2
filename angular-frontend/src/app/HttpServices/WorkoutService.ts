import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import Workout from '../models/Workout'

@Injectable({
  providedIn: 'root'
})
export default class WorkoutService {

    constructor(private http: HttpClient) {
        
    }
  
    getAllWorkouts() : Observable<Workout[]>{

        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };

        return this.http.get<Workout[]>('/workout/list',options).pipe();
    }

}