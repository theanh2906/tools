import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { FrameImpl } from '@stomp/stompjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { AuthService, FacebookLoginResponse } from '../../auth/auth.service';
import * as uuid from 'uuid';
import { SocketService } from '../../services/socket.service';
export interface Message {
  from?: string;
  time?: string;
  text?: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  stompClient: any;
  messages: string[] = [];
  isConnected = false;
  name = '';
  text = '';
  chatHistory: Message[] = [];
  currentUser!: FacebookLoginResponse;
  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private socket: SocketService
  ) {}

  get isFacebookLogged() {
    return this.authService.isFacebookLogged;
  }

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    this.socket.stompClient.connect({}, (frame: any) => {
      console.log(this.socket.stompClient.ws._transport.url);
      this.name = this.socket.stompClient.ws._transport.url.split('/')[6];
      this.isConnected = true;
      console.log('Connected: ' + frame);
      this.socket.stompClient.subscribe(
        '/private/user' + '-user' + this.name,
        (messageOut: FrameImpl) => {
          alert(JSON.parse(messageOut.body).text);
        }
      );
    });
  }

  send() {
    this.socket.stompClient.send(
      '/api/app/private',
      {},
      JSON.stringify({
        from: this.name,
        to: this.name,
        text: `Hello ${this.name}`,
      })
    );
  }

  fbLogin() {
    this.authService.facebookLogin().subscribe({
      next: () => {
        this.name = this.authService.facebookUser.name;
        this.connect();
        this.snackbar.open(
          this.authService.facebookUser.name + ' is connected!',
          '',
          {
            duration: 2000,
          }
        );
      },
    });
  }
}
