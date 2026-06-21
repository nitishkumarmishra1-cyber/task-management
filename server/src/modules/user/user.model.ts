import mongoose from "mongoose";
const { connection, model, Schema, Types } = mongoose;
import { ROLE } from "../../shared/interfaces/user.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [2, 'Name must be at least 2 characters'],
        maxLength: [50, 'Name must not exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w.-]+@[\w.-]+\.\w+$/,
            'Please enter a valid email address'
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: Object.values(ROLE),
            message: '{VALUE} is not a valid role'
        },
        default: ROLE.USER,
    },
    reportTo: {
        type: Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.virtual('reportToName').get(function () {
    if (this.reportTo && typeof this.reportTo === 'object' && 'name' in this.reportTo) {
        return (this.reportTo as any).name;
    }
    return null;
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete (ret as any)._id;
        delete (ret as any).__v;
        delete (ret as any).password;
    }
});

const User = connection.models.User || model('User', userSchema, 'user');
export default User;