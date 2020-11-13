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
    public getAllWorkouts(): Observable<{ workouts : Workout[] }> {
        const url = "http://localhost:3000/workout/list";
        return this.http.get<{ workouts: Workout[] }>(url);
      }

}