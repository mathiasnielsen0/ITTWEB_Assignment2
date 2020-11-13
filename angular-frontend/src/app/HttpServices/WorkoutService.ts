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
  
  getAllWorkouts() : Observable<{workouts: Workout[]}>{
      return this.http.get<{workouts: Workout[]}>('http://localhost:3000/workout/list');
  }


  addWorkout(workout : Workout ) : Promise<any>{
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNjVlYTM3MDYwZjcxZjBiOWI5MmIiLCJlbWFpbCI6InRlc3QiLCJleHAiOjE2MDU4Njk5MTYsImlhdCI6MTYwNTI2NTExNn0.EVWHKeiWbGHMbdW_LcdAIck_zopfsQ3VVkzEoGkE_Lk'
        })
    };

    const body = JSON.stringify(workout);

    return this.http.post('http://localhost:3000/workout/add', body, options).toPromise();
  }

  public getWorkout(id: string): Observable<{ workout : Workout }> {
    const url = "http://localhost:3000/workout/details?id=" + id;
    return this.http.get<{ workout: Workout }>(url);
  }
}