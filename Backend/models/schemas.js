import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        default: undefined,
    },
    tokenExpiry: {
        type: Date,
        default: undefined,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('credentials', UserSchema);

export default User;