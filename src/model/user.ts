import mongoose, { Schema } from "mongoose";


interface User {
    email: string;
    username: string;
    password: string;
    role: string;

}

const userSchema = new Schema<User>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, default: 'user', enum: ['admin', 'user'] },
        password: { type: String, required: true },


    },
    { timestamps: true }
);

export default mongoose.model<User>('User', userSchema);