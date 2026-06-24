import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { io, Socket } from 'socket.io-client';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private auth = inject(Auth);
  private socket!: Socket;
  private listenterQueue: Map<string, Function> = new Map();
  private beforeUnloadHandler = () => this.socket.disconnect();

  constructor() { }

  registerSocket() {
    if (this.socket?.connected) return;

    this.socket = io(environment.SOCKET_URL, {
      path: '/socket',
      auth: { token: this.auth.user?.accessToken },
      closeOnBeforeunload : true
    });

    this.updateEvent();
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  on(event: string, callback: (data: any) => void) {
    // queue listeners
    if (!this.socket) {
      this.listenterQueue.set(event, callback)
      return;
    }

    this.socket.on(event, callback);
  }

  off(event: string) {
    this.socket.off(event);
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null!;
    this.listenterQueue.clear();
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private updateEvent(): void {
    if (this.listenterQueue.size <= 0) return;

    for (let [key, callback] of this.listenterQueue.entries()) {
      this.socket.on(key, callback as (...args: any[]) => void);
    }

    this.listenterQueue.clear();
  }
}
