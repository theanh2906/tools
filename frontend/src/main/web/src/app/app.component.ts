import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'UsefulTools';
  private authSub!: Subscription;
  private previousAuthState = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.authSub = this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated && this.previousAuthState !== isAuthenticated) {
          this.router.navigateByUrl('/auth');
        }
        this.previousAuthState = isAuthenticated;
      }
    );
  }
}
