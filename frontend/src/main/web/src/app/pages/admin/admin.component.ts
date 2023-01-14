import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { FrameImpl, Stomp } from '@stomp/stompjs';
import { MessageType } from '../../shared/models';
import { SocketService } from '../../services/socket.service';

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
  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.connectCheckIn();
  }

  connect() {
    const socket = new SockJS(environment.apiUrl + '/secured/room');
    this.stompClient = Stomp.over(socket);
    this.currentUser = this.stompClient.ws._transport.url.split('/')[6];
    console.log(this.stompClient.ws._transport.url.split('/')[6]);
    this.stompClient.subscribe(
      '/secured/user/queue/specific-user' + '-user' + this.currentUser,
      (messageOut: FrameImpl) => {
        alert(JSON.parse(messageOut.body).text);
      }
    );
  }

  connectCheckIn() {
    // const socket = new SockJS(environment.apiUrl + '/websocket');
    // this.stompClient = Stomp.over(socket);
    this.socket.stompClient.connect({}, (frame: any) => {
      this.currentUser =
        this.socket.stompClient.ws._transport.url.split('/')[6];
      this.socket.stompClient.subscribe('/topic/public', (res: FrameImpl) => {
        switch (JSON.parse(res.body).type) {
          case MessageType.JOIN:
            if (
              JSON.parse(res.body).sender !=
              this.socket.stompClient.ws._transport.url.split('/')[6]
            ) {
              this.candidates.push(JSON.parse(res.body).sender);
            }
            break;
          case MessageType.LEAVE:
            if (
              JSON.parse(res.body).sender !=
              this.socket.stompClient.ws._transport.url.split('/')[6]
            ) {
              this.candidates = this.candidates.filter(
                (each) => each != JSON.parse(res.body).sender
              );
            }
        }
      });
    });
  }

  send() {
    this.socket.stompClient.send(
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
