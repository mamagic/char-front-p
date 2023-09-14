import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { WebSocketService } from '../websocket/WebSocketService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  messages: { text: string }[] = [];
  newMessage = '';
  private mySubscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient,
              private webSocketService: WebSocketService){
  }

  ngOnInit(): void {
      // WebSocketService의 getMessageSubject() 메서드를 사용하여 Subject를 구독합니다.
      this.webSocketService.getMessageSubject().subscribe((message: string) => {
        this.messages.push({text : message});
      });
    }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.httpClient.post(
          'http://localhost:8080/',
          this.newMessage,
          {responseType:'text'}
//           { headers:
//             { 'Content-Type': 'text/plain;charset=UTF-8','Accept': 'text/plain;charset=UTF-8' }
//           }
          )
          .subscribe((response : any) => {
            console.log('all :' + response);
           },
          (error) => {
            console.error("send failed",error.message);
          });

      this.newMessage = '';
    }
  }
}

