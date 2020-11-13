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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FrontPageComponent } from './front-page/front-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './AuthService/AuthIntercepter';
import {TokenExpiredInterceptor} from './AuthService/TokenExpiredInterceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {LogComponent} from "./log/log.component";
import {LogAddComponent} from "./logAdd/log.add.component";

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "exercise", component : ExerciseComponent },
      {path: "exercise-details/:id", component : ExercisedetailsComponent },
      {path: "exercise/add", component : AddexerciseComponent },
      {path: "workout/add", component : AddworkoutComponent },
      {path: "login", component : LoginComponent },
      {path: "log", component: LogComponent},
      {path: "log/add", component: LogAddComponent},
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
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ExerciseComponent,
    AddexerciseComponent,
    ExercisedetailsComponent,
    AddworkoutComponent,
    LoginComponent,
    RegisterComponent,
    FrontPageComponent,
    PageNotFoundComponent,
    LogComponent,
    LogAddComponent
  ],
})
export class AppModule { }
