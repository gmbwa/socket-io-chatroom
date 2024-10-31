import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    message: string;
}

const MessageSchema: Schema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);