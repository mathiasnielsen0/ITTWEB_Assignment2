import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import Workout from '../models/Workout'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export default class WorkoutService {

  constructor(private http: HttpClient) {
      
  }
  
  getAllWorkouts() : Observable<{workouts: Workout[]}>{
      return this.http.get<{workouts: Workout[]}>(environment.backendUrl + 'workout/list');
  }


  addWorkout(workout : Workout ) : Promise<any>{
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFjMGQ1NjRjZmNiZTQ2ZWExZWU0Y2UiLCJlbWFpbCI6ImFkbWluQGFkbWluLmRrIiwibmFtZSI6InNrZWRlIiwiZXhwIjoxNjA1ODkwNjI5LCJpYXQiOjE2MDUyODU4Mjl9.L9nRudEy1A_6HcO3E0x--7zUCv9wY0OKR3OI5vgd5pg'
        })
    };

    const body = JSON.stringify(workout);

    return this.http.post(environment.backendUrl + 'workout/add', body, options).toPromise();
  }

  public getWorkout(id: string): Observable<{ workout : Workout }> {
    const url = environment.backendUrl + "workout/details?id=" + id;
    return this.http.get<{ workout: Workout }>(url);
  }
}