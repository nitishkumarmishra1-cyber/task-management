import { Socket } from "socket.io";

export default abstract class Observer {
    public socket!: Socket;

    constructor(io : Socket) {
        this.socket = io
    }

    public abstract listen(): void;
}