import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AddexerciseComponent } from './addexercise/addexercise.component';
import { ExercisedetailsComponent } from './exercisedetails/exercisedetails.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutComponent } from './workout/workout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FrontPageComponent } from './front-page/front-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './AuthService/AuthIntercepter';
import {TokenExpiredInterceptor} from './AuthService/TokenExpiredInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    WorkoutComponent,
    AddexerciseComponent,
    ExercisedetailsComponent,
    AddworkoutComponent,
    LoginComponent,
    RegisterComponent,
    FrontPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "exercise", component : ExerciseComponent },
      {path: "exercise-details/:id", component : ExercisedetailsComponent },
      {path: "exercise/add", component : AddexerciseComponent },
      {path: "workout", component : WorkoutComponent },
      {path: "workout/add", component : AddworkoutComponent },
      {path: "login", component : LoginComponent },
      {path: "register", component : RegisterComponent },
      {path: 'front-page', component: FrontPageComponent},
      {path: '', redirectTo: '/front-page', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
