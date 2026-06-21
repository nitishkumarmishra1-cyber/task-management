import mongoose from "mongoose";
const { connection, model, Schema, Types } = mongoose;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    receiverId: {
        type: Types.ObjectId,
        ref : 'User',
        required: [true, 'receiverId is required']
    },
    senderId: {
        type: Types.ObjectId,
        ref : 'User',
        required: [true, 'senderId is required']
    },
    isView: {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

notificationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

notificationSchema.virtual('senderName').get(function () {
    if (this.senderId && typeof this.senderId === 'object' && 'name' in this.senderId) {
        return (this.senderId as any).name;
    }
    return null;
});

notificationSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete (ret as any)._id;
        delete (ret as any).__v;
    }
});

const Task = connection.models.Notification || model('Notification', notificationSchema, 'notification');
export default Task;