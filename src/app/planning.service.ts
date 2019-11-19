import { Injectable, EventEmitter } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
  HttpTransportType
} from '@microsoft/signalr';
import { User } from './models/user';
import { environment } from 'src/environments/environment';

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  userJoined = new EventEmitter<User>();
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  // tslint:disable-next-line: variable-name
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  addUserToPlanning(user: User) {
    this._hubConnection.invoke('NewUser', user);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/PlanningHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  private startConnection() {
    if (this._hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    setTimeout(() => {
      this._hubConnection.start().then(() => {
        console.log('connected');
      });
    }, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('UserJoined', (data: any) => {
      this.userJoined.emit(data);
    });
  }
}
