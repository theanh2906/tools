import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from './config/app.config';
import { Observable } from 'rxjs';

export type LoginResponse = {
  success: boolean;
  data: {
    token: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
  };
};

export type LoginRequest = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  getToken(json: string): Observable<any> {
    return this.http.post<any>(this.config.endpoints.auth.login, json);
  }

  encode(request: string): Observable<any> {
    return this.http.post<any>(this.config.endpoints.helpers.encode, request);
  }
}
