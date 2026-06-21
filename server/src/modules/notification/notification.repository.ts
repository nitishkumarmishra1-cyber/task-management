import Notification from './notification.model.js';
import { toObjectId } from '../../shared/utility/util.js';
import { INotification } from '../../shared/interfaces/notification.js';
import { updateNotificationDto } from './notification.dto.js';

export class TaskRepository {
    async create(data: INotification) {
        return Notification.create(data);
    }

    async unseenCount(userId : string) {
        return Notification.countDocuments({ isView : false, receiverId : toObjectId(userId) })
    }

    async findAll(userId : string) {
        return Notification.find({ receiverId : toObjectId(userId) }).sort('isView -createdAt').populate('senderId', 'id name');
    }

    async update(data : updateNotificationDto, userId : string) {
        return Notification.updateMany(
            { _id : data.id.map(toObjectId), receiverId : toObjectId(userId) },
            { $set : { isView  : true } }
        );
    }
}

export default new TaskRepository();