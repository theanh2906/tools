import { Component, OnInit } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { FrameImpl } from '@stomp/stompjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { AuthService, FacebookLoginResponse } from '../../auth/auth.service';

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
    private authService: AuthService
  ) {}

  get isFacebookLogged() {
    return this.authService.isFacebookLogged;
  }

  ngOnInit(): void {
    if (this.authService.isFacebookLogged) {
      this.name = this.authService.facebookUser.name;
      this.connect();
      this.snackbar.open(
        this.authService.facebookUser.name + ' is connected!',
        '',
        {
          duration: 2000,
        }
      );
      this.currentUser = this.authService.facebookUser;
    }
  }

  connect() {
    if (!this.name) return;
    const socket = new SockJS(environment.apiUrl + '/chat');
    this.stompClient = Stomp.Stomp.over(socket);
    const _self = this;
    this.stompClient.connect({}, (frame: any) => {
      this.isConnected = true;
      console.log('Connected: ' + frame);
      _self.stompClient.subscribe('/topic/message', (res: FrameImpl) => {
        let mess = JSON.parse(res.body) as Message;
        this.snackbar.open(mess.from + ' has commented!', '', {
          duration: 2000,
        });
        this.chatHistory.push(mess);
      });
    });
  }

  send() {
    if (!this.text) return;
    this.stompClient.send(
      '/api/app/chat',
      {},
      JSON.stringify({ from: this.name, text: this.text })
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
