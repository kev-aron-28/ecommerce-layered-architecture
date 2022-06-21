import { Schema, model } from 'mongoose';

export interface userModel {
    firstName: string,
    lastName: string,
    birthDate: Date,
    phone: string,
    email: string,
    password: string,
    adress: string,
    role: string,
    uid?: string
};

const userSchema = new Schema<userModel>({
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    phone: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    adress: { type: String },
    role: { type: String, enum: ['ADMIN_ROLE', 'USER_ROLE' ], required: true },
    uid: String
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model<userModel>('user', userSchema);