import { Schema, model } from 'mongoose';

export interface userModel {
    firstName: string,
    lastName: string,
    birthDate: Date,
    phone: string,
    email: string,
    password: string,
    adress: string,
};

const userSchema = new Schema<userModel>({
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    adress: { type: String },
});

export default model<userModel>('user', userSchema);