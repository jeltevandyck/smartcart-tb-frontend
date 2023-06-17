import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig }  from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$: WebSocketSubject<any>;

  constructor() { 
    
    const socketConfig: WebSocketSubjectConfig<any> = {
      url: `ws://${environment.ip}:8080`,
      deserializer: (data) => data,
      serializer: (data) => data,
    };
    this.socket$ = webSocket(socketConfig);
  }

  connect() {
    return this.socket$;
  }

  disconnect() {
    this.socket$.complete();
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  getMessage() {
    return this.socket$.asObservable();
  }
}
