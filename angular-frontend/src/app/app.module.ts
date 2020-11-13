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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: "exercise", component : ExerciseComponent },
      {path: "addexercise", component : AddexerciseComponent },
      {path: "workout", component : WorkoutComponent },
      {path: "addworkout", component : AddworkoutComponent },
      {path: "login", component : LoginComponent },
      {path: "register", component : RegisterComponent },
      {path: '', redirectTo: '/workout', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
