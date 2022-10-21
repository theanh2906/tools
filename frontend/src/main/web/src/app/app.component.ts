import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import SockJS from 'sockjs-client';
import { environment } from '../environments/environment';
import { FrameImpl, Stomp } from '@stomp/stompjs';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'UsefulTools';
  stompClient: any;
  username = '';
  private authSub!: Subscription;
  private previousAuthState = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    this.checkOut();
  }

  ngOnInit(): void {
    this.connect();
    this.authSub = this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated && this.previousAuthState !== isAuthenticated) {
          this.router.navigateByUrl('/auth');
        }
        this.previousAuthState = isAuthenticated;
      }
    );
  }

  connect() {
    const socket = new SockJS(`${environment.apiUrl}/websocket`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (res: any) => {
      console.log(this.stompClient.ws._transport.url.split('/')[6]);
      this.username = this.stompClient.ws._transport.url.split('/')[6];
      this.checkIn();
    });
  }

  checkIn() {
    this.stompClient.send(
      '/api/app/chat.check-in',
      {},
      JSON.stringify({
        sender: this.username,
      })
    );
  }

  checkOut() {
    this.stompClient.send(
      '/api/app/chat',
      {},
      JSON.stringify({
        sender: this.username,
      })
    );
  }
}
