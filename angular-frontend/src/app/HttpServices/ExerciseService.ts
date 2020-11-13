import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import Exercise from "../models/Exercise"

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  baseUrl = 'http://localhost:3000/exercise'

  constructor(private http: HttpClient) {
  }

  addExercise(exercise : Exercise ) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNjVlYTM3MDYwZjcxZjBiOWI5MmIiLCJlbWFpbCI6InRlc3QiLCJleHAiOjE2MDU4Njk5MTYsImlhdCI6MTYwNTI2NTExNn0.EVWHKeiWbGHMbdW_LcdAIck_zopfsQ3VVkzEoGkE_Lk'
      })
    };
    const body = JSON.stringify(exercise);
    console.log(body)
    return this.http.post(this.baseUrl + 'people', body, httpOptions)
  }

}