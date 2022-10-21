import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  type?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket!: WebSocketSubject<any>;

  constructor() {}

  private _message = new Subject<Message>();

  get message() {
    return this._message.asObservable();
  }

  connect() {
    if (!this._socket || this._socket.closed) {
      this._socket = this.getNewWebSocket();
      this._socket.subscribe({
        next: (message) => {
          console.log('Received message of type: ' + message.type);
          this._message.next(message);
        },
      });
    }
  }

  sendMessage(message: Message) {
    console.log('sending message: ' + message.type);
    this._socket.next(message);
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: environment.wsEndpoint,
      openObserver: {
        next: () => {
          console.log('Connection ok');
        },
      },
      closeObserver: {
        next: () => {
          console.log('Connection closed');
          // @ts-ignore
          this._socket = undefined;
          this.connect();
        },
      },
    });
  }
}
