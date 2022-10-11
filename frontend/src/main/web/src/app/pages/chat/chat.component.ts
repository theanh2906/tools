import { Component, OnInit } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { FrameImpl } from '@stomp/stompjs';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

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
  chatHistory: string[] = [];
  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  connect() {
    if (!this.name) return;
    const socket = new SockJS(environment.apiUrl + '/chat');
    this.stompClient = Stomp.Stomp.over(socket);
    const _self = this;
    this.stompClient.connect({}, (frame: any) => {
      this.isConnected = true;
      console.log('Connected: ' + frame);
      _self.stompClient.subscribe('/topic/message', (res: FrameImpl) => {
        let mess = JSON.parse(res.body) as {
          from: string;
          text: string;
          time: string;
        };
        this.snackbar.open(mess.from + ' has commented!', '', {
          duration: 2000,
        });
        this.chatHistory.push(
          mess.time + ' - ' + mess.from + ' - ' + mess.text
        );
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
}
