import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authData = window.localStorage.getItem('token');
    if (authData != null) {
      const modifiedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.token}`
        ),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
