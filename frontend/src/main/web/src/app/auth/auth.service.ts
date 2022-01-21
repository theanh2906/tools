import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { StringUtils } from '../helpers/string-utils';
import { APP_CONFIG, IAppConfig } from '../config/app.config';

export interface AuthResponseData {
  id: string;
  token: string;
  username: string;
  email: string;
  expiresIn: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // @ts-ignore
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        }
        return null;
      })
    );
  }

  get isAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        }
        return false;
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        }
        return null;
      })
    );
  }

  ngOnDestroy(): void {}

  login = (email: string, password: string) => {
    return this.http
      .post<AuthResponseData>(
        `${this.appConfig.endpoints.auth.login}`,
        StringUtils.encode({ email, password })
      )
      .pipe(
        tap(this.setUserData.bind(this)),
        tap(() => {
          this.autoLogin().subscribe();
        })
      );
  };

  autoLogin = () => {
    return of(window.localStorage.getItem('authData')).pipe(
      map((storedData) => {
        if (!storedData) {
          return;
        }
        const parsedData = JSON.parse(storedData) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return;
        }
        return new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  };

  signup = (email: string, password: string): Observable<AuthResponseData> => {
    // return this.http
    //   .post<AuthResponseData>(
    //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.webApiKey}`,
    //     { email, password, returnSecureToken: true }
    //   )
    //   .pipe(tap(this.setUserData.bind(this)));
    return new Observable();
  };

  logout = () => {
    of(window.localStorage.removeItem('authData')).subscribe(() => {
      // @ts-ignore
      this._user.next(null);
    });
  };

  private autoLogout = (duration: number) => {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(this.logout, duration);
  };

  private setUserData = (userData: AuthResponseData) => {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.id,
      userData.email,
      userData.token,
      expirationTime
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.id,
      userData.token,
      expirationTime.toISOString(),
      userData.email
    );
  };

  private storeAuthData = (
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) => {
    const data = JSON.stringify({ userId, token, tokenExpirationDate, email });
    window.localStorage.setItem('authData', data);
  };
}
