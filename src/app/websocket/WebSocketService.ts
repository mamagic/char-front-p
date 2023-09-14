import { Injectable } from '@angular/core';
import { Client, over, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService{
  message = '';
  private stompClient: Client;
  private messageSubject = new Subject<string>();

  constructor() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/broadcast-message', (message: Message) => {
        this.message = message.body;
        console.log('stomp : ' + this.message);
        this.messageSubject.next(this.message);
      });
    });
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
