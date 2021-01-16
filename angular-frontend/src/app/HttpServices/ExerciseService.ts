import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import Exercise from "../models/Exercise"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  baseUrl = environment.backendUrl + 'exercise/'

  constructor(private http: HttpClient) {
  }

  addExercise(exercise : Exercise ) : Promise<any>{
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNjVlYTM3MDYwZjcxZjBiOWI5MmIiLCJlbWFpbCI6InRlc3QiLCJleHAiOjE2MDU4Njk5MTYsImlhdCI6MTYwNTI2NTExNn0.EVWHKeiWbGHMbdW_LcdAIck_zopfsQ3VVkzEoGkE_Lk'
        })
    };

    const body = JSON.stringify(exercise);

    return this.http.post(environment.backendUrl + 'exercise/',body,options).toPromise();
  }


  public getExercises(): Observable<{ exercises : Exercise[] }> {
    const url = environment.backendUrl + "exercise/";
    return this.http.get<{ exercises: Exercise[] }>(url);
  }

  public getExercise(id: string): Observable<{ exercise : Exercise }> {
    const url = environment.backendUrl + "exercise/" + id;
    return this.http.get<{ exercise: Exercise }>(url);
  }
}