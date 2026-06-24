import { AppConstant } from "../../shared/utility/constant.js";
import eventBus from "../event.js";
import Observer from "./base.observer.js";

export interface ITaskObserver {
    userId: string;
    data: any;
}

export class TaskObserver extends Observer {
    readonly EVENTS: string[] = [AppConstant.TASK_UPDATE];

    public listen(): void {
        const listeners = new Map<string, Function>();

        this.EVENTS.forEach((event: string) => {
            const listener = ({ userId, data }: ITaskObserver) => {
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