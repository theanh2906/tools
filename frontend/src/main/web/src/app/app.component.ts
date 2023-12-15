import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import SockJS from 'sockjs-client';
import { environment } from '../environments/environment';
import { Stomp } from '@stomp/stompjs';
import { MessageType } from './shared/models';
import { SocketService } from './services/socket.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private socket: SocketService
  ) {}

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    this.checkOut();
  }

  ngOnInit(): void {
    this.connect();
    this.authService.validateToken();
  }

  connect() {
    const socket = new SockJS(`${environment.apiUrl}/websocket`);
    this.socket.setStompClient(Stomp.over(socket));
    this.socket.stompClient.connect({}, (res: any) => {
      console.log(this.socket.stompClient.ws._transport.url.split('/')[6]);
      this.username = this.socket.stompClient.ws._transport.url.split('/')[6];
      this.socket.setSessionId(this.username);
      this.checkIn();
    });
  }

  checkIn() {
    this.socket.stompClient.send(
      '/api/app/chat.check-in',
      {},
      JSON.stringify({
        type: MessageType.JOIN,
        sender: this.username,
      })
    );
  }

  checkOut() {
    this.socket.stompClient.send(
      '/api/app/chat.check-in',
      {},
      JSON.stringify({
        type: MessageType.LEAVE,
        sender: this.username,
      })
    );
  }
}
