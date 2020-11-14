import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import Log from "../models/Log";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  logs: Log[] = [];
  displayedColumns: string[] = ['id','name','created'];

  constructor(private client: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
    this.client.get(environment.backendUrl + "log/list").subscribe({
      next: value => {
        // @ts-ignore
        this.logs = Object.assign<Log[]>(value.logs);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
