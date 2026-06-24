import { Server, Socket } from "socket.io";
import { NotificationObserver } from "./observers/notification.observer.js";
import { TaskObserver } from "./observers/task.observer.js";
import { corsConfig } from "../core/setting.js";
import { socketAuthMiddleware } from "../middleware/auth.middleware.js";

const userConnection = new Map<string, Socket>();

export default function initSocket(server: any) {
    const io = new Server(server, {
        path: '/socket',
        cors: corsConfig
    });

    const observerClasses = [NotificationObserver, TaskObserver];

    // registering middleware
    io.use(socketAuthMiddleware)


    io.on('connection', (socket: Socket) => {
        const userId = socket.data.user.id;
        const roomId = `room_${userId}`;

        if (userConnection.has(roomId)) {
            const userSocket = userConnection.get(roomId);
            userSocket?.disconnect(true);
            userConnection.delete(roomId);
        }

        socket.join(roomId);
        userConnection.set(roomId, socket);

        observerClasses.forEach((ObserverClass) => {
            const observer = new ObserverClass(socket);
            observer.listen();
        });

        socket.on('disconnect', () => {
            userConnection.delete(roomId);
        });
    });
}