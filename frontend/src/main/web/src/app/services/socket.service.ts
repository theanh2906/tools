import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {BehaviorSubject, Subject} from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageType } from '../shared/models';

export interface Message {
  type?: string;
  data?: any;
}

export interface ChatMessage {
  type?: MessageType;
  sender?: string;
  content?: string;
}

export interface Candidate {
  name: string;
  lastLogin: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public _candidates: Candidate[] = [];
  private _socket!: WebSocketSubject<any>;
  private _stompClient: any;

  checkIn(candidateId: Candidate) {
    this.candidates.push(candidateId);
  }

  get candidates() {
    return this._candidates
  }

  get stompClient() {
    return this._stompClient;
  }

  private _message = new Subject<Message>();

  get message() {
    return this._message.asObservable();
  }

  setStompClient(stompClient: any) {
    this._stompClient = stompClient;
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

  disconnect() {
    this._stompClient.disconnect();
    this._socket.next(null);
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
