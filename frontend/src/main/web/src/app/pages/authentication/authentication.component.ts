import { Component, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from '../../auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { CachesService } from '../../services/caches.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/),
  ]);
  password = new FormControl('', [Validators.required]);
  isLogin = true;
  isLoading = false;
  previousUrl = '';

  constructor(
    private authService: AuthService,
    private cachesService: CachesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSwitchMode = () => {
    this.isLogin = !this.isLogin;
  };

  authenticate = (email: string, password: string) => {
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.cachesService.getPreviousUrl());
      },
      (error) => {
        const errorCode = error.error.error.message;
        switch (errorCode) {
          case 'INVALID_PASSWORD':
            this.showErrorMessage('This password is not correct.');
            break;
          case 'EMAIL_NOT_FOUND':
            this.showErrorMessage('Email address could not be found.');
            break;
          case 'EMAIL_EXISTS':
            this.showErrorMessage('This email already exists!');
            break;
        }
        this.isLoading = false;
      }
    );
  };
  getEmailErrorMessage = () => {
    if (this.email.hasError('required')) {
      return 'This field is required';
    }
    return this.email.hasError('pattern') ? 'Invalid email address!' : '';
  };
  getPasswordErrorMessage = () => {
    if (this.email.hasError('required')) {
      return 'This field is required';
    }
    return '';
  };
  showErrorMessage = (message: string) => {
    this.messageService.add({
      key: 'loginError',
      summary: 'An error occurred!',
      detail: message,
      severity: 'error',
    });
  };
}
