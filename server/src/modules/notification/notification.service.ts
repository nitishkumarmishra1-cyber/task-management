import notificationRepository from './notification.repository.js';
import { IUser } from '../../shared/interfaces/user.js';
import { updateNotificationDto } from './notification.dto.js';

export default class NotificationService {
    async findCount(id: IUser['id']) {
        return notificationRepository.unseenCount(id);
    }

    async findNotifications(id: IUser['id']) {
        return notificationRepository.findAll(id);
    }

    async updateNotification(data : updateNotificationDto, userId: IUser['id']) {
        return notificationRepository.update(data, userId);
    }
}