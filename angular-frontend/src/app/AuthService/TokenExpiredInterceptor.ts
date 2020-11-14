import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './AuthService';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let observable: Observable<HttpEvent<any>>;
    return next.handle(request).pipe(
      tap(
        event => {/**console.log("Do nothing") */},
          // Operation failed; error is an HttpErrorResponse
        error => {
          console.log("ERRRRROR")
          const response = error as HttpErrorResponse;
          if (response.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      ),
      finalize(() => {

      })
    )
  }
}
