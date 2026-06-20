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
        ref : 'user'
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const User = connection.models.User || model('User', userSchema, 'user');
export default User;