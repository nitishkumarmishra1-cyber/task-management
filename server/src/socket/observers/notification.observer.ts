import { AppConstant } from "../../shared/utility/constant.js";
import eventBus from "../event.js";
import Observer from "./base.observer.js";

export interface INotificationObserver {
    userId: string;
    data: any;
}

export class NotificationObserver extends Observer {
    readonly EVENTS: string[] = [AppConstant.NOTIFICATION_UPDATE];

    public listen(): void {
        const listeners = new Map<string, Function>();

        this.EVENTS.forEach((event: string) => {
            const listener = ({ userId, data }: INotificationObserver) => {
                this.socket.to(`room_${userId}`).emit(event, data);
            };

            listeners.set(event, listener);
            eventBus.on(event, listener);
        });

        this.socket.on('disconnect', () => {
            this.EVENTS.forEach((event) => {
                const listener = listeners.get(event);
                if (listener) {
                    eventBus.off(event, listener as (...args: any[]) => void);
                }
            });
        });
    }
}