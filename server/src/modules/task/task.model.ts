import mongoose from "mongoose";
const { connection, model, Schema, Types } = mongoose;
import { STATUS } from "../../shared/interfaces/task.js";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [10, 'Title must be at least 10 characters'],
        maxLength: [100, 'Title must not exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxLength: [250, 'Description must not exceed 200 characters']
    },
    assignTo: {
        type: Types.ObjectId,
        ref : 'User',
        required: [true, 'Assignee is required']
    },
    status: {
        type: String,
        enum: {
            values: Object.values(STATUS),
            message: '{VALUE} is not a valid status'
        },
        default: STATUS.PENDING,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

taskSchema.virtual('assignToName').get(function () {
    if (this.assignTo && typeof this.assignTo === 'object' && 'name' in this.assignTo) {
        return (this.assignTo as any).name;
    }
    return null;
});

taskSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete (ret as any)._id;
        delete (ret as any).__v;
    }
});

const Task = connection.models.Task || model('Task', taskSchema, 'task');
export default Task;