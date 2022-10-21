import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { FrameImpl, Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  candidates: string[] = [];
  stompClient: any;
  currentUser = '';
  to = '';
  constructor() {}

  ngOnInit(): void {
    this.connectCheckIn();
  }

  connect() {
    const socket = new SockJS(environment.apiUrl + '/secured/room');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.currentUser = this.stompClient.ws._transport.url.split('/')[6];
      console.log(this.stompClient.ws._transport.url.split('/')[6]);
      this.stompClient.subscribe(
        '/secured/user/queue/specific-user' + '-user' + this.currentUser,
        (messageOut: FrameImpl) => {
          alert(JSON.parse(messageOut.body).text);
        }
      );
    });
  }

  connectCheckIn() {
    const socket = new SockJS(environment.apiUrl + '/websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.currentUser = this.stompClient.ws._transport.url.split('/')[6];
      this.stompClient.subscribe('/topic/public', (res: FrameImpl) => {
        this.candidates.push(JSON.parse(res.body).sender);
      });
    });
  }

  send() {
    this.stompClient.send(
      '/api/app/chat',
      {},
      JSON.stringify({
        from: this.currentUser,
        to: this.to,
        text: `Hello ${this.to}`,
      })
    );
  }
}
