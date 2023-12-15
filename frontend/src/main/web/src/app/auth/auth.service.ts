import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { StringUtils } from '../helpers/string-utils';
import { APP_CONFIG, IAppConfig } from '../config/app.config';
import { Utils } from '../shared/utils';
import { CONSTANTS } from '../shared/constants';
import { Router } from '@angular/router';
import StatusResponse = facebook.StatusResponse;

export interface AuthResponseData {
  id: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
  roles: string[];
}

export interface AuthResponse {
  token: string;
}

export interface FacebookLoginResponse {
  id: string;
  email: string;
  name: string;
  picture: {
    data: {
      height: number;
      width: number;
      is_silhouette: boolean;
      url: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  defaultRes: AuthResponseData = {
    email: '',
    id: '',
    iat: 0,
    exp: 0,
    username: '',
    roles: [],
  };
  // @ts-ignore
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  private helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {
    FB.init({
      appId: CONSTANTS.FACEBOOK.APP_ID,
      cookie: true,
      xfbml: true,
      status: true,
      version: CONSTANTS.FACEBOOK.API_VERSION,
      autoLogAppEvents: true,
    });
  }

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
    return of(this.isTokenValid);
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  get isFacebookLogged() {
    return !!localStorage.getItem('fb_user');
  }

  get facebookUser() {
    return JSON.parse(
      <string>localStorage.getItem('fb_user')
    ) as FacebookLoginResponse;
  }

  get authData() {
    if (this.token) {
      return this.parseToken(this.token);
    } else return this.defaultRes;
  }

  get tokenExpiringTime() {
    return this.authData.exp;
  }

  get isTokenValid() {
    return !!this.token && !this.helper.isTokenExpired(this.token);
  }

  ngOnDestroy(): void {}

  login = (email: string, password?: string) => {
    return this.http
      .post<{ token: string }>(
        `${this.appConfig.endpoints.auth.login}`,
        StringUtils.encode({ email, password })
      )
      .pipe(
        tap(this.storeToken),
        tap(this.setUserData),
        tap(() => {
          this.autoLogin().subscribe();
        })
      );
  };

  autoLogin = () => {
    return of(window.localStorage.getItem('token')).pipe(
      map((storedData) => {
        if (!storedData) {
          return;
        }
        const parsedData = this.parseToken(storedData);
        if (parsedData.exp <= new Date().getTime()) {
          return;
        }
        return new User(
          parsedData.id,
          parsedData.email,
          parsedData.roles,
          parsedData.username
        );
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(
            new Date(this.authData.exp).getTime() -
              new Date(this.authData.iat).getTime()
          );
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  };

  signup = (email: string, password: string): Observable<AuthResponse> => {
    // return this.http
    //   .post<AuthResponseData>(
    //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.webApiKey}`,
    //     { email, password, returnSecureToken: true }
    //   )
    //   .pipe(tap(this.setUserData.bind(this)));
    return new Observable();
  };

  logout = () => {
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  };

  facebookLogin() {
    return of(
      FB.login(
        (response: StatusResponse) => {
          FB.api(
            `/${response.authResponse.userID}`,
            {
              fields: 'id,name,email,picture',
              access_token: response.authResponse.accessToken,
            },
            (res) => {
              localStorage.setItem('fb_user', JSON.stringify(res));
            }
          );
        },
        {
          scope: Utils.createFacebookScopes([
            CONSTANTS.FACEBOOK.SCOPES.EMAIL,
            CONSTANTS.FACEBOOK.SCOPES.PUBLIC_PROFILE,
          ]),
        }
      )
    );
  }

  getFacebookInfo(response: StatusResponse) {
    this.http
      .get(
        `https://graph.facebook.com/${response.authResponse.userID}/accounts?access_token=${response.authResponse.accessToken}`
      )
      .subscribe(console.log);
  }

  validateToken() {
    if (this.token) {
      if (!this.isTokenValid) {
        window.localStorage.removeItem('token');
        // @ts-ignore
        this._user.next(null);
      } else {
        this.autoLogout(
          Math.round(this.authData.exp - new Date().getTime() / 1000)
        );
        this._user.next(
          new User(
            this.authData.id,
            this.authData.email,
            this.authData.roles,
            this.authData.username
          )
        );
      }
    }
  }

  private autoLogout = (duration: number) => {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(this.logout, duration * 1000);
  };

  private setUserData = (userData: AuthResponse) => {
    let claim = this.parseToken(userData.token);
    const user = new User(claim.id, claim.email, claim.roles, claim.username);
    this._user.next(user);
    this.autoLogout(claim.exp - claim.iat);
    // this.storeAuthData(claim);
  };

  private storeToken = (data: AuthResponse) => {
    if (data && data.token) {
      window.localStorage.setItem('token', data.token);
    }
  };

  private storeAuthData = (claim: AuthResponseData) => {
    const tokenExpirationDate = new Date(claim.exp).toISOString();
    const data = JSON.stringify({
      userId: claim.id,
      tokenExpirationDate,
      email: claim.email,
    });
    window.localStorage.setItem('authData', data);
  };

  private parseToken(token: string) {
    return this.helper.decodeToken(token) as AuthResponseData;
  }
}
