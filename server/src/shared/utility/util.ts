import { z } from 'zod';
import mongoose from "mongoose";
import { AppError } from "../../core/app.error.js";
import { HTTP_STATUS } from "../../core/message.js";

export function toObjectId(id: string): mongoose.Types.ObjectId {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid ID format", HTTP_STATUS.BAD_REQUEST);
    }
    return new mongoose.Types.ObjectId(id);
}


export const objectIdSchema = z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: 'Invalid ID format' }
);