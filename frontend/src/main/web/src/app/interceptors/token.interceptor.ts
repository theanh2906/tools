import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authData = window.localStorage.getItem('authData');
    let data: any;
    if (authData != null) {
      data = JSON.parse(authData) as {
        token: string;
        tokenExpirationDate: string;
        userId: string;
        email: string;
      };

      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${data.token}`),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
