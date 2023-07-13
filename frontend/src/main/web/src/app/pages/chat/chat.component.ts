import {Component, OnInit} from '@angular/core';
import {FrameImpl} from '@stomp/stompjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService, FacebookLoginResponse} from '../../auth/auth.service';
import {SocketService} from '../../services/socket.service';
import {ActivatedRoute} from "@angular/router";

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
    private socket: SocketService,
    private route: ActivatedRoute
  ) {
  }

  get receiverId() {
    return this.route.snapshot.paramMap.get("id") ? this.route.snapshot.paramMap.get("id") : '';
  }

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
          let content = JSON.parse(messageOut.body).text
          this.chatHistory.push(content);
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
        to: this.receiverId,
        text: `Hello ${this.receiverId}`,
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
