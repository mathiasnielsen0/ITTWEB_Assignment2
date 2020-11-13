import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AddexerciseComponent } from './addexercise/addexercise.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutComponent } from './workout/workout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FrontPageComponent } from './front-page/front-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    WorkoutComponent,
    AddexerciseComponent,
    AddworkoutComponent,
    LoginComponent,
    RegisterComponent,
    FrontPageComponent,
    HttpClientModule,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "exercise", component : ExerciseComponent },
      {path: "exercise/add", component : AddexerciseComponent },
      {path: "workout", component : WorkoutComponent },
      {path: "workout/add", component : AddworkoutComponent },
      {path: "login", component : LoginComponent },
      {path: "register", component : RegisterComponent },
      {path: 'front-page', component: FrontPageComponent},
      {path: '', redirectTo: '/front-page', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
