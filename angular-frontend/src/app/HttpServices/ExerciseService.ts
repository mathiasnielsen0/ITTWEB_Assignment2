import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNjVlYTM3MDYwZjcxZjBiOWI5MmIiLCJlbWFpbCI6InRlc3QiLCJleHAiOjE2MDU4Njk5MTYsImlhdCI6MTYwNTI2NTExNn0.EVWHKeiWbGHMbdW_LcdAIck_zopfsQ3VVkzEoGkE_Lk'
      })
    };
  }

  addExercise() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNjVlYTM3MDYwZjcxZjBiOWI5MmIiLCJlbWFpbCI6InRlc3QiLCJleHAiOjE2MDU4Njk5MTYsImlhdCI6MTYwNTI2NTExNn0.EVWHKeiWbGHMbdW_LcdAIck_zopfsQ3VVkzEoGkE_Lk'
      })
    };

    this.http.options("http", httpOptions)
  }

}