import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './AuthService';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let observable: Observable<HttpEvent<any>>;
    observable = next.handle(request);
    observable.subscribe({
      next: value => {
      },
      error: err => {
        const response = err as HttpErrorResponse;
        if (response.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
    return observable;
  }
}
